import { LitElement, html, css } from 'lit'
import './existdb-package-install-action.js'
import './existdb-package-remove-action.js'

class PackagemanagerApp extends LitElement {
  static properties = {
    type: { type: String, reflect: true },
    abbrev: { type: String, reflect: true },
    version: { type: String, reflect: true },
    status: { type: String, reflect: true },
    url: { type: String, reflect: true },
    packageTitle: { type: String, reflect: true, attribute: 'package-title' },
    path: { type: String, reflect: true },
    readonly: { type: String, reflect: true },
    _showAll: { type: Boolean, state: true },
    _progressActive: { type: Boolean, state: true },
    _progressDone: { type: Boolean, state: true },
  }

  static styles = css`
    :host {
      display: block;
      padding: 30px;
      position: relative;
      background: white;
      margin-bottom: 2px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      font-family: 'Roboto', 'Noto', sans-serif;
      box-sizing: border-box;
    }
    :host(:focus) {
      outline: none;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12),
                  0 5px 5px -3px rgba(0, 0, 0, 0.4);
    }

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      overflow: hidden;
      display: none;
    }
    .progress.active {
      display: block;
    }
    .progress-bar {
      width: 100%;
      height: 100%;
      background: var(--primary-color, #2196f3);
    }
    .progress.indeterminate .progress-bar {
      animation: indeterminate 2s infinite linear;
      transform-origin: 0% 50%;
    }
    .progress.done .progress-bar {
      animation: none;
      width: 100%;
    }
    @keyframes indeterminate {
      0% { transform: translateX(-100%) scaleX(0.3); }
      50% { transform: translateX(0%) scaleX(0.5); }
      100% { transform: translateX(100%) scaleX(0.3); }
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      padding-left: 100px;
    }

    /* icon slot */
    .wrapper ::slotted(repo-icon) {
      width: 64px;
      display: inline-block;
      position: absolute;
      top: 30px;
      left: 30px;
    }

    /* hide metadata by default */
    .wrapper ::slotted(repo-name),
    .wrapper ::slotted(repo-description),
    .wrapper ::slotted(repo-authors),
    .wrapper ::slotted(repo-abbrev),
    .wrapper ::slotted(repo-license),
    .wrapper ::slotted(repo-website),
    .wrapper ::slotted(repo-url),
    .wrapper ::slotted(repo-requires),
    .wrapper ::slotted(repo-changelog),
    .wrapper ::slotted(repo-other),
    .wrapper ::slotted(repo-note) {
      display: none;
    }

    .wrapper ::slotted(repo-type) {
      display: block;
      color: var(--primary-color, #1976d2);
      font-size: 14px;
      text-transform: uppercase;
    }
    :host([type="library"]) .wrapper ::slotted(repo-type) {
      color: #388e3c;
    }

    .wrapper ::slotted(repo-title) {
      font-size: 22px;
      font-weight: 500;
      margin: 10px 0;
      display: inline-block;
    }

    /* show all metadata when toggled */
    :host([show-all]) .wrapper ::slotted(repo-name),
    :host([show-all]) .wrapper ::slotted(repo-description),
    :host([show-all]) .wrapper ::slotted(repo-authors),
    :host([show-all]) .wrapper ::slotted(repo-abbrev),
    :host([show-all]) .wrapper ::slotted(repo-license),
    :host([show-all]) .wrapper ::slotted(repo-website),
    :host([show-all]) .wrapper ::slotted(repo-url),
    :host([show-all]) .wrapper ::slotted(repo-requires),
    :host([show-all]) .wrapper ::slotted(repo-changelog),
    :host([show-all]) .wrapper ::slotted(repo-change),
    :host([show-all]) .wrapper ::slotted(repo-other),
    :host([show-all]) .wrapper ::slotted(repo-note) {
      display: table-row;
      margin-bottom: 6px;
    }

    .actions {
      position: absolute;
      right: 0;
      top: 0;
      padding: 10px;
      display: flex;
      align-items: center;
    }

    .info-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color, #1976d2);
      padding: 8px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      min-width: 36px;
    }
    .info-btn:hover {
      background: rgba(33, 150, 243, 0.1);
    }
    .info-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    [hidden] {
      display: none !important;
    }

    @media only screen and (min-width: 768px) {
      :host {
        min-width: 300px;
      }
    }
  `

