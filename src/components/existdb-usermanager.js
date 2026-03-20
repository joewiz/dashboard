import { LitElement, html, css } from 'lit'

class ExistdbUsermanager extends LitElement {
  static properties = {
    selected: { type: Number },
    users: { type: Array },
    groups: { type: Array },
    selectedUser: { type: Object },
    selectedGroup: { type: Object },
    mode: { type: String },
    apiBase: { type: String },
    _toastMessage: { type: String, state: true },
    _toastError: { type: Boolean, state: true },
    _toastVisible: { type: Boolean, state: true },
    _confirmPassword: { type: String, state: true },
  }

  static styles = css`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: auto;
      font-family: 'Roboto', 'Noto', sans-serif;
    }

    .tabs {
      display: flex;
      border-bottom: 2px solid #e0e0e0;
      background: white;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .tab {
      flex: 1;
      padding: 14px 16px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      border: none;
      background: none;
      cursor: pointer;
      color: #666;
      border-bottom: 3px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }

    .tab:hover {
      color: #1976d2;
    }

    .tab.active {
      color: var(--paper-blue-500, #2196f3);
      border-bottom-color: var(--paper-blue-500, #2196f3);
    }

    .fab {
      position: fixed;
      right: 45px;
      bottom: 40px;
      z-index: 100;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--paper-pink-500, #e91e63);
      color: white;
      border: none;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .fab:hover {
      background: var(--paper-pink-700, #c2185b);
    }

    .list {
      padding: 0 6px;
      list-style: none;
      margin: 0;
      animation: fadeIn 0.4s both;
    }

    .list li {
      padding: 10px 10px 10px 80px;
      background: white;
      margin: 10px 0;
      position: relative;
      border: 1px solid #e0e0e0;
      color: black;
      min-height: 54px;
      cursor: pointer;
    }

    .list li:hover {
      background: #fafafa;
    }

    .user-icon, .group-icon {
      position: absolute;
      left: 10px;
      top: 14px;
      font-size: 36px;
      color: #9e9e9e;
    }

    .user-name, .group-name {
      font-weight: 500;
      font-size: 20px;
      font-family: 'Roboto Mono', monospace;
    }

    .fullname, .description {
      display: block;
      font-size: 12px;
      color: #666;
    }

    .page {
      display: none;
      background: #f5f5f5;
      min-height: 100%;
    }

    .page.active {
      display: block;
    }

    .back-btn {
      position: fixed;
      top: 80px;
      right: 18px;
      z-index: 100;
      width: 48px;
      height: 48px;
      border-radius: 24px;
      background: #e0e0e0;
      border: none;
      font-size: 22px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .back-btn:hover {
      background: #bdbdbd;
    }

    .details {
      padding: 40px;
      background: white;
      overflow: auto;
      display: block;
      animation: zoomIn 0.4s both;
    }

    .details h2 {
      margin: 0 0 16px;
      font-size: 24px;
      font-weight: 400;
      color: black;
    }

    .form-field {
      margin-bottom: 12px;
    }

    .form-field label {
      display: block;
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }

    .form-field input[type="text"],
    .form-field input[type="password"],
    .form-field input[type="number"] {
      width: 100%;
      padding: 8px 0;
      font-size: 16px;
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      font-family: inherit;
      box-sizing: border-box;
      background: transparent;
    }

    .form-field input:focus {
      border-bottom: 2px solid var(--paper-blue-500, #2196f3);
    }

    .form-field input.invalid {
      border-bottom: 2px solid var(--paper-red-500, #f44336);
    }

    .field-error {
      font-size: 12px;
      color: var(--paper-red-500, #f44336);
      margin-top: 4px;
      display: none;
    }

    .field-error.visible {
      display: block;
    }

    .member-heading-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 8px;
    }

    .member-heading {
      font-size: 16px;
      font-weight: 500;
    }

    .is-manager-heading {
      font-size: 14px;
      color: #666;
    }

    .multi-select {
      border: 1px solid #ccc;
      max-height: 300px;
      overflow-y: auto;
      border-radius: 2px;
    }

    .multi-select-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      min-height: 28px;
      cursor: pointer;
      user-select: none;
    }

    .multi-select-item:hover {
      background: #f5f5f5;
    }

    .multi-select-item.selected {
      background: var(--paper-blue-grey-200, #b0bec5);
    }

    .multi-select-item span {
      flex: 1;
    }

    .multi-select-item input[type="checkbox"] {
      margin-left: 8px;
      accent-color: var(--paper-blue-500, #2196f3);
    }

    .actions {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    button.save {
      background: var(--paper-blue-500, #2196f3);
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    button.save:hover {
      background: var(--paper-blue-700, #1976d2);
    }

    button.delete {
      background: var(--paper-red-500, #f44336);
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    button.delete:hover {
      background: var(--paper-red-700, #d32f2f);
    }

    .toast {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px 24px;
      font-size: 16px;
      color: white;
      z-index: 200;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .toast.visible {
      transform: translateY(0);
    }

    .toast.info {
      background: #323232;
    }

    .toast.error {
      background: var(--paper-red-500, #f44336);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .toast.error a {
      color: white;
      cursor: pointer;
      text-decoration: underline;
      margin-left: 16px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale3d(0.1, 0.1, 0.1);
      }
      50% { opacity: 0.3; }
    }
  `

