import { LitElement, html, css } from 'lit'

class ExistdbPackages extends LitElement {
  static properties = {
    service: { type: String, reflect: true },
    autoLoad: { type: Boolean, attribute: 'auto-load' },
    count: { type: Number, reflect: true },
    _loading: { type: Boolean, state: true },
  }

  static styles = css`
    :host {
      position: relative;
      background: whitesmoke;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      display: block;
    }

    .items {
      padding: 10px;
      margin: 0;
      background: whitesmoke;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media only screen and (max-width: 768px) {
      .items {
        display: block;
      }
    }

    .spin-wrapper {
      position: relative;
      width: 100%;
      text-align: center;
      height: 1px;
      z-index: 10;
      top: 20px;
    }

    .spinner {
      display: inline-block;
      width: 36px;
      height: 36px;
      padding: 10px;
      background: #eee;
      border-radius: 24px;
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                  0 1px 10px 0 rgba(0, 0, 0, 0.12),
                  0 2px 4px -1px rgba(0, 0, 0, 0.4);
    }

    .spinner::after {
      content: '';
      display: block;
      width: 28px;
      height: 28px;
      border: 4px solid var(--primary-color, #2196f3);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    [hidden] {
      display: none !important;
    }
  `

  constructor() {
    super()
    this.service = ''
    this.autoLoad = false
    this.count = 0
    this._loading = false
    this._packages = []

    this._onPackageRemoved = () => this.loadPackages()
    this._onPackageInstalled = () => this.loadPackages()
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('package-removed', this._onPackageRemoved)
    window.addEventListener('package-installed', this._onPackageInstalled)

    if (this.autoLoad) {
      this.loadPackages()
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('package-removed', this._onPackageRemoved)
    window.removeEventListener('package-installed', this._onPackageInstalled)
  }

  render() {
    return html`
      <div class="spin-wrapper" ?hidden=${!this._loading}>
        <div class="spinner"></div>
      </div>
      <div id="itemList" class="items">
        <slot></slot>
      </div>
    `
  }

  async loadPackages() {
    if (!this.service) return

    this._loading = true

    try {
      const response = await fetch(this.service, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Accept': 'text/html' },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const text = await response.text()
      await this.updateComplete

      const itemList = this.shadowRoot.querySelector('#itemList')
      itemList.innerHTML = text

      this._packages = this.shadowRoot.querySelectorAll('repo-app')
      this.count = this._packages.length

      this.dispatchEvent(new CustomEvent('packages-loaded', {
        bubbles: true,
        composed: true,
        detail: { type: this.id },
      }))
    } catch (err) {
      this.dispatchEvent(new CustomEvent('packages-load-error', {
        bubbles: true,
        composed: true,
        detail: { error: 'loading of available packages failed' },
      }))
    } finally {
      this._loading = false
    }
  }

  getPackages() {
    return this._packages
  }
}

customElements.define('existdb-packages', ExistdbPackages)
