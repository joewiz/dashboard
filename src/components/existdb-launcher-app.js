import { LitElement, html, css } from 'lit'
import './existdb-launcher.js'

class ExistdbLauncherApp extends LitElement {
  static properties = {
    ignores: { type: Array },
    path: { type: String },
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
      background: ghostwhite;
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
    }
    .header h3 {
      margin: 0;
      font-weight: 400;
      flex: 1;
    }
    .header ::slotted(existdb-login) {
      color: white;
      margin-right: 10px;
    }
    @media only screen and (max-width: 768px) {
      .header h3 {
        font-size: 18px;
      }
    }
  `

  constructor() {
    super()
    this.ignores = []
    this.path = undefined
  }

  render() {
    return html`
      <div class="header">
        <slot name="toggleIcon"></slot>
        <h3>Launcher</h3>
        <slot></slot>
      </div>
      <existdb-launcher .ignores=${this.ignores} .path=${this.path}></existdb-launcher>
    `
  }
}

customElements.define('existdb-launcher-app', ExistdbLauncherApp)
