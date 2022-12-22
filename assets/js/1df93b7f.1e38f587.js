"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[237],{9766:(e,t,n)=>{n.d(t,{Z:()=>x});var r=n(9231),o=n(6372),i=n.n(o),a=n(5869),s=n(58),l=n(5036),c=n(3421);function d(e){const t=(0,r.useRef)();return(0,a.Y)(t,e.onChange,{indentation:2}),r.createElement(s.ZP,{Prism:l.Z,code:e.code,language:"jsx",theme:{...c.Z,plain:{...c.Z.plain,margin:0,backgroundColor:"transparent",borderRadius:0,padding:"1rem"}}},(e=>{let{className:n,tokens:o,getTokenProps:i,style:a}=e;return r.createElement("pre",{className:n,style:a,ref:t,spellCheck:!1},o.map(((e,t)=>r.createElement(r.Fragment,{key:t},e.filter((e=>!e.empty)).map(((e,t)=>r.createElement("span",i({token:e,key:t})))),"\n"))))}))}var u=n(5151),h=n(1966),m=n(4229),p=n.n(m),f=n(9803),y=n.n(f);const g="colPreview_kS6N",v="containerEditor_HpzZ",w="containerPreview_c54M",b="titleEditor_queV",E="titlePreview_CUDP",T="error_KZpp",_="previewError_Xbpz";function x(e){const t=(0,r.useRef)(),[n,o]=(0,r.useState)(function(e){return e.startsWith("// @ts-nocheck")&&(e=e.substring(e.indexOf("\n")+1)),p().format(e,{parser:"typescript",plugins:[y()]}).replace(/[\r\n]+$/,"")}(e.code)),[a,s]=(0,r.useState)(null),l=(0,r.useCallback)((e=>{o(e.slice(0,-1))}),[o]);return(0,r.useEffect)((()=>{s(null);try{const e=function(e){return(0,h.vs)(e,{transforms:["jsx","imports"]}).code}(n);!function(e,t){new Function("require","canvasElement","React",e)((e=>{if("react-luma"===e)return u;throw new Error(`import "${e}" not available.`)}),t,r)}(e,t.current)}catch(a){s(a.toString())}}),[n]),r.createElement("div",{className:"card"},r.createElement("div",{className:"card__body padding--none"},r.createElement("div",{className:"row row--no-gutters"},r.createElement("div",{className:"col"},r.createElement("div",{className:b},"Live editor"),r.createElement("div",{className:v},r.createElement(d,{code:n,onChange:l}))),r.createElement("div",{className:i()("col",g)},r.createElement("div",{className:i()(E,!!a&&T)},a?"Compilation error":"Result"),r.createElement("div",{className:w},r.createElement("canvas",{ref:t}),!!a&&r.createElement("div",{className:_},a))))))}},4778:(e,t,n)=>{n.r(t),n.d(t,{default:()=>w});var r=n(9231),o=n(6352),i=n(9058),a=n(9841),s=n(6856);const l="root__cUG";function c(){return r.createElement("h1",{className:l,"data-heading":"Luma"},"Luma")}const d="container_ZVpA",u="buttons_Te85";function h(){const{siteConfig:e}=(0,i.Z)();return r.createElement("header",{className:"hero hero--primary margin-bottom--lg"},r.createElement("div",{className:(0,a.Z)("container",d)},r.createElement(c,null),r.createElement("p",{className:"hero__subtitle"},e.tagline),r.createElement("div",{className:u},r.createElement(s.Z,{className:"button button--secondary button--lg",to:"/docs/getting-started"},"Getting Started"))))}var m=n(8041),p=n(4852),f=n(3093);function y(e){return r.createElement(f.Z,null,(()=>{const t=n(9766).Z;return r.createElement(t,{code:e.code})}))}const g={toc:[]};function v(e){let{components:t,...n}=e;return(0,p.kt)("wrapper",(0,m.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,p.kt)("p",null,"Build your scene declaratively with re-usable, self-contained components and render\nthem in a WebGL canvas. React Luma started out as an optimized renderer for TV's, set-top boxes and other low memory devices."),(0,p.kt)("h1",{id:"installation"},"Installation"),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-js"},"npm install react-luma\n")),(0,p.kt)("p",null,"React Luma's API is very familiar to anyone who has worked with\nReact DOM. The main difference is that you can no longer rely on DOM\nelements such as a div or span, but you'd be building your UI\ncomposition with the built-in base components."),(0,p.kt)("h1",{id:"playground"},"Playground"),(0,p.kt)("p",null,"Feel free to make changes to the code below and the compiler will\nrender an immediate result."),(0,p.kt)(y,{code:'// @ts-nocheck\nimport { render, View, Text, Sprite, TEXTURE_WHITE } from "react-luma";\n\nfunction App() {\n  return (\n    <View style={{ padding: 12 }}>\n      <Text text="Hello world!" />\n      <Sprite\n        style={{ width: 100, height: 100, marginTop: 12 }}\n        texture={TEXTURE_WHITE}\n        tint="#3f37c9"\n      />\n    </View>\n  );\n}\n\nrender(<App />, canvasElement, { width: 420 });\n',mdxType:"Playground"}))}function w(){return r.createElement(o.Z,{title:"Welcome"},r.createElement(h,null),r.createElement("main",{className:"container padding-bottom--lg"},r.createElement(v,null)))}v.isMDXComponent=!0},5714:(e,t,n)=>{function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.defineProperty,a=Object.defineProperties,s=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,u=(e,t,n)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,h=(e,t)=>{for(var n in t||(t={}))c.call(t,n)&&u(e,n,t[n]);if(l)for(var n of l(t))d.call(t,n)&&u(e,n,t[n]);return e},m=n(3384),p=r(m),f=r(m),y=r(m),g=r(m),v=r(m),w=r(m),b=o(n(2e3)),E=class extends g.Transform{updateTransform(e){this._localID!==this._currentLocalID&&(this.localTransform.a=this._cx*this.scale.x,this.localTransform.b=this._sx*this.scale.x,this.localTransform.c=this._cy*this.scale.y,this.localTransform.d=this._sy*this.scale.y,this.localTransform.tx=this.position.x-(this.pivot.x*this.localTransform.a+this.pivot.y*this.localTransform.c),this.localTransform.ty=this.position.y-(this.pivot.x*this.localTransform.b+this.pivot.y*this.localTransform.d),this._currentLocalID=this._localID,this._parentID=-1),this._parentID!==e._worldID&&(this.worldTransform.a=this.localTransform.a,this.worldTransform.b=this.localTransform.b,this.worldTransform.c=this.localTransform.c,this.worldTransform.d=this.localTransform.d,this.worldTransform.tx=this.localTransform.tx+e.worldTransform.tx,this.worldTransform.ty=this.localTransform.ty+e.worldTransform.ty,this._parentID=e._worldID,this._worldID+=1)}};var T=n(7372),_=class extends T.CustomError{constructor(e){super("ReactLumaElement does not exist on this object."),this.obj=e}},x="__lumaElement",C=Symbol("LumaElementInitMethod");function O(e){const t=e[x];if(t&&t instanceof I)return t;throw new _(e)}function N(e,t){return e.type===t}var I=class{constructor(e){this.yogaNode=b.default.Node.create(),this._x=0,this._y=0,this._transformX=0,this._transformY=0,this.rootRecalcLayout=!1,this.type=e}[C](){var e;(e=this.displayObject).transform instanceof E||(e.transform=new E),this.displayObject[x]=this}appendChild(e){this.displayObject.addChild(e.displayObject);const t=this.displayObject.getChildIndex(e.displayObject);this.yogaNode.insertChild(e.yogaNode,t)}insertBefore(e,t){const n=this.displayObject.getChildIndex(t.displayObject);this.displayObject.addChildAt(e.displayObject,n),this.yogaNode.insertChild(e.yogaNode,n)}removeChild(e){this.displayObject.removeChild(e.displayObject),this.yogaNode.removeChild(e.yogaNode)}getChildren(){return this.displayObject.children.map(O)}getGlobalPosition(){return this.displayObject.getGlobalPosition()}set x(e){this._x=e,this.displayObject.x=this._x+this._transformX}get x(){return this._x}set y(e){this._y=e,this.displayObject.y=this._y+this._transformY}get y(){return this._y}set width(e){this.displayObject.width=e}set height(e){this.displayObject.height=e}get width(){return this.displayObject.width}get height(){return this.displayObject.height}set transformX(e){this._transformX=e,this.x=this.x}set transformY(e){this._transformY=e,this.y=this.y}unstable_getDisplayObject(){return this.displayObject}},j=class extends I{constructor(){super(...arguments),this.displayObject=new y.Container}},P=class extends I{constructor(){super(...arguments),this.displayObject=new y.Text}set text(e){this.displayObject.text=e}set fill(e){this.displayObject.style.fill=y.utils.string2hex(e)}},R=class extends I{constructor(){super(...arguments),this.displayObject=new y.Sprite}set texture(e){this.displayObject.texture=e}set tint(e){this.displayObject.tint=y.utils.string2hex(e)}};function D(e){let t=null;if("Sprite"===e&&(t=new R(e)),"Text"===e&&(t=new P(e)),"View"===e&&(t=new j(e)),!t)throw new Error("Failed");return t[C](),t}var L=r(n(8634));function k(e,t){return{left:e[`${t}Left`]||e[t]||0,right:e[`${t}Right`]||e[t]||0,top:e[`${t}Top`]||e[t]||0,bottom:e[`${t}Bottom`]||e[t]||0}}function S(e){const t=e.yogaNode.getComputedLayout();e.x=t.left,e.y=t.top,"Sprite"==e.type&&(e.width=t.width,e.height=t.height),e.getChildren().forEach(S)}function M(e,t){e.yogaNode.setDisplay(b.default.DISPLAY_FLEX),"row"===t.flexDirection?e.yogaNode.setFlexDirection(b.default.FLEX_DIRECTION_ROW):"column"===t.flexDirection&&e.yogaNode.setFlexDirection(b.default.FLEX_DIRECTION_COLUMN),"center"===t.alignItems&&e.yogaNode.setAlignItems(b.default.ALIGN_CENTER),"center"===t.justifyContent&&e.yogaNode.setJustifyContent(b.default.JUSTIFY_CENTER),void 0!==t.width&&e.yogaNode.setWidth(t.width),void 0!==t.height&&e.yogaNode.setHeight(t.height);const n=k(t,"padding");void 0!==n.left&&e.yogaNode.setPadding(b.default.EDGE_LEFT,n.left),void 0!==n.right&&e.yogaNode.setPadding(b.default.EDGE_RIGHT,n.right),void 0!==n.top&&e.yogaNode.setPadding(b.default.EDGE_TOP,n.top),void 0!==n.bottom&&e.yogaNode.setPadding(b.default.EDGE_BOTTOM,n.bottom);const r=k(t,"margin");r.left&&e.yogaNode.setMargin(b.default.EDGE_LEFT,r.left),r.right&&e.yogaNode.setMargin(b.default.EDGE_RIGHT,r.right),r.top&&e.yogaNode.setMargin(b.default.EDGE_TOP,r.top),r.bottom&&e.yogaNode.setMargin(b.default.EDGE_BOTTOM,r.bottom)}function A(e,t){void 0!==t.x&&(e.transformX=t.x),void 0!==t.y&&(e.transformY=t.y)}function F(e,t,n){if(N(e,"Text")&&("text"===t&&void 0!==n&&(L.isString(n,`Text ${t}=${n} is not a string.`),e.text=n,e.yogaNode.setWidth(e.width),e.yogaNode.setHeight(e.height)),"fill"===t&&void 0!==n&&(L.isString(n,`Text ${t}=${n} is not a string.`),e.fill=n)),N(e,"Sprite")){if("texture"===t&&void 0!==n){L.isInstanceOf(n,v.Texture,`Sprite ${t} is not a texture.`),e.texture=n;const r=function(e){e.isDirty()&&e.calculateLayout();return e.getComputedLayout()}(e.yogaNode);e.width=r.width,e.height=r.height}"tint"===t&&void 0!==n&&(L.isString(n,`Sprite ${t}=${n} is not a string.`),e.tint=n)}}var G=n(79),X=o(G),H=o(n(9131)),Z=n(2673),U={},V="style",$="children",W="transform";function B(e,t){for(const[n,r]of Object.entries(t))"children"!==n&&("style"===n?M(e,r):"transform"===n?A(e,r):F(e,n,r))}var Y=H.default.call(void 0,{isPrimaryRenderer:!0,supportsMutation:!0,supportsPersistence:!1,createInstance(e,t,n){t.hasOwnProperty(V)&&(n.rootRecalcLayout=!0);const r=D(e);return B(r,t),r},createTextInstance(){throw new Error("createTextInstance is unsupported.")},appendInitialChild(e,t){e.appendChild(t)},appendChild(e,t){e.appendChild(t)},removeChild(e,t){e.removeChild(t)},finalizeInitialChildren:()=>!1,appendChildToContainer(e,t){e.appendChild(t)},insertInContainerBefore(e,t,n){e.insertBefore(t,n)},removeChildFromContainer(e,t){e.removeChild(t)},clearContainer:()=>!1,prepareUpdate(e,t,n,r,o){const i=z(n,r);return i&&i.hasOwnProperty(V)&&(o.rootRecalcLayout=!0),i},commitUpdate(e,t){B(e,t)},shouldSetTextContent:()=>!1,getRootHostContext:()=>U,getChildHostContext:()=>U,getPublicInstance:e=>e,prepareForCommit:()=>null,resetAfterCommit(e){e.rootRecalcLayout&&(e.rootRecalcLayout=!1,function(e){if(!J.current)throw new Error("Cannot calculate layout, ReactLumaCurrentApp is undefined");const{screen:t}=J.current;e.yogaNode.calculateLayout(t.width,t.height),S(e)}(e))},preparePortalMount:()=>null,scheduleTimeout:setTimeout,cancelTimeout:clearTimeout,noTimeout:-1,getCurrentEventPriority:()=>Z.DefaultEventPriority,getInstanceFromNode:e=>e,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,detachDeletedInstance(){},supportsHydration:!1});function z(e,t){let n=null;for(let r in e)!t.hasOwnProperty(r)&&e.hasOwnProperty(r)&&null!=e[r]&&r!==$&&(r!==V&&r!==W||z(e[r],t[r]))&&(n||(n={}),n[r]=null);for(let r in t){const o=t[r],i=null!=e?e[r]:void 0;!t.hasOwnProperty(r)||o===i||null==o&&null==i||r!==$&&(r!==V&&r!==W||z(e[r],t[r]))&&(n||(n={}),n[r]=o)}return n}function q(){}Y.injectIntoDevTools({bundleType:1,version:X.default.version,rendererPackageName:"react-luma"});var J={current:null};function K(e,t){Y.updateContainer(e,t,null,q)}var Q=new Map;var ee=n(5250),te=G.forwardRef.call(void 0,((e,t)=>{const[n,r]=G.useState.call(void 0);return G.useEffect.call(void 0,(()=>{w.Texture.fromURL(e.src).then(r)}),[e.src]),ee.jsx.call(void 0,ne,(o=h({},e),a(o,s({texture:n,ref:t}))));var o}));var ne="Sprite",re=p.Texture.WHITE;t.render=function(e,t,n){let r=Q.get(t);r||(r=function(e,t){const n=h({width:1080},t),r=n.width*(9/16),o=new f.Application({width:n.width,height:r,resolution:window.devicePixelRatio,view:e,backgroundAlpha:0});J.current=o;const i=D("View");return M(i,{width:"100%",height:"100%"}),o.stage.addChild(i.unstable_getDisplayObject()),Y.createContainer(i,0,null,!1,null,"ReactLuma",q,null)}(t,n),Q.set(t,r)),K(e,r)},t.unmountComponentAtNode=function(e){if(Q.has(e)){const t=Q.get(e);Q.delete(t),K(null,t)}},t.Image_default=te,t.useRefValue=function(e){const t=G.useRef.call(void 0);return t.current||(t.current=e()),t.current},t.useMultiRef=function(){const e=G.useRef.call(void 0,{}),t=G.useCallback.call(void 0,(t=>n=>{e.current[t]=n}),[]);return[e.current,t]},t.View="View",t.Text="Text",t.Sprite=ne,t.TEXTURE_WHITE=re},5151:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(5714);t.Image=r.Image_default,t.Sprite=r.Sprite,t.TEXTURE_WHITE=r.TEXTURE_WHITE,t.Text=r.Text,t.View=r.View,t.render=r.render,t.unmountComponentAtNode=r.unmountComponentAtNode,t.useMultiRef=r.useMultiRef}}]);