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
      align-items: flex-start;
      padding: 10px;
    }
    .apps repo-app {
      width: 110px;
      height: 110px;
      position: relative;
      cursor: pointer;
      margin: 8px;
    }
    .apps repo-app:hover {
      opacity: 0.8;
    }
    .apps repo-title {
      font-size: 11px;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 14px;
      overflow: hidden;
      color: var(--paper-grey-900, #212121);
    }
    .apps repo-icon {
      width: 100%;
      height: calc(100% - 30px);
      display: block;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
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

    // Render icons from repo-icon src attributes
    const icons = this.shadowRoot.querySelectorAll('repo-icon[src]')
    for (const icon of icons) {
      icon.style.backgroundImage = `url(${icon.getAttribute('src')})`
    }

    // Make apps clickable
    const allApps = this.shadowRoot.querySelectorAll('repo-app')
    for (const app of allApps) {
      app.addEventListener('click', () => {
        const path = app.getAttribute('path')
        if (path) window.location.href = path
      })
    }

    // Filter out ignored apps
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
