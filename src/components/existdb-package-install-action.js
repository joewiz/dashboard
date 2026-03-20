import { LitElement, html, css } from 'lit'

class ExistdbPackageInstallAction extends LitElement {
  static properties = {
    url: { type: String, reflect: true },
    abbrev: { type: String, reflect: true },
    version: { type: String, reflect: true },
    type: { type: String, reflect: true },
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color, #1976d2);
      padding: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      min-width: 36px;
    }
    button:hover {
      background: rgba(33, 150, 243, 0.1);
    }
    button svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `

  constructor() {
    super()
    this.url = ''
    this.abbrev = ''
    this.version = ''
    this.type = ''
  }

  render() {
    return html`
      <button @click=${this._submit} title="download and install latest version">
        <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      </button>
    `
  }

  _submit(e) {
    e.stopPropagation()
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('package-install-started', {
      bubbles: true,
      composed: true,
      detail: {},
    }))
  }

  async install() {
    const params = new URLSearchParams({
      'package-url': this.url,
      action: 'install',
      abbrev: this.abbrev,
      version: this.version,
    })

    try {
      const response = await fetch('../packageservice/packages/action', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })

      const text = await response.text()
      const result = JSON.parse(text)

      if (result.error !== undefined) {
        this.dispatchEvent(new CustomEvent('package-install-error', {
          bubbles: true,
          composed: true,
          detail: { error: result.error },
        }))
      } else {
        this.dispatchEvent(new CustomEvent('package-installed', {
          bubbles: true,
          composed: true,
          detail: { abbrev: this.abbrev },
        }))
      }
    } catch (err) {
      this.dispatchEvent(new CustomEvent('package-install-error', {
        bubbles: true,
        composed: true,
        detail: { error: err.message || 'Install request failed' },
      }))
    }
  }
}

customElements.define('existdb-package-install-action', ExistdbPackageInstallAction)
