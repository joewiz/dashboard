import { LitElement, html, css } from 'lit'

class ExistdbLogin extends LitElement {
  static properties = {
    loggedIn: { type: Boolean },
    user: { type: String },
    group: { type: String },
    groups: { type: Array },
    auto: { type: Boolean },
    loginLabel: { type: String, attribute: 'login-label' },
    logoutLabel: { type: String, attribute: 'logout-label' },
    loginIcon: { type: String, attribute: 'login-icon' },
    logoutIcon: { type: String, attribute: 'logout-icon' },
    password: { type: String },
    loginUrl: { type: String, attribute: 'login-url' },
    logoutUrl: { type: String, attribute: 'logout-url' },
    _invalid: { type: Boolean, state: true },
    _dialogOpen: { type: Boolean, state: true },
  }

  static styles = css`
    :host { display: block; }

    .dialog-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .dialog-overlay[open] { display: flex; }

    .dialog {
      background: white;
      min-width: 320px;
      max-width: 640px;
      border-radius: 4px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .dialog h2 {
      background-color: #2196f3;
      padding: 16px;
      margin: 0;
      color: #f0f0f0;
      border-radius: 4px 4px 0 0;
    }
    .dialog-body { padding: 16px; }
    .dialog-body label { display: block; margin-bottom: 8px; font-size: 14px; color: #666; }
    .dialog-body input {
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
    .dialog-body input:focus { outline: none; border-color: #2196f3; }
    .dialog-actions { padding: 8px 16px; text-align: right; }
    .dialog-actions button {
      background: #2196f3;
      color: white;
      border: none;
      padding: 8px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .dialog-actions button:hover { background: #1976d2; }

    a, a:link { text-decoration: none; color: inherit; cursor: pointer; }
    #message { color: #c62828; margin-top: 8px; }
    @media (max-width: 1024px) { .label { display: none; } }
  `

  constructor() {
    super()
    this.loggedIn = false
    this.user = ''
    this.group = ''
    this.groups = []
    this.auto = false
    this.loginLabel = 'Login'
    this.logoutLabel = 'Logout'
    this.loginIcon = ''
    this.logoutIcon = ''
    this.password = ''
    this.loginUrl = ''
    this.logoutUrl = ''
    this._invalid = false
    this._dialogOpen = false
    this._hasFocus = true
  }

  connectedCallback() {
    super.connectedCallback()
    this._boundBlur = () => { this._hasFocus = false }
    this._boundFocus = () => {
      if (!this._hasFocus) {
        this._hasFocus = true
        this._checkLogin()
      }
    }
    window.addEventListener('blur', this._boundBlur)
    window.addEventListener('focus', this._boundFocus)
    document.addEventListener('checkUser', (ev) => {
      if (ev.detail.user === this.user) {
        this.password = ev.detail.password
        this._confirmLogin()
      }
    })
    this._checkLogin()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('blur', this._boundBlur)
    window.removeEventListener('focus', this._boundFocus)
  }

  async _checkLogin(body = null) {
    try {
      const resp = await fetch('/exist/apps/dashboard/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body ? new URLSearchParams(body) : null,
      })
      const data = await resp.json()
      this._handleResponse(data)
    } catch (e) {
      console.warn('Login check failed:', e)
    }
  }

  _show(ev) {
    ev.preventDefault()
    if (this.loggedIn) {
      this._checkLogin({ logout: this.user })
    } else {
      this._dialogOpen = true
    }
  }

  _confirmLogin() {
    this._checkLogin({ user: this.user, password: this.password })
  }

  _handleResponse(data) {
    const wasLoggedIn = this.loggedIn
    if (data.user && this._checkGroup(data)) {
      this.loggedIn = true
      this.user = data.user
      this.groups = data.groups || []
      this._invalid = false
      if (!wasLoggedIn && this.loginUrl) {
        window.location = this.loginUrl
      }
      this._dialogOpen = false
    } else {
      this.loggedIn = false
      this.password = ''
      if (this._dialogOpen) {
        this._invalid = true
      } else if (this.auto) {
        this._dialogOpen = true
      } else if (wasLoggedIn && this.logoutUrl) {
        window.location = this.logoutUrl
      }
    }
  }

  _checkGroup(info) {
    if (this.group) {
      return info.groups && info.groups.indexOf(this.group) > -1
    }
    return true
  }

  _handleKeyup(ev) {
    if (ev.keyCode === 13) this._confirmLogin()
  }

  _onUserInput(ev) { this.user = ev.target.value }
  _onPasswordInput(ev) { this.password = ev.target.value }

  render() {
    return html`
      <a href="#" id="login" @click=${this._show} title="${this.user}">
        ${this.loggedIn
          ? html`<span class="label">${this.logoutLabel} ${this.user}</span>`
          : html`<span class="label">${this.loginLabel}</span>`
        }
      </a>

      <div class="dialog-overlay" ?open=${this._dialogOpen}>
        <div class="dialog">
          <h2>Login</h2>
          <div class="dialog-body">
            <label>User</label>
            <input type="text" .value=${this.user} @input=${this._onUserInput} @keyup=${this._handleKeyup} autofocus>
            <label>Password</label>
            <input type="password" .value=${this.password} @input=${this._onPasswordInput} @keyup=${this._handleKeyup}>
            ${this._invalid ? html`
              <p id="message">Wrong password or invalid user
                ${this.group ? html` (must be member of group ${this.group})` : ''}
              </p>
            ` : ''}
          </div>
          <div class="dialog-actions">
            <button @click=${this._confirmLogin}>Login</button>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('existdb-login', ExistdbLogin)
