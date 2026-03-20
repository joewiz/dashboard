import { LitElement, html, css } from 'lit'
import './existdb-branding.js'

class ExistdbLauncher extends LitElement {
  static properties = {
    ignores: { type: Array },
    path: { type: String },
    basePath: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      background: ghostwhite;
    }
    .apps repo-packages {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
    .apps repo-app {
      width: 150px;
      height: 150px;
      position: relative;
      cursor: pointer;
      margin: 10px;
    }
    .apps repo-title {
      font-size: 12px;
      display: block;
      position: absolute;
      bottom: 4px;
      left: 0px;
      width: 100%;
      text-align: center;
      height: 36px;
      text-shadow: -2px 2px 2px rgba(108, 98, 98, 0.3);
      color: var(--paper-grey-900, #212121);
    }
    .apps repo-icon {
      width: 100%;
      height: 100%;
      vertical-align: middle;
      display: table-cell;
      background: transparent;
    }
    .apps repo-name,
    .apps repo-version,
    .apps repo-type,
    .apps repo-authors,
    .apps repo-abbrev,
    .apps repo-description,
    .apps repo-website,
    .apps repo-url,
    .apps repo-license {
      display: none;
    }
    [hidden] {
      display: none;
    }
  `

  constructor() {
    super()
    this.ignores = []
    this.path = undefined
    this.basePath = ''
  }

  connectedCallback() {
    super.connectedCallback()
    if (this.path == undefined) {
      this.basePath = '..'
    } else {
      const rootPath = window.location.pathname
      this.basePath = rootPath.substring(0, rootPath.indexOf(this.path))
    }
    this._loadApplications()
  }

  async _loadApplications() {
    try {
      const resp = await fetch(`${this.basePath}/packageservice/packages/apps`, {
        method: 'GET',
        credentials: 'same-origin',
      })
      if (resp.ok) {
        const text = await resp.text()
        this._displayApplications(text)
      }
    } catch (e) {
      console.warn('Failed to load applications:', e)
    }
  }

  _displayApplications(responseText) {
    const container = this.shadowRoot.querySelector('#apps')
    container.innerHTML = responseText

    // show branding unless we're embedded in dashboard
    if (!this._isEmbedded()) {
      const branding = document.createElement('existdb-branding')
      const packageRoot = container.querySelector('repo-packages')
      if (packageRoot) {
        packageRoot.insertBefore(branding, packageRoot.querySelector('repo-app'))
      }
    }

    // filter out ignored apps
    const apps = this.shadowRoot.querySelectorAll('repo-app')
    for (let i = 0; i < apps.length; i++) {
      const abbrev = apps[i].getAttribute('abbrev')
      if (this.ignores && this.ignores.indexOf(abbrev) !== -1) {
        apps[i].style.display = 'none'
      }
    }
  }

  _isEmbedded() {
    return document.querySelector('existdb-dashboard') != null
  }

  render() {
    return html`
      <div id="apps" class="apps"></div>
    `
  }
}

customElements.define('existdb-launcher', ExistdbLauncher)
