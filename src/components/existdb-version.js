import { LitElement, html, css } from 'lit'

class ExistdbVersion extends LitElement {
  static properties = {
    versionString: { type: String },
    _basePath: { type: String, state: true },
  }

  static styles = css`
    :host {
      display: inline;
    }
  `

  constructor() {
    super()
    this.versionString = ''
    this._basePath = ''
  }

  connectedCallback() {
    super.connectedCallback()
    // Determine base path from the component's location in the app
    this._basePath = this._resolveBasePath()
    this._fetchVersion()
  }

  _resolveBasePath() {
    // Try to determine the base path from the document location
    const path = window.location.pathname
    const appBase = path.substring(0, path.lastIndexOf('/') + 1)
    return appBase
  }

  async _fetchVersion() {
    try {
      const resp = await fetch(`${this._basePath}modules/getVersion.xql`, {
        credentials: 'same-origin',
      })
      if (resp.ok) {
        this.versionString = await resp.text()
      }
    } catch (e) {
      console.warn('Failed to fetch version:', e)
    }
  }

  render() {
    return html`${this.versionString}`
  }
}

customElements.define('existdb-version', ExistdbVersion)
