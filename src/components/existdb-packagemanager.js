import { LitElement, html, css } from 'lit'
import './existdb-packages.js'

class ExistdbPackagemanager extends LitElement {
  static properties = {
    selected: { type: Number },
    localCount: { type: Number },
    remoteCount: { type: Number },
    _toastMessage: { type: String, state: true },
    _toastVisible: { type: Boolean, state: true },
    _toastIsError: { type: Boolean, state: true },
    _updatesVisible: { type: Boolean, state: true },
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Roboto', 'Noto', sans-serif;
      position: relative;
      background: whitesmoke;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    /* --- Layout --- */
    .layout {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #eee;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }

    /* --- Toolbar --- */
    .toolbar {
      z-index: 10;
      background: var(--primary-color, #2196f3);
      color: white;
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      box-sizing: border-box;
      flex-shrink: 0;
      box-shadow: -1px 6px 6px -3px rgba(0, 0, 0, 0.4);
    }
    .toolbar .icon {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .toolbar .title {
      color: white;
      font-weight: 300;
      font-size: 20px;
      white-space: nowrap;
    }
    .heading {
      display: none;
    }
    @media only screen and (min-width: 768px) {
      .heading {
        width: 100%;
        display: inline-block;
        font-weight: 300;
        text-align: center;
        flex-grow: 2;
        color: var(--primary-light, #bbdefb);
      }
    }

    .filter-input {
      display: inline-block;
      font-size: 16px;
      box-shadow: none;
      border: none;
      outline: none;
      background: var(--primary-light-bg, #64b5f6);
      color: var(--primary-dark, #0d47a1);
      padding: 10px;
      border-radius: 4px;
      min-width: 180px;
      flex-shrink: 0;
    }
    .filter-input::placeholder {
      color: var(--primary-dark, #0d47a1);
    }

    /* --- Upload area --- */
    .upload-area {
      background: var(--primary-light-bg, #64b5f6);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .drop-label {
      padding: 11px 0;
      color: var(--primary-dark, #0d47a1);
      font-weight: 300;
    }
    .upload-btn {
      background: var(--primary-color, #2196f3);
      color: white;
      border: none;
      padding: 8px 20px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 500;
    }
    .upload-btn:hover {
      background: var(--primary-dark, #1976d2);
    }
    .upload-file {
      display: none;
    }

    @media only screen and (max-width: 768px) {
      .drop-label {
        display: none;
      }
    }

    /* --- Tabs --- */
    .tabs {
      background: var(--primary-light-bg, #64b5f6);
      display: flex;
      height: 50px;
      flex-shrink: 0;
    }
    .tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      font-size: 16px;
      position: relative;
      user-select: none;
      background: none;
      border: none;
      outline: none;
      font-family: inherit;
      transition: background 0.2s;
    }
    .tab:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--primary-dark, #1976d2);
    }

    /* --- Pages --- */
    .pages {
      flex: 1;
      overflow: auto;
      margin-top: 2px;
    }
    .page {
      width: 100%;
      height: 100%;
    }
    .page[hidden] {
      display: none !important;
    }

    /* --- Toast --- */
    .toast {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px 24px;
      color: white;
      font-size: 14px;
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    .toast.visible {
      transform: translateY(0);
    }
    .toast.info {
      background: var(--primary-dark, #1976d2);
    }
    .toast.error {
      background: #d32f2f;
    }
    .toast-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 4px 8px;
      margin-left: 16px;
    }

    /* --- Updates banner --- */
    .updates-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f57c00;
      color: white;
      padding: 14px 24px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 201;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    .updates-banner.visible {
      transform: translateY(0);
    }
    .updates-btn {
      background: #ffb74d;
      color: #e65100;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 4px;
      font-weight: 500;
      margin-left: 20px;
    }
    .updates-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 18px;
      padding: 4px 8px;
      margin-left: 8px;
    }

    .counter {
      font-size: smaller;
    }

    [hidden] {
      display: none !important;
    }
  `

  constructor() {
    super()
    this.selected = 0
    this.localCount = 0
    this.remoteCount = 0
    this._toastMessage = ''
    this._toastVisible = false
    this._toastIsError = false
    this._toastTimeout = null
    this._updatesVisible = false

    this._local = []
    this._remote = []

    this._boundKeyHandler = this._handleKeyboard.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('keydown', this._boundKeyHandler)

    window.addEventListener('packages-loaded', e => this._handlePackagesLoaded(e))

    window.addEventListener('package-installed', e => {
      this._toast('Package has been installed: ' + e.detail.abbrev)
    })
    window.addEventListener('package-install-error', e => {
      this._toastError(e.detail.error)
    })
    window.addEventListener('package-removed', e => {
      this._toast('Successfully removed "' + e.detail.abbrev + '"')
    })
    window.addEventListener('package-remove-error', e => {
      const error = e.detail.error
      const msg = (error && error.error && error.error.message) ? error.error.message : (typeof error === 'string' ? error : 'Remove failed')
      this._toastError(msg)
    })
    window.addEventListener('packages-load-error', e => {
      this._toastError(e.detail.error)
    })
    window.addEventListener('packagemanager-remove-attempt', () => {
      this._toastError('Package Manager cannot be removed.')
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this._boundKeyHandler)
  }

  firstUpdated() {
    // Initial load
    this._getLocalService().loadPackages()
    this._getRemoteService().loadPackages()

    const filterInput = this.shadowRoot.querySelector('#filterLocal')
    if (filterInput) filterInput.focus()
  }

  _getLocalService() {
    return this.shadowRoot.querySelector('#localService')
  }

  _getRemoteService() {
    return this.shadowRoot.querySelector('#remoteService')
  }

  render() {
    const toastClasses = [
      'toast',
      this._toastVisible ? 'visible' : '',
      this._toastIsError ? 'error' : 'info',
    ].filter(Boolean).join(' ')

    return html`
      <div class="layout">
        <!-- Toolbar -->
        <div class="toolbar">
          <slot name="toggleIcon"></slot>
          <span class="title">Package Manager</span>
          <span class="heading"></span>
          <input
            id="filterLocal"
            class="filter-input"
            type="text"
            placeholder="type here to filter"
            title="type here to filter - ESC to reset"
            autofocus
            @keyup=${this._handleFilter}
          >
        </div>

        <!-- Upload -->
        <div class="upload-area">
          <span class="drop-label">Upload a .xar package:</span>
          <button class="upload-btn" @click=${this._triggerUpload}>Upload</button>
          <input
            id="fileInput"
            class="upload-file"
            type="file"
            accept=".xar"
            @change=${this._handleUpload}
          >
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${this.selected === 0 ? 'active' : ''}" @click=${() => this._selectTab(0)}>
            Installed (${this.localCount})
          </button>
          <button class="tab ${this.selected === 1 ? 'active' : ''}" @click=${() => this._selectTab(1)}>
            Available (${this.remoteCount})
          </button>
        </div>

        <!-- Pages -->
        <div class="pages">
          <div class="page" ?hidden=${this.selected !== 0}>
            <existdb-packages
              id="localService"
              service="../packageservice/packages/local"
            ></existdb-packages>
          </div>
          <div class="page" ?hidden=${this.selected !== 1}>
            <existdb-packages
              id="remoteService"
              service="../packageservice/packages/remote"
            ></existdb-packages>
          </div>
        </div>
      </div>

      <!-- Toast notification -->
      <div class=${toastClasses}>
        <span>${this._toastMessage}</span>
        ${this._toastIsError ? html`
          <button class="toast-close" @click=${this._hideToast}>&times;</button>
        ` : ''}
      </div>

      <!-- Updates banner -->
      <div class="updates-banner ${this._updatesVisible ? 'visible' : ''}">
        <span>Updates available</span>
        <button class="updates-btn" @click=${this._goToAvailable}>install...</button>
        <button class="updates-close" @click=${this._hideUpdates}>&times;</button>
      </div>
    `
  }

  _selectTab(index) {
    this.selected = index
    this._resetFilters()

    if (index === 0) {
      this._getLocalService().loadPackages()
    } else {
      this._updatesVisible = false
      this._getRemoteService().loadPackages()
    }
  }

  _handleKeyboard(e) {
    // ESC: reset filters
    if (e.key === 'Escape') {
      this._resetFilters()
      if (this.selected === 0) {
        this._getLocalService().loadPackages()
      } else {
        this._getRemoteService().loadPackages()
      }
      this.focus()
      return
    }

    // Ctrl+F: focus filter
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault()
      const filterInput = this.shadowRoot.querySelector('#filterLocal')
      if (filterInput) filterInput.focus()
      return
    }

    // Ctrl+U: trigger upload
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
      this._triggerUpload()
      return
    }

    // ArrowRight: available tab
    if (e.key === 'ArrowRight' && !e.target.matches('input')) {
      this._selectTab(1)
      return
    }

    // ArrowLeft: installed tab
    if (e.key === 'ArrowLeft' && !e.target.matches('input')) {
      this._selectTab(0)
    }
  }

  _handleFilter() {
    const filterInput = this.shadowRoot.querySelector('#filterLocal')
    const filterString = (filterInput.value || '').toLowerCase()

    if (this.selected === 0) {
      this.localCount = this._filter(this._local, filterString)
    } else {
      this.remoteCount = this._filter(this._remote, filterString)
    }
  }

  _filter(apps, filterString) {
    let cnt = apps.length
    for (let i = 0; i < apps.length; i++) {
      const app = apps[i]
      const titleEl = app.querySelector('repo-title')
      const shortTitle = titleEl ? titleEl.textContent : ''

      if (!shortTitle.toLowerCase().includes(filterString)) {
        app.setAttribute('hidden', '')
        cnt--
      } else if (app.hasAttribute('hidden')) {
        app.removeAttribute('hidden')
      }
    }
    return cnt
  }

  _resetFilters() {
    const filterInput = this.shadowRoot.querySelector('#filterLocal')
    if (filterInput) filterInput.value = ''
  }

  _handlePackagesLoaded(e) {
    const localService = this._getLocalService()
    const remoteService = this._getRemoteService()

    this._local = localService.getPackages()
    this._remote = remoteService.getPackages()
    this.localCount = localService.count
    this.remoteCount = remoteService.count

    if (this.selected === 0) {
      this._checkForUpdates()
    }

    const filterInput = this.shadowRoot.querySelector('#filterLocal')
    if (filterInput) filterInput.focus()
  }

  _triggerUpload() {
    const fileInput = this.shadowRoot.querySelector('#fileInput')
    if (fileInput) fileInput.click()
  }

  async _handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('uploadedfiles[]', file)

    try {
      const response = await fetch(
        '../packageservice/packages/action?name=' + encodeURIComponent(file.name),
        {
          method: 'POST',
          credentials: 'same-origin',
          body: formData,
        }
      )

      const text = await response.text()
      const result = JSON.parse(text)

      // Server may return an array
      const firstResult = Array.isArray(result) ? result[0] : result
      if (firstResult.error !== undefined) {
        this._toastError(firstResult.error)
      } else {
        this._toast('Package uploaded successfully')
      }

      this._getLocalService().loadPackages()
    } catch (err) {
      this._toastError('Upload failed for: ' + file.name + ' Reason: ' + (err.message || 'unknown error'))
    }

    // Reset file input
    e.target.value = ''
  }

  _checkForUpdates() {
    if (!this._remote || this._remote.length === 0) return

    for (const item of this._remote) {
      if (item.classList && item.classList.contains('update')) {
        if (this.selected === 0) {
          this._updatesVisible = true
          return
        }
      }
    }
  }

  _goToAvailable() {
    this._updatesVisible = false
    this._selectTab(1)
  }

  _hideUpdates() {
    this._updatesVisible = false
  }

  _toast(msg) {
    this._toastMessage = msg
    this._toastIsError = false
    this._toastVisible = true

    if (this._toastTimeout) clearTimeout(this._toastTimeout)
    this._toastTimeout = setTimeout(() => {
      this._toastVisible = false
    }, 5000)
  }

  _toastError(msg) {
    this._toastMessage = msg
    this._toastIsError = true
    this._toastVisible = true

    // Error toasts stay until dismissed
    if (this._toastTimeout) clearTimeout(this._toastTimeout)
  }

  _hideToast() {
    this._toastVisible = false
  }
}

customElements.define('existdb-packagemanager', ExistdbPackagemanager)
