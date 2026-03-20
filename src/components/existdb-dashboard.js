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
      overflow: hidden;
    }

    .drawer-header img {
      width: 134px;
      max-width: 100%;
    }

    .drawer-header existdb-version {
      font-size: 11px;
      display: block;
      margin-top: -4px;
      margin-bottom: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 224px;
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
      width: 24px;
      height: 24px;
      min-width: 24px;
      margin-right: 12px;
      display: block;
      color: #757575;
    }

    .nav-item.active .icon {
      color: #1976d2;
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
            <svg class="icon" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/></svg>
            <span>Launcher</span>
          </button>

          <button class="nav-item ${page === 'packagemanager' ? 'active' : ''}"
                  id="packageManagerItem" role="menuitem"
                  @click=${() => this._navigate('packagemanager')}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" fill="currentColor"/></svg>
            <span>Package Manager</span>
          </button>

          <button class="nav-item ${page === 'usermanager' ? 'active' : ''}"
                  id="userManagerItem" role="menuitem"
                  @click=${() => this._navigate('usermanager')}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            <span>User Manager</span>
          </button>

          <button class="nav-item ${page === 'backup' ? 'active' : ''}"
                  id="backupItem" role="menuitem"
                  @click=${() => this._navigate('backup')}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"/></svg>
            <span>Backup</span>
          </button>

          <button class="nav-item ${page === 'settings' ? 'active' : ''}"
                  id="settingsItem" role="menuitem"
                  @click=${() => this._navigate('settings')}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/></svg>
            <span>Settings</span>
          </button>

          <button class="nav-item" id="logout" role="menuitem"
                  @click=${this._logout}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/></svg>
            <span>Logout admin</span>
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
