import{n as e,r as t,t as n}from"./chunks/existdb-launcher-app-BdnFvJo-.js";var r=class extends n{static properties={service:{type:String,reflect:!0},autoLoad:{type:Boolean,attribute:`auto-load`},count:{type:Number,reflect:!0},_loading:{type:Boolean,state:!0}};static styles=t`
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
  `;constructor(){super(),this.service=``,this.autoLoad=!1,this.count=0,this._loading=!1,this._packages=[],this._onPackageRemoved=()=>this.loadPackages(),this._onPackageInstalled=()=>this.loadPackages()}connectedCallback(){super.connectedCallback(),window.addEventListener(`package-removed`,this._onPackageRemoved),window.addEventListener(`package-installed`,this._onPackageInstalled),this.autoLoad&&this.loadPackages()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`package-removed`,this._onPackageRemoved),window.removeEventListener(`package-installed`,this._onPackageInstalled)}render(){return e`
      <div class="spin-wrapper" ?hidden=${!this._loading}>
        <div class="spinner"></div>
      </div>
      <div id="itemList" class="items">
        <slot></slot>
      </div>
    `}async loadPackages(){if(this.service){this._loading=!0;try{let e=await fetch(this.service,{method:`GET`,credentials:`same-origin`,headers:{Accept:`text/html`}});if(!e.ok)throw Error(`HTTP ${e.status}: ${e.statusText}`);let t=await e.text();await this.updateComplete;let n=this.shadowRoot.querySelector(`#itemList`);n.innerHTML=t,this._packages=this.shadowRoot.querySelectorAll(`repo-app`),this.count=this._packages.length,this.dispatchEvent(new CustomEvent(`packages-loaded`,{bubbles:!0,composed:!0,detail:{type:this.id}}))}catch{this.dispatchEvent(new CustomEvent(`packages-load-error`,{bubbles:!0,composed:!0,detail:{error:`loading of available packages failed`}}))}finally{this._loading=!1}}}getPackages(){return this._packages}};customElements.define(`existdb-packages`,r);var i=class extends n{static properties={selected:{type:Number},localCount:{type:Number},remoteCount:{type:Number},_toastMessage:{type:String,state:!0},_toastVisible:{type:Boolean,state:!0},_toastIsError:{type:Boolean,state:!0},_updatesVisible:{type:Boolean,state:!0}};static styles=t`
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
  `;constructor(){super(),this.selected=0,this.localCount=0,this.remoteCount=0,this._toastMessage=``,this._toastVisible=!1,this._toastIsError=!1,this._toastTimeout=null,this._updatesVisible=!1,this._local=[],this._remote=[],this._boundKeyHandler=this._handleKeyboard.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this._boundKeyHandler),window.addEventListener(`packages-loaded`,e=>this._handlePackagesLoaded(e)),window.addEventListener(`package-installed`,e=>{this._toast(`Package has been installed: `+e.detail.abbrev)}),window.addEventListener(`package-install-error`,e=>{this._toastError(e.detail.error)}),window.addEventListener(`package-removed`,e=>{this._toast(`Successfully removed "`+e.detail.abbrev+`"`)}),window.addEventListener(`package-remove-error`,e=>{let t=e.detail.error,n=t&&t.error&&t.error.message?t.error.message:typeof t==`string`?t:`Remove failed`;this._toastError(n)}),window.addEventListener(`packages-load-error`,e=>{this._toastError(e.detail.error)}),window.addEventListener(`packagemanager-remove-attempt`,()=>{this._toastError(`Package Manager cannot be removed.`)})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this._boundKeyHandler)}firstUpdated(){this._getLocalService().loadPackages(),this._getRemoteService().loadPackages();let e=this.shadowRoot.querySelector(`#filterLocal`);e&&e.focus()}_getLocalService(){return this.shadowRoot.querySelector(`#localService`)}_getRemoteService(){return this.shadowRoot.querySelector(`#remoteService`)}render(){let t=[`toast`,this._toastVisible?`visible`:``,this._toastIsError?`error`:`info`].filter(Boolean).join(` `);return e`
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
          <button class="tab ${this.selected===0?`active`:``}" @click=${()=>this._selectTab(0)}>
            Installed (${this.localCount})
          </button>
          <button class="tab ${this.selected===1?`active`:``}" @click=${()=>this._selectTab(1)}>
            Available (${this.remoteCount})
          </button>
        </div>

        <!-- Pages -->
        <div class="pages">
          <div class="page" ?hidden=${this.selected!==0}>
            <existdb-packages
              id="localService"
              service="../packageservice/packages/local"
            ></existdb-packages>
          </div>
          <div class="page" ?hidden=${this.selected!==1}>
            <existdb-packages
              id="remoteService"
              service="../packageservice/packages/remote"
            ></existdb-packages>
          </div>
        </div>
      </div>

      <!-- Toast notification -->
      <div class=${t}>
        <span>${this._toastMessage}</span>
        ${this._toastIsError?e`
          <button class="toast-close" @click=${this._hideToast}>&times;</button>
        `:``}
      </div>

      <!-- Updates banner -->
      <div class="updates-banner ${this._updatesVisible?`visible`:``}">
        <span>Updates available</span>
        <button class="updates-btn" @click=${this._goToAvailable}>install...</button>
        <button class="updates-close" @click=${this._hideUpdates}>&times;</button>
      </div>
    `}_selectTab(e){this.selected=e,this._resetFilters(),e===0?this._getLocalService().loadPackages():(this._updatesVisible=!1,this._getRemoteService().loadPackages())}_handleKeyboard(e){if(e.key===`Escape`){this._resetFilters(),this.selected===0?this._getLocalService().loadPackages():this._getRemoteService().loadPackages(),this.focus();return}if(e.ctrlKey&&e.key===`f`){e.preventDefault();let t=this.shadowRoot.querySelector(`#filterLocal`);t&&t.focus();return}if(e.ctrlKey&&e.key===`u`){e.preventDefault(),this._triggerUpload();return}if(e.key===`ArrowRight`&&!e.target.matches(`input`)){this._selectTab(1);return}e.key===`ArrowLeft`&&!e.target.matches(`input`)&&this._selectTab(0)}_handleFilter(){let e=(this.shadowRoot.querySelector(`#filterLocal`).value||``).toLowerCase();this.selected===0?this.localCount=this._filter(this._local,e):this.remoteCount=this._filter(this._remote,e)}_filter(e,t){let n=e.length;for(let r=0;r<e.length;r++){let i=e[r],a=i.querySelector(`repo-title`);(a?a.textContent:``).toLowerCase().includes(t)?i.hasAttribute(`hidden`)&&i.removeAttribute(`hidden`):(i.setAttribute(`hidden`,``),n--)}return n}_resetFilters(){let e=this.shadowRoot.querySelector(`#filterLocal`);e&&(e.value=``)}_handlePackagesLoaded(e){let t=this._getLocalService(),n=this._getRemoteService();this._local=t.getPackages(),this._remote=n.getPackages(),this.localCount=t.count,this.remoteCount=n.count,this.selected===0&&this._checkForUpdates();let r=this.shadowRoot.querySelector(`#filterLocal`);r&&r.focus()}_triggerUpload(){let e=this.shadowRoot.querySelector(`#fileInput`);e&&e.click()}async _handleUpload(e){let t=e.target.files[0];if(!t)return;let n=new FormData;n.append(`uploadedfiles[]`,t);try{let e=await(await fetch(`../packageservice/packages/action?name=`+encodeURIComponent(t.name),{method:`POST`,credentials:`same-origin`,body:n})).text(),r=JSON.parse(e),i=Array.isArray(r)?r[0]:r;i.error===void 0?this._toast(`Package uploaded successfully`):this._toastError(i.error),this._getLocalService().loadPackages()}catch(e){this._toastError(`Upload failed for: `+t.name+` Reason: `+(e.message||`unknown error`))}e.target.value=``}_checkForUpdates(){if(!(!this._remote||this._remote.length===0)){for(let e of this._remote)if(e.classList&&e.classList.contains(`update`)&&this.selected===0){this._updatesVisible=!0;return}}}_goToAvailable(){this._updatesVisible=!1,this._selectTab(1)}_hideUpdates(){this._updatesVisible=!1}_toast(e){this._toastMessage=e,this._toastIsError=!1,this._toastVisible=!0,this._toastTimeout&&clearTimeout(this._toastTimeout),this._toastTimeout=setTimeout(()=>{this._toastVisible=!1},5e3)}_toastError(e){this._toastMessage=e,this._toastIsError=!0,this._toastVisible=!0,this._toastTimeout&&clearTimeout(this._toastTimeout)}_hideToast(){this._toastVisible=!1}};customElements.define(`existdb-packagemanager`,i);var a=class extends n{static properties={selected:{type:Number},users:{type:Array},groups:{type:Array},selectedUser:{type:Object},selectedGroup:{type:Object},mode:{type:String},apiBase:{type:String},_toastMessage:{type:String,state:!0},_toastError:{type:Boolean,state:!0},_toastVisible:{type:Boolean,state:!0},_confirmPassword:{type:String,state:!0}};static styles=t`
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
  `;constructor(){super(),this.selected=0,this.users=[],this.groups=[],this.selectedUser=null,this.selectedGroup=null,this.mode=`edit`,this.apiBase=`/exist/apps/usermanager/`,this._toastMessage=``,this._toastError=!1,this._toastVisible=!1,this._confirmPassword=``}connectedCallback(){super.connectedCallback(),this._loadData()}_resolveApiUrl(e){return`${this.apiBase}${e}`}async _loadData(){await Promise.all([this._loadUsers(),this._loadGroups()])}async _loadUsers(){try{let e=await fetch(this._resolveApiUrl(`api/user/`),{credentials:`same-origin`});e.ok?this.users=await e.json():this._handleResponseError(e)}catch(e){this._showError(`Failed to load users: `+e.message)}}async _loadGroups(){try{let e=await fetch(this._resolveApiUrl(`api/group/`),{credentials:`same-origin`});e.ok?this.groups=await e.json():this._handleResponseError(e)}catch(e){this._showError(`Failed to load groups: `+e.message)}}_switchPage(e){(e===0||e===1)&&this._loadData(),this.selected=e}_handleAddUser(e){e.stopPropagation(),e.preventDefault(),this.selectedUser={user:``,fullName:``,description:``,password:``,disabled:!1,umask:`022`,groups:[]},this._confirmPassword=``,this._switchPage(2)}_editUser(e){this.selectedUser={...e},this.selectedUser.groups||(this.selectedUser.groups=[]),this._confirmPassword=``,this._switchPage(2)}_validateUserForm(){let e=this.renderRoot.querySelector(`#userInput`),t=/^[@.A-Za-z0-9_-]+$/,n=!0;return!this.selectedUser.user||!t.test(this.selectedUser.user)?(e?.classList.add(`invalid`),n=!1):e?.classList.remove(`invalid`),this.selectedUser.password&&this.selectedUser.password!==this._confirmPassword&&(n=!1),n}async _handleSaveUser(){if(!this._validateUserForm())return;let e=this._getSelectedUserGroups();this.selectedUser.groups=e;try{let e=await fetch(this._resolveApiUrl(`api/user/`+encodeURIComponent(this.selectedUser.user)),{method:`PUT`,credentials:`same-origin`,headers:{"Content-Type":`application/json`},body:JSON.stringify(this.selectedUser)});e.ok?(document.dispatchEvent(new CustomEvent(`checkUser`,{detail:{user:this.selectedUser.user,password:this.selectedUser.password}})),this._showToast(`User `+this.selectedUser.user+` has been saved.`),this._switchPage(0)):this._handleResponseError(e)}catch(e){this._showError(`Failed to save user: `+e.message)}}async _handleDeleteUser(){if(confirm(`Really delete this user?`))try{let e=await fetch(this._resolveApiUrl(`api/user/`+encodeURIComponent(this.selectedUser.user)),{method:`DELETE`,credentials:`same-origin`,headers:{"Content-Type":`application/json`}});e.ok?(this._showToast(`User `+this.selectedUser.user+` has been deleted.`),this._switchPage(0)):this._handleResponseError(e)}catch(e){this._showError(`Failed to delete user: `+e.message)}}_getSelectedUserGroups(){let e=this.renderRoot.querySelectorAll(`.user-group-select input[type="checkbox"]`),t=[];return e.forEach(e=>{e.checked&&t.push(e.value)}),t}_handleAddGroup(e){e.stopPropagation(),e.preventDefault(),this.selectedGroup={group:``,description:``,members:[]},this._switchPage(3)}_editGroup(e){this.selectedGroup={...e},this.selectedGroup.members||(this.selectedGroup.members=[]),this._switchPage(3)}async _handleSaveGroup(){let e=this.renderRoot,t=e.querySelector(`#groupInput`);if(!this.selectedGroup.group||!/^[@.A-Za-z0-9_-]+$/.test(this.selectedGroup.group)){t?.classList.add(`invalid`);return}t?.classList.remove(`invalid`);let n=e.querySelectorAll(`.group-member-select input[type="checkbox"].member-cb`),r=e.querySelectorAll(`.group-member-select input[type="checkbox"].manager-cb`),i=[];n.forEach((e,t)=>{if(e.checked){let n=r[t];i.push({member:e.value,isManager:n?n.checked:!1})}}),this.selectedGroup.members=i;try{let e=await fetch(this._resolveApiUrl(`api/group/`+encodeURIComponent(this.selectedGroup.group)),{method:`PUT`,credentials:`same-origin`,headers:{"Content-Type":`application/json`},body:JSON.stringify(this.selectedGroup)});e.ok?(this._showToast(`Group `+this.selectedGroup.group+` has been saved.`),this._switchPage(1)):this._handleResponseError(e)}catch(e){this._showError(`Failed to save group: `+e.message)}}async _handleDeleteGroup(){if(confirm(`Really delete this group?`))try{let e=await fetch(this._resolveApiUrl(`api/group/`+encodeURIComponent(this.selectedGroup.group)),{method:`DELETE`,credentials:`same-origin`,headers:{"Content-Type":`application/json`}});e.ok?(this._showToast(`Group `+this.selectedGroup.group+` has been deleted.`),this._switchPage(1)):this._handleResponseError(e)}catch(e){this._showError(`Failed to delete group: `+e.message)}}_isManager(e,t){return!t||!t.members?!1:t.members.some(t=>t.member===e&&t.isManager===!0)}_isMember(e,t){return!t||!t.members?!1:t.members.some(t=>t.member===e)}_showToast(e){this._toastMessage=e,this._toastError=!1,this._toastVisible=!0,setTimeout(()=>{this._toastVisible=!1},4e3)}_showError(e){this._toastMessage=e,this._toastError=!0,this._toastVisible=!0}_closeToast(){this._toastVisible=!1}async _handleResponseError(e){let t;if(e.status===403)t=`You don't have sufficient privileges to access UserManager`;else if(e.status===400){let n=await e.text().catch(()=>``);t=`Server responded: `+e.statusText+`: `+n}else t=`Server responded: `+e.status+` - `+e.statusText;this._showError(t)}_onUserFieldChange(e,t){this.selectedUser={...this.selectedUser,[e]:t.target.value}}_onGroupFieldChange(e,t){this.selectedGroup={...this.selectedGroup,[e]:t.target.value}}render(){return e`
      ${this._renderUserListPage()}
      ${this._renderGroupListPage()}
      ${this._renderEditUserPage()}
      ${this._renderEditGroupPage()}
      ${this._renderToast()}
    `}_renderTabs(){return e`
      <div class="tabs">
        <button class="tab ${this.selected===0?`active`:``}"
                @click=${()=>this._switchPage(0)}>Users</button>
        <button class="tab ${this.selected===1?`active`:``}"
                @click=${()=>this._switchPage(1)}>Groups</button>
      </div>
    `}_renderUserListPage(){return e`
      <div class="page ${this.selected===0?`active`:``}">
        ${this._renderTabs()}
        <button class="fab" @click=${this._handleAddUser} title="Add user">+</button>
        <ul class="list">
          ${this.users.map(t=>e`
            <li @click=${()=>this._editUser(t)}>
              <span class="user-icon">\u{1F464}</span>
              <span class="user-name" title="User Name">${t.user}</span>
              <span class="fullname">${t.fullName}</span>
              <span class="description">${t.description}</span>
            </li>
          `)}
        </ul>
      </div>
    `}_renderGroupListPage(){return e`
      <div class="page ${this.selected===1?`active`:``}">
        ${this._renderTabs()}
        <button class="fab" @click=${this._handleAddGroup} title="Add group">+</button>
        <ul class="list">
          ${this.groups.map(t=>e`
            <li @click=${()=>this._editGroup(t)}>
              <span class="group-icon">\u{1F465}</span>
              <span class="group-name" title="Group">${t.group}</span>
              <span class="description">${t.description}</span>
            </li>
          `)}
        </ul>
      </div>
    `}_renderEditUserPage(){if(!this.selectedUser)return``;let t=this.selectedUser.password&&this._confirmPassword&&this.selectedUser.password!==this._confirmPassword;return e`
      <div class="page ${this.selected===2?`active`:``}">
        <button class="back-btn" @click=${()=>this._switchPage(0)}
                title="Back to users">\u2715</button>
        <div class="details">
          <h2>User</h2>
          <form @submit=${e=>{e.preventDefault(),this._handleSaveUser()}}>
            <div class="form-field">
              <label for="userInput">User Name *</label>
              <input type="text" id="userInput"
                     .value=${this.selectedUser.user}
                     @input=${e=>this._onUserFieldChange(`user`,e)}
                     pattern="[@.A-Za-z0-9_-]+"
                     required>
              <div class="field-error ${!this.selectedUser.user||/^[@.A-Za-z0-9_-]+$/.test(this.selectedUser.user)?``:`visible`}">
                Only the chars A-Z, a-z, 0-9, @, ., _, - are allowed as username
              </div>
            </div>

            <div class="form-field">
              <label for="fullNameInput">Full Name</label>
              <input type="text" id="fullNameInput"
                     .value=${this.selectedUser.fullName||``}
                     @input=${e=>this._onUserFieldChange(`fullName`,e)}>
            </div>

            <div class="form-field">
              <label for="descInput">Description</label>
              <input type="text" id="descInput"
                     .value=${this.selectedUser.description||``}
                     @input=${e=>this._onUserFieldChange(`description`,e)}>
            </div>

            <div class="form-field">
              <label for="passwordInput">Password</label>
              <input type="password" id="passwordInput"
                     .value=${this.selectedUser.password||``}
                     @input=${e=>this._onUserFieldChange(`password`,e)}>
            </div>

            <div class="form-field">
              <label for="confirmInput">Confirm Password</label>
              <input type="password" id="confirmInput"
                     .value=${this._confirmPassword}
                     @input=${e=>{this._confirmPassword=e.target.value}}
                     class="${t?`invalid`:``}">
              <div class="field-error ${t?`visible`:``}">
                Passwords need to match
              </div>
            </div>

            <div class="form-field">
              <label for="umaskInput">umask</label>
              <input type="number" id="umaskInput" max="777"
                     .value=${this.selectedUser.umask||``}
                     @input=${e=>this._onUserFieldChange(`umask`,e)}>
            </div>

            <div class="member-heading-row">
              <span class="member-heading">Member of groups</span>
            </div>
            <div class="multi-select user-group-select">
              ${this.groups.map(t=>e`
                <label class="multi-select-item ${this.selectedUser.groups?.includes(t.group)?`selected`:``}">
                  <input type="checkbox"
                         .value=${t.group}
                         .checked=${this.selectedUser.groups?.includes(t.group)||!1}>
                  <span>${t.group}</span>
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
    `}_renderEditGroupPage(){return this.selectedGroup?e`
      <div class="page ${this.selected===3?`active`:``}">
        <button class="back-btn" @click=${()=>this._switchPage(1)}
                title="Back to groups">\u2715</button>
        <div class="details">
          <h2>Group</h2>
          <form @submit=${e=>{e.preventDefault(),this._handleSaveGroup()}}>
            <div class="form-field">
              <label for="groupInput">Group Name *</label>
              <input type="text" id="groupInput"
                     .value=${this.selectedGroup.group}
                     @input=${e=>this._onGroupFieldChange(`group`,e)}
                     pattern="[@.A-Za-z0-9_-]+"
                     required>
              <div class="field-error ${!this.selectedGroup.group||/^[@.A-Za-z0-9_-]+$/.test(this.selectedGroup.group)?``:`visible`}">
                Only the chars A-Z, a-z, 0-9, @, ., _, - are allowed as group name
              </div>
            </div>

            <div class="form-field">
              <label for="groupDescInput">Description</label>
              <input type="text" id="groupDescInput"
                     .value=${this.selectedGroup.description||``}
                     @input=${e=>this._onGroupFieldChange(`description`,e)}>
            </div>

            <div class="member-heading-row">
              <span class="member-heading">Users in this group</span>
              <span class="is-manager-heading">is Manager</span>
            </div>
            <div class="multi-select group-member-select">
              ${this.users.map(t=>e`
                <label class="multi-select-item ${this._isMember(t.user,this.selectedGroup)?`selected`:``}">
                  <input type="checkbox"
                         class="member-cb"
                         .value=${t.user}
                         .checked=${this._isMember(t.user,this.selectedGroup)}>
                  <span>${t.user}</span>
                  <input type="checkbox"
                         class="manager-cb"
                         .checked=${this._isManager(t.user,this.selectedGroup)}
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
    `:``}_renderToast(){return this._toastError?e`
        <div class="toast error ${this._toastVisible?`visible`:``}">
          <span>${this._toastMessage}</span>
          <a @click=${this._closeToast}>close</a>
        </div>
      `:e`
      <div class="toast info ${this._toastVisible?`visible`:``}">
        ${this._toastMessage}
      </div>
    `}};customElements.define(`existdb-usermanager`,a);var o=class extends n{static properties={logout:{type:Boolean}};static styles=t`
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

    .header .icon {
      margin-right: 10px;
      font-size: 24px;
    }

    .header h3 {
      margin: 0;
      font-weight: 400;
      flex: 1;
    }

    .header a {
      color: white;
      font-size: 18px;
      font-weight: 300;
      margin-right: 20px;
      text-decoration: none;
    }

    .header a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 768px) {
      .header h3 {
        font-size: 18px;
      }
      .header .icon {
        display: none;
      }
    }
  `;constructor(){super(),this.logout=!1}connectedCallback(){super.connectedCallback(),this.hasAttribute(`logout`)&&this.getAttribute(`logout`)===`true`&&(this.logout=!0)}render(){return e`
      <div class="header">
        <span class="icon">\u{1F465}</span>
        <slot name="toggleIcon"></slot>
        <h3>User Manager</h3>
        ${this.logout?e`<a href="index.html?logout=true">logout</a>`:``}
      </div>
      <existdb-usermanager></existdb-usermanager>
    `}};customElements.define(`existdb-usermanager-app`,o);var s=class extends n{static properties={backups:{type:Array},_loading:{type:Boolean,state:!0}};static styles=t`
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
  `;constructor(){super(),this.backups=[],this._loading=!1}connectedCallback(){super.connectedCallback(),this._loadBackups()}_resolveBasePath(){let e=window.location.pathname;return e.substring(0,e.lastIndexOf(`/`)+1)}async _loadBackups(){let e=this._resolveBasePath();try{let t=await fetch(`${e}modules/backup.xql`,{method:`GET`,credentials:`same-origin`});t.ok?this.backups=await t.json():console.error(`Failed to load backups:`,t.status,t.statusText)}catch(e){console.error(`An error occurred loading backups:`,e)}}async _trigger(){let e=this._resolveBasePath(),t=this.renderRoot.querySelector(`#zipCheckbox`).checked,n=this.renderRoot.querySelector(`#incCheckbox`).checked,r=new URLSearchParams;t&&r.set(`zip`,`on`),n&&r.set(`inc`,`on`),this._loading=!0;try{let t=await fetch(`${e}modules/backup.xql?action=trigger`,{method:`POST`,credentials:`same-origin`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:r.toString()});t.ok?await t.json():console.error(`Backup trigger failed:`,t.status,t.statusText)}catch(e){console.error(`An error occurred triggering backup:`,e)}finally{this._loading=!1,this._loadBackups()}}_getHref(e){return`${this._resolveBasePath()}modules/backup.xql?action=retrieve&archive=${encodeURIComponent(e)}`}_isDownloadable(e){return e.endsWith(`.zip`)}render(){return e`
      ${this._loading?e`
        <div class="backdrop">
          <div class="spinner"></div>
        </div>
      `:``}

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
                ${this.backups.map(t=>e`
                  <tr>
                    <td>${t.name}</td>
                    <td>${t.created}</td>
                    <td>${t.incremental}</td>
                    <td>
                      ${this._isDownloadable(t.name)?e`
                        <a class="download-link" href=${this._getHref(t.name)} tabindex="-1" target="_blank">
                          <button class="download-btn" title="Download">\u2B73</button>
                        </a>
                      `:e`
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
    `}};customElements.define(`existdb-backup`,s);var c=class extends n{static properties={logout:{type:Boolean}};static styles=t`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: 'Roboto', 'Noto', sans-serif;
    }
    .header {
      background: var(--primary-color, #2196f3);
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .header h3 { margin: 0; font-weight: 400; }
    .header .icon { margin-right: 10px; }
    a.logout { color: white; font-size: 18px; font-weight: 300; margin-left: auto; text-decoration: none; }
  `;constructor(){super(),this.logout=!1}render(){return e`
      <div class="header">
        <span class="icon">&#x21bb;</span>
        <slot name="toggleIcon"></slot>
        <h3>Backup</h3>
        ${this.logout?e`<a class="logout" href="index.html?logout=true">logout</a>`:``}
      </div>
      <existdb-backup></existdb-backup>
    `}};customElements.define(`existdb-backup-app`,c);var l=class extends n{static properties={versionString:{type:String},publicUrl:{type:String}};static styles=t`
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
      padding: 0;
      color: white;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      margin: -30px -30px 0 -30px;
    }
    .header .icon { margin-right: 10px; }
    .header h3 { margin: 0; font-weight: 400; }
    .card {
      max-width: 600px;
      min-width: 320px;
      padding: 20px;
      margin: 50px auto;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card h4 {
      margin: 0 0 16px;
      color: #333;
      font-size: 18px;
    }
    .card-content { color: #333; }
    .highlight {
      color: var(--primary-color, #2196f3);
      font-size: 18px;
      padding: 10px;
    }
    .hint {
      color: #666;
      font-size: 14px;
      font-style: italic;
    }
  `;constructor(){super(),this.versionString=``,this.publicUrl=``}connectedCallback(){super.connectedCallback(),this._fetchData()}async _fetchData(){let e=this._resolveBasePath();try{let[t,n]=await Promise.all([fetch(`${e}modules/getVersion.xql`,{credentials:`same-origin`}),fetch(`${e}../packageservice/packages/public-url`,{credentials:`same-origin`})]);t.ok&&(this.versionString=await t.text()),n.ok&&(this.publicUrl=await n.text())}catch(e){console.warn(`Failed to fetch settings data:`,e)}}_resolveBasePath(){let e=window.location.pathname;return e.substring(0,e.lastIndexOf(`/`)+1)}render(){return e`
      <div class="header">
        <slot name="toggleIcon"></slot>
        <h3>Settings</h3>
      </div>

      <div class="card">
        <h4>Server Version</h4>
        <div class="card-content">
          You are running
          <div class="highlight">${this.versionString}</div>
        </div>
      </div>

      <div class="card">
        <h4>General Settings</h4>
        <div class="card-content">
          Public Repository URL
          <div class="highlight">${this.publicUrl}</div>
          <span class="hint">URL from which publicly available eXist-db apps and libraries are loaded.</span>
        </div>
      </div>
    `}};customElements.define(`existdb-settings`,l);var u=class extends n{static properties={path:{type:String},_currentPage:{type:String,state:!0},_narrow:{type:Boolean,state:!0},_drawerOpen:{type:Boolean,state:!0}};static styles=t`
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
  `;constructor(){super(),this.path=``,this._currentPage=`launcher`,this._narrow=!1,this._drawerOpen=!1}connectedCallback(){super.connectedCallback(),this._checkNarrow(),window.addEventListener(`resize`,()=>this._checkNarrow());let e=window.location.hash.replace(/^#\/?/,``);if(e)this._currentPage=e;else if(this.path&&this.path!==``){let e=this.path.replace(/^[#/]+/,``);e&&(this._currentPage=e)}(!window.location.hash||window.location.hash===`#`||window.location.hash===`#/`)&&(window.location.hash=`/${this._currentPage}`),window.addEventListener(`hashchange`,()=>this._updateRouteFromHash())}_updateRouteFromHash(){let e=window.location.hash.replace(/^#\/?/,``);e&&(this._currentPage=e)}_checkNarrow(){this._narrow=window.innerWidth<=768}_navigate(e){this._currentPage=e,window.location.hash=`/${e}`,this._narrow&&(this._drawerOpen=!1)}_toggleDrawer(){this._drawerOpen=!this._drawerOpen}_closeDrawer(){this._drawerOpen=!1}_logout(){window.location.href=`index.html?logout=true`}_renderMenuButton(){return e`
      <button class="nav-item" style="display:none" @click=${this._toggleDrawer}>
        &#9776; Menu
      </button>
    `}render(){let t=this._currentPage;return e`
      <div class="layout">
        <div class="overlay ${this._drawerOpen?`open`:``}" @click=${this._closeDrawer}></div>

        <nav class="drawer ${this._drawerOpen?`open`:``}" role="navigation" aria-label="Main navigation">
          <div class="drawer-header">
            <img class="logo" src="resources/images/existdb-web.svg" alt="eXist-db">
            <existdb-version></existdb-version>
            <div class="subitem">Dashboard</div>
          </div>

          <button class="nav-item ${t===`launcher`?`active`:``}"
                  id="launcherItem" role="menuitem"
                  @click=${()=>this._navigate(`launcher`)}>
            <img class="icon" src="resources/images/launcher.svg" alt="">
            <span>Launcher</span>
          </button>

          <button class="nav-item ${t===`packagemanager`?`active`:``}"
                  id="packageManagerItem" role="menuitem"
                  @click=${()=>this._navigate(`packagemanager`)}>
            <span class="icon">&#x2b1a;</span>
            <span>Package Manager</span>
          </button>

          <button class="nav-item ${t===`usermanager`?`active`:``}"
                  id="userManagerItem" role="menuitem"
                  @click=${()=>this._navigate(`usermanager`)}>
            <span class="icon">&#x1f465;</span>
            <span>User Manager</span>
          </button>

          <button class="nav-item ${t===`backup`?`active`:``}"
                  id="backupItem" role="menuitem"
                  @click=${()=>this._navigate(`backup`)}>
            <span class="icon">&#x21bb;</span>
            <span>Backup</span>
          </button>

          <button class="nav-item ${t===`settings`?`active`:``}"
                  id="settingsItem" role="menuitem"
                  @click=${()=>this._navigate(`settings`)}>
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
          <div class="page ${t===`launcher`?`active`:``}">
            <existdb-launcher-app
              .ignores=${[`packagemanager`,`packageservice`,`launcher`,`usermanager`,`dashboard`]}>
            </existdb-launcher-app>
          </div>

          <div class="page ${t===`packagemanager`?`active`:``}">
            ${t===`packagemanager`?e`<existdb-packagemanager></existdb-packagemanager>`:``}
          </div>

          <div class="page ${t===`usermanager`?`active`:``}">
            ${t===`usermanager`?e`<existdb-usermanager-app></existdb-usermanager-app>`:``}
          </div>

          <div class="page ${t===`backup`?`active`:``}">
            ${t===`backup`?e`<existdb-backup-app></existdb-backup-app>`:``}
          </div>

          <div class="page ${t===`settings`?`active`:``}">
            ${t===`settings`?e`<existdb-settings></existdb-settings>`:``}
          </div>
        </main>
      </div>
    `}};customElements.define(`existdb-dashboard`,u);