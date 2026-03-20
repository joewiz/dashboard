import { LitElement, html, css } from 'lit'
import './existdb-backup.js'

class ExistdbBackupApp extends LitElement {
  static properties = {
    logout: { type: Boolean },
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: 'Roboto', 'Noto', sans-serif;
    }
    .header {
      background: var(--primary-color, #2196f3);
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .header h3 { margin: 0; font-weight: 400; }
    .header .icon { margin-right: 10px; }
    a.logout { color: white; font-size: 18px; font-weight: 300; margin-left: auto; text-decoration: none; }
  `

  constructor() {
    super()
    this.logout = false
  }

  render() {
    return html`
      <div class="header">
        <span class="icon">&#x21bb;</span>
        <slot name="toggleIcon"></slot>
        <h3>Backup</h3>
        ${this.logout ? html`<a class="logout" href="index.html?logout=true">logout</a>` : ''}
      </div>
      <existdb-backup></existdb-backup>
    `
  }
}

customElements.define('existdb-backup-app', ExistdbBackupApp)
