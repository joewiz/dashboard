var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:ee,getPrototypeOf:te}=Object,p=globalThis,m=p.trustedTypes,h=m?m.emptyScript:``,ne=p.reactiveElementPolyfillSupport,g=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},v=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol(`metadata`),p.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(g(`elementProperties`)))return;let e=te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g(`properties`))){let e=this.properties,t=[...f(e),...ee(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?_:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?_:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??v)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:`open`},b[g(`elementProperties`)]=new Map,b[g(`finalized`)]=new Map,ne?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push(`2.1.2`);var x=globalThis,S=e=>e,C=x.trustedTypes,w=C?C.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,T=`$lit$`,E=`lit$${Math.random().toFixed(9).slice(2)}$`,D=`?`+E,O=`<${D}>`,k=document,A=()=>k.createComment(``),j=e=>e===null||typeof e!=`object`&&typeof e!=`function`,M=Array.isArray,re=e=>M(e)||typeof e?.[Symbol.iterator]==`function`,N=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,I=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),R=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),H=Symbol.for(`lit-noChange`),U=Symbol.for(`lit-nothing`),W=new WeakMap,G=k.createTreeWalker(k,129);function K(e,t){if(!M(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return w===void 0?t:w.createHTML(t)}var q=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=P;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===P?c[1]===`!--`?o=F:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=L):(B.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=L):o=I:o===L?c[0]===`>`?(o=i??P,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?L:c[3]===`"`?z:R):o===z||o===R?o=L:o===F||o===I?o=P:(o=L,i=void 0);let d=o===L&&e[t+1].startsWith(`/>`)?` `:``;a+=o===P?n+O:l>=0?(r.push(s),n.slice(0,l)+T+n.slice(l)+E+d):n+E+(l===-2?t:d)}return[K(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},J=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=q(t,n);if(this.el=e.createElement(l,r),G.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=G.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(T)){let t=u[o++],n=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ae:r[1]===`?`?oe:r[1]===`@`?se:Z}),i.removeAttribute(e)}else e.startsWith(E)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(B.test(i.tagName)){let e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],A()),G.nextNode(),c.push({type:2,index:++a});i.append(e[t],A())}}}else if(i.nodeType===8)if(i.data===D)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(E,e+1))!==-1;)c.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){let n=k.createElement(`template`);return n.innerHTML=e,n}};function Y(e,t,n=e,r){if(t===H)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=j(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Y(e,i._$AS(e,t.values),i,r)),t}var ie=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??k).importNode(t,!0);G.currentNode=r;let i=G.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new X(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ce(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=G.nextNode(),a++)}return G.currentNode=k,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},X=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),j(e)?e===U||e==null||e===``?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==H&&this._(e):e._$litType$===void 0?e.nodeType===void 0?re(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==U&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=J.createElement(K(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ie(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return t===void 0&&W.set(e.strings,t=new J(e)),t}k(t){M(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(A()),this.O(A()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=U}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Y(this,e,t,0),a=!j(e)||e!==this._$AH&&e!==H,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Y(this,r[n+o],t,o),s===H&&(s=this._$AH[o]),a||=!j(s)||s!==this._$AH[o],s===U?e=U:e!==U&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ae=class extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}},oe=class extends Z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==U)}},se=class extends Z{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??U)===H)return;let n=this._$AH,r=e===U&&n!==U||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==U&&(n===U||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ce=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}},le=x.litHtmlPolyfillSupport;le?.(J,X),(x.litHtmlVersions??=[]).push(`3.3.2`);var ue=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new X(t.insertBefore(A(),e),e,void 0,n??{})}return i._$AI(e),i},Q=globalThis,$=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ue(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};$._$litElement$=!0,$.finalized=!0,Q.litElementHydrateSupport?.({LitElement:$});var de=Q.litElementPolyfillSupport;de?.({LitElement:$}),(Q.litElementVersions??=[]).push(`4.2.2`);var fe=class extends ${static properties={versionString:{type:String},_basePath:{type:String,state:!0}};static styles=o`
    :host {
      display: inline;
    }
  `;constructor(){super(),this.versionString=``,this._basePath=``}connectedCallback(){super.connectedCallback(),this._basePath=this._resolveBasePath(),this._fetchVersion()}_resolveBasePath(){let e=window.location.pathname;return e.substring(0,e.lastIndexOf(`/`)+1)}async _fetchVersion(){try{let e=await fetch(`${this._basePath}modules/getVersion.xql`,{credentials:`same-origin`});e.ok&&(this.versionString=await e.text())}catch(e){console.warn(`Failed to fetch version:`,e)}}render(){return V`${this.versionString}`}};customElements.define(`existdb-version`,fe);var pe=class extends ${static properties={loggedIn:{type:Boolean},user:{type:String},group:{type:String},groups:{type:Array},auto:{type:Boolean},loginLabel:{type:String,attribute:`login-label`},logoutLabel:{type:String,attribute:`logout-label`},loginIcon:{type:String,attribute:`login-icon`},logoutIcon:{type:String,attribute:`logout-icon`},password:{type:String},loginUrl:{type:String,attribute:`login-url`},logoutUrl:{type:String,attribute:`logout-url`},_invalid:{type:Boolean,state:!0},_dialogOpen:{type:Boolean,state:!0}};static styles=o`
    :host { display: block; }

    .dialog-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .dialog-overlay[open] { display: flex; }

    .dialog {
      background: white;
      min-width: 320px;
      max-width: 640px;
      border-radius: 4px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .dialog h2 {
      background-color: #2196f3;
      padding: 16px;
      margin: 0;
      color: #f0f0f0;
      border-radius: 4px 4px 0 0;
    }
    .dialog-body { padding: 16px; }
    .dialog-body label { display: block; margin-bottom: 8px; font-size: 14px; color: #666; }
    .dialog-body input {
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
    .dialog-body input:focus { outline: none; border-color: #2196f3; }
    .dialog-actions { padding: 8px 16px; text-align: right; }
    .dialog-actions button {
      background: #2196f3;
      color: white;
      border: none;
      padding: 8px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .dialog-actions button:hover { background: #1976d2; }

    a, a:link { text-decoration: none; color: inherit; cursor: pointer; }
    #message { color: #c62828; margin-top: 8px; }
    @media (max-width: 1024px) { .label { display: none; } }
  `;constructor(){super(),this.loggedIn=!1,this.user=``,this.group=``,this.groups=[],this.auto=!1,this.loginLabel=`Login`,this.logoutLabel=`Logout`,this.loginIcon=``,this.logoutIcon=``,this.password=``,this.loginUrl=``,this.logoutUrl=``,this._invalid=!1,this._dialogOpen=!1,this._hasFocus=!0}connectedCallback(){super.connectedCallback(),this._boundBlur=()=>{this._hasFocus=!1},this._boundFocus=()=>{this._hasFocus||(this._hasFocus=!0,this._checkLogin())},window.addEventListener(`blur`,this._boundBlur),window.addEventListener(`focus`,this._boundFocus),document.addEventListener(`checkUser`,e=>{e.detail.user===this.user&&(this.password=e.detail.password,this._confirmLogin())}),this._checkLogin()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`blur`,this._boundBlur),window.removeEventListener(`focus`,this._boundFocus)}async _checkLogin(e=null){try{let t=await(await fetch(`/exist/apps/dashboard/login`,{method:`POST`,credentials:`same-origin`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:e?new URLSearchParams(e):null})).json();this._handleResponse(t)}catch(e){console.warn(`Login check failed:`,e)}}_show(e){e.preventDefault(),this.loggedIn?this._checkLogin({logout:this.user}):this._dialogOpen=!0}_confirmLogin(){this._checkLogin({user:this.user,password:this.password,duration:`P7D`})}_handleResponse(e){let t=this.loggedIn;e.user&&this._checkGroup(e)?(this.loggedIn=!0,this.user=e.user,this.groups=e.groups||[],this._invalid=!1,!t&&this.loginUrl&&(window.location=this.loginUrl),this._dialogOpen=!1):(this.loggedIn=!1,this.password=``,this._dialogOpen?this._invalid=!0:this.auto?this._dialogOpen=!0:t&&this.logoutUrl&&(window.location=this.logoutUrl))}_checkGroup(e){return this.group?e.groups&&e.groups.indexOf(this.group)>-1:!0}_handleKeyup(e){e.keyCode===13&&this._confirmLogin()}_onUserInput(e){this.user=e.target.value}_onPasswordInput(e){this.password=e.target.value}render(){return V`
      <a href="#" id="login" @click=${this._show} title="${this.user}">
        ${this.loggedIn?V`<span class="label">${this.logoutLabel} ${this.user}</span>`:V`<span class="label">${this.loginLabel}</span>`}
      </a>

      <div class="dialog-overlay" ?open=${this._dialogOpen}>
        <div class="dialog">
          <h2>Login</h2>
          <div class="dialog-body">
            <label>User</label>
            <input type="text" .value=${this.user} @input=${this._onUserInput} @keyup=${this._handleKeyup} autofocus>
            <label>Password</label>
            <input type="password" .value=${this.password} @input=${this._onPasswordInput} @keyup=${this._handleKeyup}>
            ${this._invalid?V`
              <p id="message">Wrong password or invalid user
                ${this.group?V` (must be member of group ${this.group})`:``}
              </p>
            `:``}
          </div>
          <div class="dialog-actions">
            <button @click=${this._confirmLogin}>Login</button>
          </div>
        </div>
      </div>
    `}};customElements.define(`existdb-login`,pe);var me=class extends ${static styles=o`
    :host {
      background: var(--paper-grey-100, #f5f5f5);
      display: inline-block;
      margin: 10px;
      height: 150px;
      width: 320px;
      text-align: center;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25),
        0 0 50px rgba(0, 0, 0, 0.1) inset;
    }
    .branding {
      display: inline-block;
      padding-top: 40px;
    }
    .branding svg {
      width: 180px;
    }
  `;render(){return V`
      <div class="branding">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 568 176">
          <path fill="#737577" d="m168,68.8c0,10.3-8.35,18.6-18.6,18.6-10.3,0-18.6-8.35-18.6-18.6,0-10.3,8.35-18.6,18.6-18.6,10.3,0,18.6,8.35,18.6,18.6"/>
          <path fill="#858789" d="m195,63.3c0,5.01-4.06,9.07-9.08,9.07-5.01,0-9.07-4.06-9.07-9.07s4.06-9.07,9.07-9.07,9.08,4.06,9.08,9.07"/>
          <path fill="#858789" d="m190,96.1c0,6.4-5.19,11.6-11.6,11.6-6.4,0-11.6-5.19-11.6-11.6,0-6.4,5.19-11.6,11.6-11.6,6.4,0,11.6,5.19,11.6,11.6"/>
          <path fill="#858789" d="m125,149c0,8.07-6.54,14.6-14.6,14.6-8.07,0-14.6-6.54-14.6-14.6,0-8.07,6.54-14.6,14.6-14.6,8.07,0,14.6,6.54,14.6,14.6"/>
          <path fill="#858789" d="m100,48.6c0-4.18,3.38-7.56,7.56-7.56s7.56,3.38,7.56,7.56-3.38,7.56-7.56,7.56-7.56-3.38-7.56-7.56"/>
          <path fill="#858789" d="m123,114c0,2.78-2.26,5.04-5.04,5.04s-5.04-2.26-5.04-5.04c0-2.79,2.26-5.04,5.04-5.04s5.04,2.26,5.04,5.04"/>
          <path fill="#858789" d="m235,162c0,3.9-3.16,7.06-7.06,7.06s-7.06-3.16-7.06-7.06,3.16-7.06,7.06-7.06,7.06,3.16,7.06,7.06"/>
          <path fill="#4d4c4e" d="m25.2,87.7,52.2,0c-1.9-7.2-11.3-17.8-27.3-19.1-15.7,0.8-23.4,11.7-24.9,19.1m-20.1,8.8c0.185-24.4,19.7-44.9,45-44.9,24,0,43,17.4,44.4,41.7v0.898c0,0.361,0,1.26-0.184,1.62-0.552,4.31-4.42,7.19-9.59,7.19h-58.6c0.922,4.13,2.95,8.81,6.27,11.9,3.87,4.32,11.2,7.55,17.7,8.09,6.64,0.54,14.6-1.08,19.2-4.49,3.87-3.96,11.4-3.42,13.8-0.539,2.4,2.52,4.24,7.91,0,11.7-9.04,8.09-19.9,11.9-33,11.9-25.3-0.181-44.8-20.5-45-44.9"/>
          <path fill="#4d4c4e" d="m259,61.6,0,70.1c0,5.39-4.24,9.71-9.96,9.71-5.53,0-9.96-4.31-9.96-9.71v-70.1c0-5.75,4.42-9.88,9.96-9.88,5.72,0,9.96,4.13,9.96,9.88"/>
          <path fill="#4d4c4e" d="m266,116c3.32-4.31,9.77-4.85,13.8-1.44,4.79,3.95,13.1,8.08,20.3,7.91,4.98,0,9.59-1.62,12.5-3.42,2.58-2.16,3.32-3.96,3.32-5.39,0-0.899-0.185-1.26-0.554-1.8-0.185-0.539-0.922-1.26-2.4-2.16-2.58-1.8-8.11-3.78-14.8-5.03h-0.182c-5.72-1.08-11.2-2.52-16-4.67-4.98-2.34-9.4-5.57-12.7-10.4-2.03-3.24-3.13-7.19-3.13-11.3,0-8.27,4.79-15.3,10.9-19.8,6.45-4.31,14.2-6.65,22.7-6.65,12.7,0,21.8,5.93,27.7,9.89,4.42,2.87,5.72,8.81,2.95,13.3-2.95,4.31-9.03,5.57-13.6,2.52-5.9-3.78-11.1-6.65-17-6.65-4.61,0-8.66,1.44-11.1,3.24-2.4,1.62-2.95,3.23-2.95,4.13,0,0.719,0,0.899,0.369,1.44,0.184,0.36,0.738,1.08,2.03,1.8,2.4,1.62,7.19,3.24,13.5,4.31l0.182,0.18h0.186c6.08,1.08,11.8,2.7,17.1,5.21,4.98,2.16,9.96,5.57,13.1,10.6,2.21,3.59,3.5,7.73,3.5,11.9,0,8.81-4.98,16.2-11.6,20.8-6.64,4.49-14.9,7.19-24,7.19-14.4-0.181-25.4-6.65-32.8-12.4-4.06-3.24-4.61-9.35-1.29-13.3"/>
          <path fill="#4d4c4e" d="m385,61.4c0,5.39-4.79,9.88-10.3,9.88h-4.61v50.1c5.72,0,10.1,4.5,10.1,10.1,0,5.57-4.43,9.88-10.1,9.88-11.2,0-20.5-8.99-20.5-20v-50.1h-5.35c-5.72,0-10.1-4.49-10.1-9.88,0-5.57,4.42-9.88,10.1-9.88h5.35v-26.1c0-5.57,4.61-9.88,10.3-9.88,5.72,0,10.1,4.31,10.1,9.88v26.1h4.61c5.53,0,10.3,4.31,10.3,9.88"/>
          <path fill="#4d4c4e" d="m175,119c0,6.12-4.96,11.1-11.1,11.1-6.12,0-11.1-4.96-11.1-11.1,0-6.12,4.96-11.1,11.1-11.1,6.12,0,11.1,4.97,11.1,11.1"/>
          <path fill="#4d4c4e" d="m205,141c0,7.24-5.87,13.1-13.1,13.1-7.24,0-13.1-5.87-13.1-13.1,0-7.24,5.87-13.1,13.1-13.1,7.24,0,13.1,5.87,13.1,13.1"/>
          <path fill="#4d4c4e" d="m120,28c0,4.45-3.61,8.06-8.07,8.06-4.45,0-8.06-3.61-8.06-8.06s3.61-8.06,8.06-8.06c4.46,0,8.07,3.61,8.07,8.06"/>
          <path fill="#4d4c4e" d="m96.8,163c0,3.9-3.16,7.06-7.06,7.06s-7.06-3.16-7.06-7.06,3.16-7.06,7.06-7.06,7.06,3.16,7.06,7.06"/>
          <path fill="#4d4c4e" d="m187,42.6c0,4.18-3.39,7.56-7.56,7.56-4.18,0-7.56-3.38-7.56-7.56s3.38-7.56,7.56-7.56,7.56,3.38,7.56,7.56"/>
          <path fill="#08C" d="m139,42.6c0,5.84-4.74,10.6-10.6,10.6-5.84,0-10.6-4.74-10.6-10.6,0-5.85,4.74-10.6,10.6-10.6,5.85,0,10.6,4.74,10.6,10.6"/>
          <path fill="#08C" d="m126,65.3c0,3.9-3.16,7.06-7.06,7.06s-7.06-3.16-7.06-7.06,3.16-7.06,7.06-7.06,7.06,3.16,7.06,7.06"/>
          <path fill="#08C" d="m422,71.2c-6.64,0-12.7,2.7-17.3,7.37-4.61,4.49-7.38,11-7.38,18.2,0,6.83,2.76,13.3,7.38,17.8,4.61,4.67,10.7,7.37,17.3,7.37,6.82,0,12.7-2.7,17.3-7.37,4.61-4.49,7.38-11,7.38-17.8,0-7.19-2.77-13.7-7.38-18.2-4.61-4.67-10.5-7.37-17.3-7.37m44.8,60.6c0,5.21-4.42,9.71-9.96,9.71-4.98,0-8.85-3.42-9.77-7.73-7.01,4.67-15.9,7.73-25.1,7.73-24.9,0-44.8-20.5-44.8-44.8,0-24.6,19.9-45.1,44.8-45.1,9.04,0,17.9,2.88,24.7,7.55v-33.8c0-5.21,4.42-9.71,10.1-9.71,5.53,0,9.96,4.49,9.96,9.71v71.2,0.18,35z"/>
          <path fill="#08C" d="m493,96.7c0,6.83,2.77,13.3,7.38,17.8,4.61,4.67,10.5,7.37,17.3,7.37,6.64,0,12.7-2.7,17.3-7.37,4.61-4.49,7.38-11,7.38-17.8,0-7.19-2.76-13.7-7.38-18.2-4.61-4.67-10.7-7.37-17.3-7.37-6.82,0-12.7,2.7-17.3,7.37-4.61,4.49-7.38,11-7.38,18.2m-20.1,0,0-0.181,0-71.2c0-5.21,4.43-9.7,9.96-9.7,5.72,0,10.1,4.49,10.1,9.7v33.8c6.82-4.67,15.7-7.55,24.7-7.55,24.9,0,44.8,20.5,44.8,45.1,0,24.3-19.9,44.8-44.8,44.8-9.22,0-18.1-3.06-25.1-7.73-0.921,4.31-4.79,7.73-9.77,7.73-5.53,0-9.96-4.5-9.96-9.71v-35z"/>
          <path fill="#08C" d="m235,23.5c0,4.18-3.38,7.56-7.56,7.56s-7.56-3.38-7.56-7.56,3.38-7.56,7.56-7.56,7.56,3.38,7.56,7.56"/>
          <path fill="#08C" d="m219,41.1c0,7.8-6.32,14.1-14.1,14.1-7.8,0-14.1-6.32-14.1-14.1,0-7.79,6.32-14.1,14.1-14.1,7.79,0,14.1,6.32,14.1,14.1"/>
          <path fill="#08C" d="m148,102c0,5.57-4.51,10.1-10.1,10.1-5.57,0-10.1-4.51-10.1-10.1,0-5.57,4.51-10.1,10.1-10.1,5.57,0,10.1,4.51,10.1,10.1"/>
          <path fill="#08C" d="m139,128c0,5.01-4.06,9.07-9.07,9.07s-9.07-4.06-9.07-9.07,4.06-9.07,9.07-9.07,9.07,4.06,9.07,9.07"/>
          <path fill="#08C" d="m213,116c0,5.01-4.06,9.07-9.07,9.07s-9.07-4.06-9.07-9.07,4.06-9.07,9.07-9.07,9.07,4.06,9.07,9.07"/>
          <path fill="#08C" d="m227,141c0,4.45-3.61,8.06-8.06,8.06s-8.06-3.61-8.06-8.06,3.61-8.06,8.06-8.06,8.06,3.61,8.06,8.06"/>
          <path fill="#08C" d="m98.6,24.5c0,2.78-2.26,5.04-5.04,5.04s-5.04-2.26-5.04-5.04,2.26-5.04,5.04-5.04,5.04,2.26,5.04,5.04"/>
          <path fill="#08C" d="m96.8,10.9c0,2.78-2.26,5.04-5.04,5.04s-5.04-2.26-5.04-5.04,2.26-5.04,5.04-5.04,5.04,2.26,5.04,5.04"/>
          <path fill="#08C" d="m113,124c0,3.34-2.71,6.05-6.05,6.05s-6.05-2.71-6.05-6.05,2.71-6.05,6.05-6.05,6.05,2.71,6.05,6.05"/>
        </svg>
        <div class="version"><existdb-version></existdb-version></div>
      </div>
    `}};customElements.define(`existdb-branding`,me);var he=class extends ${static properties={ignores:{type:Array},path:{type:String},basePath:{type:String}};static styles=o`
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
  `;constructor(){super(),this.ignores=[],this.path=void 0,this.basePath=``}connectedCallback(){if(super.connectedCallback(),this.path==null)this.basePath=`..`;else{let e=window.location.pathname;this.basePath=e.substring(0,e.indexOf(this.path))}this._loadApplications()}async _loadApplications(){try{let e=await fetch(`${this.basePath}/packageservice/packages/apps`,{method:`GET`,credentials:`same-origin`});if(e.ok){let t=await e.text();this._displayApplications(t)}}catch(e){console.warn(`Failed to load applications:`,e)}}_displayApplications(e){let t=this.shadowRoot.querySelector(`#apps`);if(t.innerHTML=e,!this._isEmbedded()){let e=document.createElement(`existdb-branding`),n=t.querySelector(`repo-packages`);n&&n.insertBefore(e,n.querySelector(`repo-app`))}let n=this.shadowRoot.querySelectorAll(`repo-icon[src]`);for(let e of n)e.style.backgroundImage=`url(${e.getAttribute(`src`)})`;let r=this.shadowRoot.querySelectorAll(`repo-app`);for(let e of r)e.addEventListener(`click`,()=>{let t=e.getAttribute(`path`);t&&(window.location.href=t)});let i=this.shadowRoot.querySelectorAll(`repo-app`);for(let e=0;e<i.length;e++){let t=i[e].getAttribute(`abbrev`);this.ignores&&this.ignores.indexOf(t)!==-1&&(i[e].style.display=`none`)}}_isEmbedded(){return document.querySelector(`existdb-dashboard`)!=null}render(){return V`
      <div id="apps" class="apps"></div>
    `}};customElements.define(`existdb-launcher`,he);var ge=class extends ${static properties={ignores:{type:Array},path:{type:String}};static styles=o`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 30px;
      font-family: 'Roboto', 'Noto', sans-serif;
      box-sizing: border-box;
      background: ghostwhite;
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
    }
    .header h3 {
      margin: 0;
      font-weight: 400;
      flex: 1;
    }
    .header ::slotted(existdb-login) {
      color: white;
      margin-right: 10px;
    }
    @media only screen and (max-width: 768px) {
      .header h3 {
        font-size: 18px;
      }
    }
  `;constructor(){super(),this.ignores=[],this.path=void 0}render(){return V`
      <div class="header">
        <slot name="toggleIcon"></slot>
        <h3>Launcher</h3>
        <slot></slot>
      </div>
      <existdb-launcher .ignores=${this.ignores} .path=${this.path}></existdb-launcher>
    `}};customElements.define(`existdb-launcher-app`,ge);export{V as n,o as r,$ as t};