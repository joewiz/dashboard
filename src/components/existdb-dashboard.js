import { LitElement, html, css } from 'lit'
import './existdb-version.js'
import './existdb-login.js'
import './existdb-launcher-app.js'
import './existdb-packagemanager.js'
import './existdb-usermanager-app.js'
import './existdb-backup-app.js'
import './existdb-settings.js'

class ExistdbDashboard extends LitElement {
  static properties = {
    path: { type: String },
    _currentPage: { type: String, state: true },
    _narrow: { type: Boolean, state: true },
    _drawerOpen: { type: Boolean, state: true },
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Roboto', 'Noto', sans-serif;
      color: #212121;
    }

    .layout {
      display: flex;
      height: 100%;
    }

    /* Drawer / Sidebar */
    .drawer {
      width: 256px;
      min-width: 256px;
      background: white;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      z-index: 50;
      overflow-y: auto;
    }

    .drawer-header {
      text-align: center;
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .drawer-header img {
      width: 134px;
    }

    .drawer-header existdb-version {
      font-size: small;
      display: block;
      margin-top: -6px;
      margin-bottom: 6px;
    }

    .drawer-header .subitem {
      font-weight: 300;
      font-size: larger;
      letter-spacing: 4.5px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-size: 14px;
      font-family: inherit;
      color: #333;
      transition: background 0.15s;
    }

    .nav-item:hover {
      background: #f5f5f5;
    }

    .nav-item.active {
      background: #e3f2fd;
      color: #1976d2;
    }

    .nav-item .icon {
      width: 36px;
      height: 36px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .nav-item img.icon {
      object-fit: contain;
    }

    /* Main content area */
    .main {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .page {
      display: none;
      width: 100%;
      height: 100%;
    }

    .page.active {
      display: block;
    }

    /* Mobile overlay */
    .overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 40;
    }

    @media (max-width: 768px) {
      .drawer {
        position: fixed;
        top: 0;
        left: -256px;
        height: 100%;
        transition: left 0.2s;
        z-index: 50;
      }
      .drawer.open {
        left: 0;
      }
      .overlay.open {
        display: block;
      }
    }
  `

  constructor() {
    super()
    this.path = ''
    this._currentPage = 'launcher'
    this._narrow = false
    this._drawerOpen = false
  }

  connectedCallback() {
    super.connectedCallback()

    // Check if narrow
    this._checkNarrow()
    window.addEventListener('resize', () => this._checkNarrow())

    // Determine initial page from hash, path attribute, or default
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (hash) {
      this._currentPage = hash
    } else if (this.path && this.path !== '') {
      const page = this.path.replace(/^[#/]+/, '')
      if (page) this._currentPage = page
    }

    // Always set the hash to reflect the current page
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      window.location.hash = `/${this._currentPage}`
    }

    window.addEventListener('hashchange', () => this._updateRouteFromHash())
  }

  _updateRouteFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (hash) {
      this._currentPage = hash
    }
  }

  _checkNarrow() {
    this._narrow = window.innerWidth <= 768
  }

  _navigate(page) {
    this._currentPage = page
    window.location.hash = `/${page}`
    if (this._narrow) {
      this._drawerOpen = false
    }
  }

  _toggleDrawer() {
    this._drawerOpen = !this._drawerOpen
  }

  _closeDrawer() {
    this._drawerOpen = false
  }

  _logout() {
    window.location.href = 'index.html?logout=true'
  }

  _renderMenuButton() {
    return html`
      <button class="nav-item" style="display:none" @click=${this._toggleDrawer}>
        &#9776; Menu
      </button>
    `
  }

  render() {
    const page = this._currentPage

    return html`
      <div class="layout">
        <div class="overlay ${this._drawerOpen ? 'open' : ''}" @click=${this._closeDrawer}></div>

        <nav class="drawer ${this._drawerOpen ? 'open' : ''}" role="navigation" aria-label="Main navigation">
          <div class="drawer-header">
            <img class="logo" src="resources/images/existdb-web.svg" alt="eXist-db">
            <existdb-version></existdb-version>
            <div class="subitem">Dashboard</div>
          </div>

          <button class="nav-item ${page === 'launcher' ? 'active' : ''}"
                  id="launcherItem" role="menuitem"
                  @click=${() => this._navigate('launcher')}>
            <img class="icon" src="resources/images/launcher.svg" alt="">
            <span>Launcher</span>
          </button>

          <button class="nav-item ${page === 'packagemanager' ? 'active' : ''}"
                  id="packageManagerItem" role="menuitem"
                  @click=${() => this._navigate('packagemanager')}>
            <span class="icon">&#x2b1a;</span>
            <span>Package Manager</span>
          </button>

          <button class="nav-item ${page === 'usermanager' ? 'active' : ''}"
                  id="userManagerItem" role="menuitem"
                  @click=${() => this._navigate('usermanager')}>
            <span class="icon">&#x1f465;</span>
            <span>User Manager</span>
          </button>

          <button class="nav-item ${page === 'backup' ? 'active' : ''}"
                  id="backupItem" role="menuitem"
                  @click=${() => this._navigate('backup')}>
            <span class="icon">&#x21bb;</span>
            <span>Backup</span>
          </button>

          <button class="nav-item ${page === 'settings' ? 'active' : ''}"
                  id="settingsItem" role="menuitem"
                  @click=${() => this._navigate('settings')}>
            <span class="icon">&#x2699;</span>
            <span>Settings</span>
          </button>

          <button class="nav-item" id="logout" role="menuitem"
                  @click=${this._logout}>
            <img class="icon" src="resources/images/logout.svg" alt="">
            <existdb-login class="menuitem" login-label="Login" logout-label="Logout" group="dba"
                login-url="admin#" logout-url="index.html"
                logout-icon="" login-icon=""></existdb-login>
          </button>
        </nav>

        <main class="main">
          <div class="page ${page === 'launcher' ? 'active' : ''}">
            <existdb-launcher-app
              .ignores=${['packagemanager','packageservice','launcher','usermanager','dashboard']}>
            </existdb-launcher-app>
          </div>

          <div class="page ${page === 'packagemanager' ? 'active' : ''}">
            ${page === 'packagemanager' ? html`<existdb-packagemanager></existdb-packagemanager>` : ''}
          </div>

          <div class="page ${page === 'usermanager' ? 'active' : ''}">
            ${page === 'usermanager' ? html`<existdb-usermanager-app></existdb-usermanager-app>` : ''}
          </div>

          <div class="page ${page === 'backup' ? 'active' : ''}">
            ${page === 'backup' ? html`<existdb-backup-app></existdb-backup-app>` : ''}
          </div>

          <div class="page ${page === 'settings' ? 'active' : ''}">
            ${page === 'settings' ? html`<existdb-settings></existdb-settings>` : ''}
          </div>
        </main>
      </div>
    `
  }
}

customElements.define('existdb-dashboard', ExistdbDashboard)