  constructor() {
    super()
    this.type = ''
    this.abbrev = ''
    this.version = ''
    this.status = ''
    this.url = ''
    this.packageTitle = ''
    this.path = ''
    this.readonly = 'false'
    this._showAll = false
    this._progressActive = false
    this._progressDone = false
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('tabindex', '0')
    this.addEventListener('keyup', this._handleEnter.bind(this))
    this.addEventListener('click', this._handleTap.bind(this))
    this.addEventListener('requestInstall', this._installOtherVersion.bind(this))
  }

  get _isInstalled() {
    return this.status === 'installed'
  }

  render() {
    const progressClasses = [
      'progress',
      this._progressActive ? 'active' : '',
      this._progressDone ? 'done' : 'indeterminate',
    ].filter(Boolean).join(' ')

    return html`
      <div class=${progressClasses}>
        <div class="progress-bar"></div>
      </div>

      <div class="wrapper">
        <slot></slot>
        <div class="actions">
          <existdb-package-install-action
            url=${this.url}
            abbrev=${this.abbrev}
            type=${this.type}
            version=${this.version}
            ?hidden=${this._isInstalled}
            @package-install-started=${this._onInstallStarted}
            @package-installed=${this._onInstalled}
            @package-install-error=${this._onInstallError}
          ></existdb-package-install-action>

          <existdb-package-remove-action
            url=${this.url}
            abbrev=${this.abbrev}
            package-title=${this.packageTitle}
            no-remove=${this.readonly}
            ?hidden=${!this._isInstalled}
            @package-remove-started=${this._onRemoveStarted}
            @package-removed=${this._onRemoved}
            @package-remove-error=${this._onRemoveError}
          ></existdb-package-remove-action>

          <button class="info-btn" @click=${this._showInfo} title="show package details">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </button>
        </div>
      </div>
    `
  }

  _handleTap(e) {
    e.stopPropagation()
    const t = e.target.nodeName.toLowerCase()
    const composedPath = e.composedPath ? e.composedPath() : []
    for (const node of composedPath) {
      const name = (node.nodeName || '').toLowerCase()
      if (name === 'existdb-package-remove-action' ||
          name === 'existdb-package-install-action' ||
          name === 'button' ||
          name === 'svg' ||
          name === 'path') {
        return
      }
    }
    this._openApp()
  }

  _handleEnter(e) {
    const originalTarget = e.composedPath()[0]
    if (originalTarget.nodeName === 'BUTTON') return
    if (e.target.nodeName.toLowerCase() === 'packagemanager-app' && e.keyCode === 13) {
      this._openApp()
    }
  }

  _openApp() {
    if (this.type === 'application' && this.status === 'installed') {
      window.open(this.path)
    }
  }

  _showInfo(e) {
    e.stopPropagation()
    this._showAll = !this._showAll
    if (this._showAll) {
      this.setAttribute('show-all', '')
    } else {
      this.removeAttribute('show-all')
    }
  }

  _onInstallStarted(e) {
    this._progressActive = true
    this._progressDone = false
    const installAction = this.shadowRoot.querySelector('existdb-package-install-action')
    installAction.install()
  }

  _onInstalled(e) {
    this._progressDone = true
    // Let the event bubble up to the window
  }

  _onInstallError(e) {
    this._progressActive = false
    this._progressDone = false
  }

  _onRemoveStarted(e) {
    this._progressActive = true
    this._progressDone = false
    const removeAction = this.shadowRoot.querySelector('existdb-package-remove-action')
    removeAction.removeIt()
  }

  _onRemoved(e) {
    this._progressDone = true
  }

  _onRemoveError(e) {
    this._progressActive = false
    this._progressDone = false
  }

  _installOtherVersion(e) {
    const installAction = this.shadowRoot.querySelector('existdb-package-install-action')
    installAction.version = e.detail.version
    installAction._submit(e)
  }
}

customElements.define('packagemanager-app', PackagemanagerApp)
