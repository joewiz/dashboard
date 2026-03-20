import { LitElement, html, css } from 'lit'

class ExistdbPackageRemoveAction extends LitElement {
  static properties = {
    url: { type: String, reflect: true },
    abbrev: { type: String, reflect: true },
    packageTitle: { type: String, reflect: true, attribute: 'package-title' },
    noRemove: { type: String, reflect: true, attribute: 'no-remove' },
  }

  static styles = css`
    :host {
      display: inline-block;
      z-index: 100;
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
    button:disabled {
      color: #bbb;
      cursor: not-allowed;
    }
    button:disabled:hover {
      background: none;
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
    this.packageTitle = ''
    this.noRemove = 'false'
  }

  get _isDisabled() {
    return this.noRemove === 'true'
  }

  render() {
    return html`
      <button
        @click=${this._submit}
        title=${this._isDisabled ? 'This app cannot be removed' : 'remove this package'}
        ?disabled=${this._isDisabled}
      >
        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `
  }

  _submit(e) {
    e.stopPropagation()
    e.preventDefault()

    if (this._isDisabled) return

    if (this.url.endsWith('/packagemanager')) {
      this.dispatchEvent(new CustomEvent('packagemanager-remove-attempt', {
        bubbles: true,
        composed: true,
        detail: {},
      }))
      return
    }

    const confirmed = confirm('Really remove package?')
    if (confirmed) {
      this.dispatchEvent(new CustomEvent('package-remove-started', {
        bubbles: true,
        composed: true,
        detail: { abbrev: this.abbrev },
      }))
    }
  }

  async removeIt() {
    const params = new URLSearchParams({
      'package-url': this.url,
      action: 'remove',
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
        this.dispatchEvent(new CustomEvent('package-remove-error', {
          bubbles: true,
          composed: true,
          detail: { error: result.error },
        }))
      } else {
        this.dispatchEvent(new CustomEvent('package-removed', {
          bubbles: true,
          composed: true,
          detail: { abbrev: this.abbrev },
        }))
      }
    } catch (err) {
      this.dispatchEvent(new CustomEvent('package-remove-error', {
        bubbles: true,
        composed: true,
        detail: { error: err.message || 'Remove request failed' },
      }))
    }
  }
}

customElements.define('existdb-package-remove-action', ExistdbPackageRemoveAction)
