import { LitElement, html, css } from 'lit'

class ExistdbBackup extends LitElement {
  static properties = {
    backups: { type: Array },
    _loading: { type: Boolean, state: true },
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
      padding: 0 16px;
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      margin: -30px -30px 0 -30px;
    }

    .header h3 {
      margin: 0;
      font-weight: 400;
    }

    .card {
      max-width: 800px;
      min-width: 320px;
      padding: 0;
      margin: 50px auto;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: table;
      width: max-content;
    }

    .card-heading {
      background: var(--paper-blue-700, #1976d2);
      color: white;
      padding: 16px 20px;
      margin: 0;
      font-size: 20px;
      font-weight: 400;
      border-radius: 4px 4px 0 0;
    }

    .card-actions {
      padding: 20px;
    }

    .card-content {
      padding: 0 20px 20px;
    }

    label.checkbox {
      display: block;
      padding: 10px 0;
      cursor: pointer;
      color: #333;
      font-size: 14px;
    }

    label.checkbox input[type="checkbox"] {
      margin-right: 8px;
      accent-color: var(--paper-blue-500, #2196f3);
    }

    button.trigger {
      background: var(--paper-blue-500, #2196f3);
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 10px 0;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    button.trigger:hover {
      background: var(--paper-blue-700, #1976d2);
    }

    button.trigger:active {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }

    .warning {
      width: 100%;
      text-align: center;
      color: var(--paper-grey-700, #616161);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 10px 0;
    }

    .warning .icon {
      color: var(--paper-orange-500, #ff9800);
      font-size: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    caption, th {
      text-align: left;
    }

    caption {
      font-size: larger;
      font-weight: 500;
      padding: 10px;
      background: var(--paper-blue-700, #1976d2);
      color: white;
    }

    th {
      padding: 10px;
      color: var(--paper-blue-700, #1976d2);
    }

    tr {
      background: white;
    }

    td {
      padding: 10px;
    }

    td:nth-child(3), td:nth-child(4) {
      text-align: center;
    }

    a.download-link {
      padding: 0;
      margin: 0;
      color: var(--paper-blue-500, #2196f3);
      text-decoration: none;
    }

    a.download-link:hover {
      color: var(--paper-blue-700, #1976d2);
    }

    button.download-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--paper-blue-500, #2196f3);
      font-size: 20px;
      padding: 4px;
    }

    button.download-btn:hover {
      color: var(--paper-blue-700, #1976d2);
    }

    button.download-btn:disabled {
      color: var(--paper-grey-500, #9e9e9e);
      cursor: default;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--paper-blue-100, #bbdefb);
      border-top-color: var(--paper-blue-500, #2196f3);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .wrapper {
      padding-bottom: 50px;
    }
  `

  constructor() {
    super()
    this.backups = []
    this._loading = false
  }

  connectedCallback() {
    super.connectedCallback()
    this._loadBackups()
  }

  _resolveBasePath() {
    return '/exist/apps/dashboard/bower_components/existdb-backup/'
  }

  async _loadBackups() {
    const basePath = this._resolveBasePath()
    try {
      const resp = await fetch(`${basePath}modules/backup.xql`, {
        method: 'GET',
        credentials: 'same-origin',
      })
      if (resp.ok) {
        this.backups = await resp.json()
      } else {
        console.error('Failed to load backups:', resp.status, resp.statusText)
      }
    } catch (e) {
      console.error('An error occurred loading backups:', e)
    }
  }

  async _trigger() {
    const basePath = this._resolveBasePath()
    const zip = this.renderRoot.querySelector('#zipCheckbox').checked
    const inc = this.renderRoot.querySelector('#incCheckbox').checked

    const params = new URLSearchParams()
    if (zip) params.set('zip', 'on')
    if (inc) params.set('inc', 'on')

    this._loading = true
    try {
      const resp = await fetch(`${basePath}modules/backup.xql?action=trigger`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (resp.ok) {
        await resp.json()
      } else {
        console.error('Backup trigger failed:', resp.status, resp.statusText)
      }
    } catch (e) {
      console.error('An error occurred triggering backup:', e)
    } finally {
      this._loading = false
      this._loadBackups()
    }
  }

  _getHref(name) {
    const basePath = this._resolveBasePath()
    return `${basePath}modules/backup.xql?action=retrieve&archive=${encodeURIComponent(name)}`
  }

  _isDownloadable(name) {
    return name.endsWith('.zip')
  }

  render() {
    return html`
      ${this._loading ? html`
        <div class="backdrop">
          <div class="spinner"></div>
        </div>
      ` : ''}

      <div class="header">
        <slot name="toggleIcon"></slot>
        <h3>Backup</h3>
      </div>

      <div class="wrapper">
        <div class="card">
          <div class="card-heading">Backups</div>
          <div class="card-actions">
            <label class="checkbox">
              <input type="checkbox" id="zipCheckbox" name="zip">
              zip (Don't use for database with more than 4gb)
            </label>
            <label class="checkbox">
              <input type="checkbox" id="incCheckbox" name="inc">
              incremental
            </label>
            <button class="trigger" @click=${this._trigger}>Trigger Backup</button>
            <div class="warning">
              <span class="icon">\u26A0</span>
              For security reasons only zipped backups can be downloaded
            </div>
          </div>

          <div class="card-content">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Incremental</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${this.backups.map(item => html`
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.created}</td>
                    <td>${item.incremental}</td>
                    <td>
                      ${this._isDownloadable(item.name) ? html`
                        <a class="download-link" href=${this._getHref(item.name)} tabindex="-1" target="_blank">
                          <button class="download-btn" title="Download">\u2B73</button>
                        </a>
                      ` : html`
                        <button class="download-btn" disabled title="Not available">\u2B73</button>
                      `}
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('existdb-backup', ExistdbBackup)