  constructor() {
    super()
    this.selected = 0
    this.users = []
    this.groups = []
    this.selectedUser = null
    this.selectedGroup = null
    this.mode = 'edit'
    this.apiBase = '/exist/apps/dashboard/bower_components/existdb-usermanager/'
    this._toastMessage = ''
    this._toastError = false
    this._toastVisible = false
    this._confirmPassword = ''
  }

  connectedCallback() {
    super.connectedCallback()
    this._loadData()
  }

  _resolveApiUrl(endpoint) {
    return `${this.apiBase}${endpoint}`
  }

  async _loadData() {
    await Promise.all([
      this._loadUsers(),
      this._loadGroups(),
    ])
  }

  async _loadUsers() {
    try {
      const resp = await fetch(this._resolveApiUrl('api/user/'), {
        credentials: 'same-origin',
      })
      if (resp.ok) {
        this.users = await resp.json()
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to load users: ' + e.message)
    }
  }

  async _loadGroups() {
    try {
      const resp = await fetch(this._resolveApiUrl('api/group/'), {
        credentials: 'same-origin',
      })
      if (resp.ok) {
        this.groups = await resp.json()
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to load groups: ' + e.message)
    }
  }

  _switchPage(page) {
    if (page === 0 || page === 1) {
      this._loadData()
    }
    this.selected = page
  }

  // --- User handlers ---

  _handleAddUser(e) {
    e.stopPropagation()
    e.preventDefault()
    this.selectedUser = {
      user: '',
      fullName: '',
      description: '',
      password: '',
      disabled: false,
      umask: '022',
      groups: [],
    }
    this._confirmPassword = ''
    this._switchPage(2)
  }

  _editUser(item) {
    this.selectedUser = { ...item }
    if (!this.selectedUser.groups) {
      this.selectedUser.groups = []
    }
    this._confirmPassword = ''
    this._switchPage(2)
  }

  _validateUserForm() {
    const root = this.renderRoot
    const usernameInput = root.querySelector('#userInput')
    const pattern = /^[@.A-Za-z0-9_-]+$/
    let valid = true

    if (!this.selectedUser.user || !pattern.test(this.selectedUser.user)) {
      usernameInput?.classList.add('invalid')
      valid = false
    } else {
      usernameInput?.classList.remove('invalid')
    }

    if (this.selectedUser.password && this.selectedUser.password !== this._confirmPassword) {
      valid = false
    }

    return valid
  }

  async _handleSaveUser() {
    if (!this._validateUserForm()) return

    // Collect selected groups from the multi-select
    const selectedGroups = this._getSelectedUserGroups()
    this.selectedUser.groups = selectedGroups

    try {
      const resp = await fetch(
        this._resolveApiUrl('api/user/' + encodeURIComponent(this.selectedUser.user)),
        {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.selectedUser),
        }
      )
      if (resp.ok) {
        document.dispatchEvent(new CustomEvent('checkUser', {
          detail: {
            user: this.selectedUser.user,
            password: this.selectedUser.password,
          },
        }))
        this._showToast('User ' + this.selectedUser.user + ' has been saved.')
        this._switchPage(0)
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to save user: ' + e.message)
    }
  }

  async _handleDeleteUser() {
    if (!confirm('Really delete this user?')) return

    try {
      const resp = await fetch(
        this._resolveApiUrl('api/user/' + encodeURIComponent(this.selectedUser.user)),
        {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (resp.ok) {
        this._showToast('User ' + this.selectedUser.user + ' has been deleted.')
        this._switchPage(0)
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to delete user: ' + e.message)
    }
  }

  _getSelectedUserGroups() {
    const checkboxes = this.renderRoot.querySelectorAll('.user-group-select input[type="checkbox"]')
    const selected = []
    checkboxes.forEach(cb => {
      if (cb.checked) selected.push(cb.value)
    })
    return selected
  }

  // --- Group handlers ---

  _handleAddGroup(e) {
    e.stopPropagation()
    e.preventDefault()
    this.selectedGroup = {
      group: '',
      description: '',
      members: [],
    }
    this._switchPage(3)
  }

  _editGroup(item) {
    this.selectedGroup = { ...item }
    if (!this.selectedGroup.members) {
      this.selectedGroup.members = []
    }
    this._switchPage(3)
  }

  async _handleSaveGroup() {
    const root = this.renderRoot
    const groupInput = root.querySelector('#groupInput')
    const pattern = /^[@.A-Za-z0-9_-]+$/

    if (!this.selectedGroup.group || !pattern.test(this.selectedGroup.group)) {
      groupInput?.classList.add('invalid')
      return
    }
    groupInput?.classList.remove('invalid')

    // Collect selected members and manager status
    const memberCheckboxes = root.querySelectorAll('.group-member-select input[type="checkbox"].member-cb')
    const managerCheckboxes = root.querySelectorAll('.group-member-select input[type="checkbox"].manager-cb')
    const members = []
    memberCheckboxes.forEach((cb, idx) => {
      if (cb.checked) {
        const managerCb = managerCheckboxes[idx]
        members.push({
          member: cb.value,
          isManager: managerCb ? managerCb.checked : false,
        })
      }
    })
    this.selectedGroup.members = members

    try {
      const resp = await fetch(
        this._resolveApiUrl('api/group/' + encodeURIComponent(this.selectedGroup.group)),
        {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.selectedGroup),
        }
      )
      if (resp.ok) {
        this._showToast('Group ' + this.selectedGroup.group + ' has been saved.')
        this._switchPage(1)
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to save group: ' + e.message)
    }
  }

  async _handleDeleteGroup() {
    if (!confirm('Really delete this group?')) return

    try {
      const resp = await fetch(
        this._resolveApiUrl('api/group/' + encodeURIComponent(this.selectedGroup.group)),
        {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      if (resp.ok) {
        this._showToast('Group ' + this.selectedGroup.group + ' has been deleted.')
        this._switchPage(1)
      } else {
        this._handleResponseError(resp)
      }
    } catch (e) {
      this._showError('Failed to delete group: ' + e.message)
    }
  }

  _isManager(userName, group) {
    if (!group || !group.members) return false
    return group.members.some(m => m.member === userName && m.isManager === true)
  }

  _isMember(userName, group) {
    if (!group || !group.members) return false
    return group.members.some(m => m.member === userName)
  }

  // --- Toast / error ---

  _showToast(msg) {
    this._toastMessage = msg
    this._toastError = false
    this._toastVisible = true
    setTimeout(() => { this._toastVisible = false }, 4000)
  }

  _showError(msg) {
    this._toastMessage = msg
    this._toastError = true
    this._toastVisible = true
  }

  _closeToast() {
    this._toastVisible = false
  }

  async _handleResponseError(resp) {
    let msg
    if (resp.status === 403) {
      msg = "You don't have sufficient privileges to access UserManager"
    } else if (resp.status === 400) {
      const body = await resp.text().catch(() => '')
      msg = 'Server responded: ' + resp.statusText + ': ' + body
    } else {
      msg = 'Server responded: ' + resp.status + ' - ' + resp.statusText
    }
    this._showError(msg)
  }

  // --- Input handlers ---

  _onUserFieldChange(field, e) {
    this.selectedUser = { ...this.selectedUser, [field]: e.target.value }
  }

  _onGroupFieldChange(field, e) {
    this.selectedGroup = { ...this.selectedGroup, [field]: e.target.value }
  }

  // --- Render ---

  render() {
    return html`
      ${this._renderUserListPage()}
      ${this._renderGroupListPage()}
      ${this._renderEditUserPage()}
      ${this._renderEditGroupPage()}
      ${this._renderToast()}
    `
  }

  _renderTabs() {
    return html`
      <div class="tabs">
        <button class="tab ${this.selected === 0 ? 'active' : ''}"
                @click=${() => this._switchPage(0)}>Users</button>
        <button class="tab ${this.selected === 1 ? 'active' : ''}"
                @click=${() => this._switchPage(1)}>Groups</button>
      </div>
    `
  }

  _renderUserListPage() {
    return html`
      <div class="page ${this.selected === 0 ? 'active' : ''}">
        ${this._renderTabs()}
        <button class="fab" @click=${this._handleAddUser} title="Add user">+</button>
        <ul class="list">
          ${this.users.map(item => html`
            <li @click=${() => this._editUser(item)}>
              <span class="user-icon">\u{1F464}</span>
              <span class="user-name" title="User Name">${item.user}</span>
              <span class="fullname">${item.fullName}</span>
              <span class="description">${item.description}</span>
            </li>
          `)}
        </ul>
      </div>
    `
  }

  _renderGroupListPage() {
    return html`
      <div class="page ${this.selected === 1 ? 'active' : ''}">
        ${this._renderTabs()}
        <button class="fab" @click=${this._handleAddGroup} title="Add group">+</button>
        <ul class="list">
          ${this.groups.map(item => html`
            <li @click=${() => this._editGroup(item)}>
              <span class="group-icon">\u{1F465}</span>
              <span class="group-name" title="Group">${item.group}</span>
              <span class="description">${item.description}</span>
            </li>
          `)}
        </ul>
      </div>
    `
  }

  _renderEditUserPage() {
    if (!this.selectedUser) return ''
    const passwordMismatch = this.selectedUser.password &&
      this._confirmPassword &&
      this.selectedUser.password !== this._confirmPassword

    return html`
      <div class="page ${this.selected === 2 ? 'active' : ''}">
        <button class="back-btn" @click=${() => this._switchPage(0)}
                title="Back to users">\u2715</button>
        <div class="details">
          <h2>User</h2>
          <form @submit=${(e) => { e.preventDefault(); this._handleSaveUser() }}>
            <div class="form-field">
              <label for="userInput">User Name *</label>
              <input type="text" id="userInput"
                     .value=${this.selectedUser.user}
                     @input=${(e) => this._onUserFieldChange('user', e)}
                     pattern="[@.A-Za-z0-9_-]+"
                     required>
              <div class="field-error ${!this.selectedUser.user || /^[@.A-Za-z0-9_-]+$/.test(this.selectedUser.user) ? '' : 'visible'}">
                Only the chars A-Z, a-z, 0-9, @, ., _, - are allowed as username
              </div>
            </div>

            <div class="form-field">
              <label for="fullNameInput">Full Name</label>
              <input type="text" id="fullNameInput"
                     .value=${this.selectedUser.fullName || ''}
                     @input=${(e) => this._onUserFieldChange('fullName', e)}>
            </div>

            <div class="form-field">
              <label for="descInput">Description</label>
              <input type="text" id="descInput"
                     .value=${this.selectedUser.description || ''}
                     @input=${(e) => this._onUserFieldChange('description', e)}>
            </div>

            <div class="form-field">
              <label for="passwordInput">Password</label>
              <input type="password" id="passwordInput"
                     .value=${this.selectedUser.password || ''}
                     @input=${(e) => this._onUserFieldChange('password', e)}>
            </div>

            <div class="form-field">
              <label for="confirmInput">Confirm Password</label>
              <input type="password" id="confirmInput"
                     .value=${this._confirmPassword}
                     @input=${(e) => { this._confirmPassword = e.target.value }}
                     class="${passwordMismatch ? 'invalid' : ''}">
              <div class="field-error ${passwordMismatch ? 'visible' : ''}">
                Passwords need to match
              </div>
            </div>

            <div class="form-field">
              <label for="umaskInput">umask</label>
              <input type="number" id="umaskInput" max="777"
                     .value=${this.selectedUser.umask || ''}
                     @input=${(e) => this._onUserFieldChange('umask', e)}>
            </div>

            <div class="member-heading-row">
              <span class="member-heading">Member of groups</span>
            </div>
            <div class="multi-select user-group-select">
              ${this.groups.map(g => html`
                <label class="multi-select-item ${this.selectedUser.groups?.includes(g.group) ? 'selected' : ''}">
                  <input type="checkbox"
                         .value=${g.group}
                         .checked=${this.selectedUser.groups?.includes(g.group) || false}>
                  <span>${g.group}</span>
                </label>
              `)}
            </div>

            <div class="actions">
              <button type="submit" class="save">Save</button>
              <button type="button" class="delete" @click=${this._handleDeleteUser}>Delete User</button>
            </div>
          </form>
        </div>
      </div>
    `
  }

  _renderEditGroupPage() {
    if (!this.selectedGroup) return ''

    return html`
      <div class="page ${this.selected === 3 ? 'active' : ''}">
        <button class="back-btn" @click=${() => this._switchPage(1)}
                title="Back to groups">\u2715</button>
        <div class="details">
          <h2>Group</h2>
          <form @submit=${(e) => { e.preventDefault(); this._handleSaveGroup() }}>
            <div class="form-field">
              <label for="groupInput">Group Name *</label>
              <input type="text" id="groupInput"
                     .value=${this.selectedGroup.group}
                     @input=${(e) => this._onGroupFieldChange('group', e)}
                     pattern="[@.A-Za-z0-9_-]+"
                     required>
              <div class="field-error ${!this.selectedGroup.group || /^[@.A-Za-z0-9_-]+$/.test(this.selectedGroup.group) ? '' : 'visible'}">
                Only the chars A-Z, a-z, 0-9, @, ., _, - are allowed as group name
              </div>
            </div>

            <div class="form-field">
              <label for="groupDescInput">Description</label>
              <input type="text" id="groupDescInput"
                     .value=${this.selectedGroup.description || ''}
                     @input=${(e) => this._onGroupFieldChange('description', e)}>
            </div>

            <div class="member-heading-row">
              <span class="member-heading">Users in this group</span>
              <span class="is-manager-heading">is Manager</span>
            </div>
            <div class="multi-select group-member-select">
              ${this.users.map(u => html`
                <label class="multi-select-item ${this._isMember(u.user, this.selectedGroup) ? 'selected' : ''}">
                  <input type="checkbox"
                         class="member-cb"
                         .value=${u.user}
                         .checked=${this._isMember(u.user, this.selectedGroup)}>
                  <span>${u.user}</span>
                  <input type="checkbox"
                         class="manager-cb"
                         .checked=${this._isManager(u.user, this.selectedGroup)}
                         title="Manager">
                </label>
              `)}
            </div>

            <div class="actions">
              <button type="submit" class="save">Save</button>
              <button type="button" class="delete" @click=${this._handleDeleteGroup}>Delete Group</button>
            </div>
          </form>
        </div>
      </div>
    `
  }

  _renderToast() {
    if (this._toastError) {
      return html`
        <div class="toast error ${this._toastVisible ? 'visible' : ''}">
          <span>${this._toastMessage}</span>
          <a @click=${this._closeToast}>close</a>
        </div>
      `
    }
    return html`
      <div class="toast info ${this._toastVisible ? 'visible' : ''}">
        ${this._toastMessage}
      </div>
    `
  }
}

customElements.define('existdb-usermanager', ExistdbUsermanager)
