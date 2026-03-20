import { LitElement, html, css } from 'lit'
import './existdb-usermanager.js'

class ExistdbUsermanagerApp extends LitElement {
  static properties = {
    logout: { type: Boolean },
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 30px;
      font-family: 'Roboto', 'Noto', sans-serif;
      box-sizing: border-box;
    }

    .header {
      background: var(--primary-color, #2196f3);
      padding: 0 16px;
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      margin: -30px -30px 0 -30px;
    }

    .header .icon {
      margin-right: 10px;
      font-size: 24px;
    }

    .header h3 {
      margin: 0;
      font-weight: 400;
      flex: 1;
    }

    .header a {
      color: white;
      font-size: 18px;
      font-weight: 300;
      margin-right: 20px;
      text-decoration: none;
    }

    .header a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 768px) {
      .header h3 {
        font-size: 18px;
      }
      .header .icon {
        display: none;
      }
    }
  `

  constructor() {
    super()
    this.logout = false
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.hasAttribute('logout') && this.getAttribute('logout') === 'true') {
      this.logout = true
    }
  }

  render() {
    return html`
      <div class="header">
        <span class="icon">\u{1F465}</span>
        <slot name="toggleIcon"></slot>
        <h3>User Manager</h3>
        ${this.logout ? html`<a href="index.html?logout=true">logout</a>` : ''}
      </div>
      <existdb-usermanager></existdb-usermanager>
    `
  }
}

customElements.define('existdb-usermanager-app', ExistdbUsermanagerApp)
