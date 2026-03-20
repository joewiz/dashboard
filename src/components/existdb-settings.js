import { LitElement, html, css } from 'lit'

class ExistdbSettings extends LitElement {
  static properties = {
    versionString: { type: String },
    publicUrl: { type: String },
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
      padding: 0;
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      margin: -30px -30px 0 -30px;
    }
    .header .icon { margin-right: 10px; }
    .header h3 { margin: 0; font-weight: 400; }
    .card {
      max-width: 600px;
      min-width: 320px;
      padding: 20px;
      margin: 50px auto;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card h4 {
      margin: 0 0 16px;
      color: #333;
      font-size: 18px;
    }
    .card-content { color: #333; }
    .highlight {
      color: var(--primary-color, #2196f3);
      font-size: 18px;
      padding: 10px;
    }
    .hint {
      color: #666;
      font-size: 14px;
      font-style: italic;
    }
  `

  constructor() {
    super()
    this.versionString = ''
    this.publicUrl = ''
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchData()
  }

  async _fetchData() {
    const basePath = this._resolveBasePath()
    try {
      const [versionResp, urlResp] = await Promise.all([
        fetch(`${basePath}modules/getVersion.xql`, { credentials: 'same-origin' }),
        fetch(`${basePath}../packageservice/packages/public-url`, { credentials: 'same-origin' }),
      ])
      if (versionResp.ok) this.versionString = await versionResp.text()
      if (urlResp.ok) this.publicUrl = await urlResp.text()
    } catch (e) {
      console.warn('Failed to fetch settings data:', e)
    }
  }

  _resolveBasePath() {
    const path = window.location.pathname
    return path.substring(0, path.lastIndexOf('/') + 1)
  }

  render() {
    return html`
      <div class="header">
        <slot name="toggleIcon"></slot>
        <h3>Settings</h3>
      </div>

      <div class="card">
        <h4>Server Version</h4>
        <div class="card-content">
          You are running
          <div class="highlight">${this.versionString}</div>
        </div>
      </div>

      <div class="card">
        <h4>General Settings</h4>
        <div class="card-content">
          Public Repository URL
          <div class="highlight">${this.publicUrl}</div>
          <span class="hint">URL from which publicly available eXist-db apps and libraries are loaded.</span>
        </div>
      </div>
    `
  }
}

customElements.define('existdb-settings', ExistdbSettings)
