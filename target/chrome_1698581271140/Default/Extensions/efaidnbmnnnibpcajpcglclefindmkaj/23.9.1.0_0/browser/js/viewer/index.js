/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{dcLocalStorage as e,dcSessionStorage as t}from"../../../common/local-storage.js";import{dcTabStorage as n}from"../tab-storage.js";import{util as a}from"../content-util.js";import{signInUtil as r}from"./signInUtils.js";import{privateApi as i}from"../content-privateApi.js";import{OptionPageActions as s}from"../../../common/constant.js";import{indexedDBScript as o}from"../../../common/indexDB.js";import{loggingApi as c}from"../../../common/loggingApi.js";import l from"./ResponseHeaders.js";import d from"./BookmarkUtils.js";await e.init(),await t.init();const m=e.getItem("appLocale");let u=!1;!function(){let f,p,g,h,w,I,b,y,_,v,S,L,E,P,D,R,U,C,T,B;const x=chrome.runtime.getURL("viewer.html"),k=chrome.runtime.getURL("signInHandler.html"),F="file:",V=["https:","http:",F],A=e=>{if(!e)return!1;try{const t=new URL(e),n=t.protocol;let a=-1!==V.indexOf(n);return a=n===F?t.pathname.toLowerCase().endsWith(".pdf"):a,a}catch(e){return!1}};function M(e){const t=n.getItem("search");return new URLSearchParams(t).get(e)}function O(e,t){return P?(D=D||1,e.tabId=D,e.mimeHandled=!0,chrome.runtime.sendMessage(e,t)):chrome.runtime.sendMessage(e,t)}function N(e,t){return new URLSearchParams(e).get(t)||""}function H(){if(h=N(document.location.search,"pdfurl"),!A(h))return void(w=!1);!function(){const e=new URLSearchParams(document.location.search),n=t.getItem("rtParams");if(n){const a=n.split(",").map((t=>e.has(t)?`&${t}=${e.get(t)}`:null)).join("")||"";t.setItem("payPalUrl",a),t.removeItem("rtParams")}}();const e=n.getItem("search");(!e||N(e,"pdfurl")!==h||e.length<document.location.search)&&n.setItem("search",document.location.search),g=N(document.location.search,"pdffilename")||N(e,"pdffilename")||ie(h),document.title=g;const a="/"+h+location.hash;history.replaceState({},g,a)}function z(t=!1){if(P)try{t||O({main_op:"viewer-type",viewer:"mime-native"}),setTimeout((()=>{i.reloadWithNativeViewer({contentLength:parseInt(f)||0})}),100)}catch(e){W("DCBrowserExt:Viewer:FallbackToNative:Failed")}else try{setTimeout((()=>{chrome.tabs.getCurrent((function(t){e.setItem(`reloadurl-${t.id}`,h),window.location.href=h}))}),500)}catch(e){W("DCBrowserExt:Viewer:FallbackToNative:Failed")}}const $=t=>{try{const n=new URL(e.getItem("cdnUrl")),a=[/^https:\/\/([a-zA-Z\d-]+\.){0,}(adobe|acrobat)\.com(:[0-9]*)?$/];return t===n.origin&&!!a.find((e=>e.test(t)))}catch(e){return!1}};function W(e){const t={main_op:"analytics"};t.analytics=[[e]],O(t)}function q(){let e,t=x;return P?(e="?mimePdfUrl="+encodeURIComponent(h),t=k):(e=n.getItem("search"),e||(e="?pdfurl="+h)),new URL(t+e)}const j=["AdobeID","openid","DCAPI","sign_user_read","sign_user_write","sign_user_login","sign_library_read","sign_library_write","agreement_send","agreement_read","agreement_write","ab.manage","additional_info.account_type","sao.ACOM_ESIGN_TRIAL","widget_read","widget_write","workflow_read","workflow_write"];function G(t={}){const r=e.getItem("imsURL"),i=e.getItem("viewerImsClientId"),s=e.getItem("imsContextId"),o=new URL(r+"/ims/authorize/v1?"),c=q(),l=a.uuid(),d={csrf:l};t.sign_up?(o.searchParams.append("idp_flow","create_account"),c.hash=c.hash+"signUp=true"):c.hash=c.hash+"signIn=true",n.setItem("csrf",l),o.searchParams.append("response_type","token"),o.searchParams.append("client_id",i),t.touchpoint&&(c.hash=c.hash+`;touchp=${t.touchpoint};`),o.searchParams.append("redirect_uri",c),o.searchParams.append("scope",j.join(",")),o.searchParams.append("dctx_id",s),o.searchParams.append("locale",m||e.getItem("locale")),o.searchParams.append("state",JSON.stringify(d)),chrome.tabs.update({url:o.href,active:!0})}function Y(){let e;e=P?q().href:window.location.href,r.sign_out(e)}function J(e){let t=new URL(k);return t.searchParams.append("socialSignIn","true"),t.searchParams.append("mimePdfUrl",encodeURIComponent(h)),n.setItem("idp_token",e),t.href}function K(e){P?chrome.tabs.update({url:J(e),active:!0}):r.socialSignIn(e,q())}function X(t="google"){const r=e.getItem("viewerImsClientIdSocial"),i=e.getItem("imsURL"),s=a.uuid(),o=q();o.hash=o.hash+"signIn=true";const c=new URL(i+"/ims/authorize/v1"),l={ac:a.isEdge()?"adobe.com_acrobatextension_edge_login":"adobe.com_acrobatextension_chrome_login",csrf:s};n.setItem("csrf",s),c.searchParams.append("response_type","token"),c.searchParams.append("idp_flow","social.deep_link.web"),c.searchParams.append("client_id",r),c.searchParams.append("provider_id",t),c.searchParams.append("redirect_uri",o),c.searchParams.append("scope",j.join(",")),c.searchParams.append("locale",m||e.getItem("locale")),c.searchParams.append("state",JSON.stringify(l)),c.searchParams.append("xApiClientId",r),c.searchParams.append("xApiClientLocation ",t),chrome.tabs.update({url:c.href,active:!0})}const Z={isSharePointURL:!1,isSharePointFeatureEnabled:!1,isFrictionlessEnabled:!0,featureFlags:[],isFillAndSignRegisteryEnabled:!1};class Q{constructor(e){this.iframeElement=void 0,this.parentDiv=e}createIframe=t=>{const n=window.document,a=(e.getItem("cdnUrl"),n.createElement("iframe"));a.setAttribute("src",t),a.setAttribute("id","dc-view-frame"),a.setAttribute("allowfullscreen","allowfullscreen"),a.setAttribute("allow","clipboard-read; clipboard-write;"),a.style.width="100vw",a.style.height="100vh",a.style.border="none",a.style.overflow="hidden",this.parentDiv.appendChild(a),c.info({message:"Viewer Iframe created"}),this.iframeElement=n.getElementById("dc-view-frame")};_sendMessage=(e,t)=>{this.iframeElement&&$(t)&&function(e){let t=Date.now();return new Promise((function n(a,r){I&&(w||P)?a(w||P):e&&Date.now()-t>=e?r(new Error("timeout")):setTimeout(n.bind(this,a,r),30)}))}(1e6).then((n=>n&&this.iframeElement.contentWindow.postMessage(e,t)))};sendStartupConfigs=(e,n)=>{this._sendMessage({type:"nativeConfigs",nativeConfigs:Z,extUrl:encodeURI(e),returnParamsUrl:t.getItem("payPalUrl"),isInstallTypeUpsell:u},n)};sendFileMetaData=(e,t,n,a,r,i,s,o)=>{this._sendMessage({fileUrl:r,fileName:i,fileSize:n,acceptRanges:a,handShakeTime:t,type:e,isFrictionlessEnabled:Z.isFrictionlessEnabled,isReloadOrBackForward:o,isMimeHandled:P},s)};sendSubmitFormResponse=(e,t)=>{this._sendMessage({type:"submitForm",response:e},t)};sendRecentUrl=async(e,t,n,a=!1)=>{await chrome.extension.isAllowedFileSchemeAccess()||(t=t?.filter((e=>!e.url.startsWith(`chrome-extension://${chrome.runtime.id}/viewer.html?pdfurl=file`)))),this._sendMessage({type:"RecentUrls",permission:e,showOverlay:a,recentUrls:t},n)};sendProgress=(e,t,n,a)=>{this._sendMessage({total:t,loaded:n,type:e},a)};sendInitialBuffer=(e,t,n,a,r)=>{this._sendMessage({type:e,downLoadstartTime:t,downLoadEndTime:n,buffer:a},r)};sendBufferRanges=(e,t,n,a)=>{this._sendMessage({type:e,range:t,buffer:n},a)};preview=(e,t,n,a,r,i,s)=>{this._sendMessage({fileSize:n,type:e,fileBuffer:t,fileName:a,downLoadstartTime:r,downLoadEndTime:i},s)};openInAcrobatResponse=(e,t,n)=>{this._sendMessage({type:e,res:t},n)};postLog=(e,t,n,a,r)=>{this._sendMessage({type:e,reqId:t,message:n,error:a},r)}}function ee(t,n){try{S=void 0!==S?S:"false"!==e.getItem("logAnalytics")&&"false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),S&&(_&&p?_.postLog("log",v,t,n,p.origin):setTimeout((()=>{_&&p&&_.postLog("log",v,t,n,p.origin)}),500))}catch(e){}}function te(){let e;return e=P?h:window.location.href,e}function ne(t,n,a,r,i){i&&t.forEach((e=>{a.has(e)&&n.searchParams.append(e,a.get(e))})),r&&t.forEach((t=>{""!==e.getItem(t)&&n.searchParams.append(t,e.getItem(t))}))}const ae=(n,a,r="localStorage")=>{if(a){const i="localStorage"===r?e.getItem(n):t.getItem(n);let s;i&&i.tabsInfo?(s=i.tabsInfo,s.includes(a)||s.push(a)):s=[a],"localStorage"===r?e.setItem(n,{tabsInfo:s}):t.setItem(n,{tabsInfo:s})}},re=()=>{try{!function(){const e=te();if(e.indexOf("access_token")>-1&&n.getItem("signInSource")){const t=n.getItem("csrf"),a=r.parseCSRF(new URL(e));n.removeItem("csrf"),(!t||!a||a!==t)&&(W("DCBrowserExt:Viewer:User:Error:NonMatchingCsrfToken:FailedToLogin"),Y())}}(),function(){try{let e=te();e&&e.indexOf("#")>-1&&(r.signInAnalyticsLogging(e),r.checkSignInFromEditVerbPaywall(e),e=e.split("#")[0],P?h=e:window.location.href=e)}catch(e){}}();const a=window.document.getElementById("Adobe-dc-view");P||(f=M("clen")||-1),_=new Q(a);const s=(()=>{try{const a=e.getItem("cdnUrl"),r=new URL(a);if(!$(r.origin))return ee("Invalid CDN URL detected","Invalid Origin"),void z();p||(p=r);let i=e.getItem("viewer-locale");i||(i=e.getItem("locale"));const s="false"!==e.getItem("logAnalytics"),o="false"!==e.getItem("ANALYTICS_OPT_IN_ADMIN"),c=s&&o?"true":o?"optinOff":"gpoOff",l="true"===e.getItem("betaOptOut");r.searchParams.append("locale",m||i),r.searchParams.append("logAnalytics",c),r.searchParams.append("callingApp",chrome.runtime.id),r.searchParams.append("betaOptOut",l),r.searchParams.append("enableCaretMode",C),t.getItem("signInTp")&&r.searchParams.append("touchp",t.getItem("signInTp")),r.searchParams.append("rvu",e.getItem("userState")?.rvu??null);const d=e.getItem("installType")||"update",u=e.getItem("installSource");r.searchParams.append("version",`${chrome.runtime.getManifest().version}:${d}`),r.searchParams.append("installSource",u),"false"===e.getItem("staticFteCoachmarkShown")&&r.searchParams.append("showFTECoachmark","true"),"true"!==M("googlePrint")&&!0!==R||"false"===n.getItem("googleAppsPrint")||r.searchParams.append("googleAppsPrint","true");const f=["dropin!","provider!","app!"],g=["analytics","logToConsole","enableLogging","frictionless","sessionId","linearization","ev","ao"],w=["isReadAloudEnable","isDeskTop","isAcrobat","theme","defaultOwnerShipExperiment","sessionId","sgd","sl","ev","fsm","ao"];let I;e.getItem("env"),I=P?new URLSearchParams(new URL(h).search):new URLSearchParams(window.location.search),ne(g,r,I,!1,!0),ne(w,r,I,!0,!1);let b=r.href;return f.forEach((e=>{I.forEach(((t,n)=>{n.startsWith(e)&&(b=b+"&"+n+"="+t)}))})),b}catch(e){W("DCBrowserExt:Viewer:Iframe:Creation:Failed"),z()}})();_.createIframe(s),window.addEventListener("message",(n=>{!n.data||!$(n.origin)||b||"hsready"!==n.data.type&&"ready"!==n.data.type||(b=!0,y=(new Date).getTime(),v=n.data.requestId,"on"===n.data.killSwitch?(W("DCBrowserExt:Viewer:KillSwitch:Turned:On"),e.setItem("pdfViewer","false"),i.setViewerState("disabled"),e.setItem("killSwitch","on"),P?z(!0):setTimeout((()=>{window.location.href=h}),200)):e.getItem("killSwitch")&&(W("DCBrowserExt:Viewer:KillSwitch:Turned:Off"),e.removeItem("killSwitch")),t.getItem("signInTp")&&t.removeItem("signInTp"))}))}catch(e){ee("Error create Iframe",e)}};function ie(e){if(g)return g;let t=e;try{const n=e.split("?")[0].split("/").filter((e=>e.length>0)),a=n.length>0?n[n.length-1]:"untitled";t=a;const r=a.length-4;(a.length<4||a.toLowerCase().indexOf(".pdf")!==r)&&(t+=".pdf")}catch(e){ee("Error in getFileNameFromURL",e)}return t}function se(e,t){return new Promise(((n,a)=>{const r=(new Date).getTime(),i=new XMLHttpRequest;i.open("GET",e.url),i.responseType="arraybuffer",i.setRequestHeader("Range",`bytes=${t.start}-${t.end}`),i.onload=()=>{if(4===i.readyState&&206===i.status)n({buffer:i.response,startTime:r,endTime:(new Date).getTime()});else if(200===i.status){const e={status:i.status,statusText:i.statusText,fileSize:f,rangeBufferSize:i.response.byteLength,range:t};a({message:"Unexpected response to get file buffer range",error:e})}else{const e={status:i.status,statusText:i.statusText,fileSize:f,range:t};a({message:"Invalid response to get file buffer ranger",error:e})}},i.onerror=e=>{a({message:"Error to get file buffer range",error:e})},i.ontimeout=e=>{a({message:"Timeout to get file buffer range due to timeout",error:e})},i.send()}))}function oe(e,t){"PDF"===function(e){if(e)try{let t=new URL(e).pathname;return t.substr(t.lastIndexOf(".")+1).toUpperCase()}catch(e){return""}return""}(e)&&(w=!0);const n=new XMLHttpRequest;n.open("GET",e),n.responseType="arraybuffer",n.onreadystatechange=function(){4===n.readyState&&(200!==n.status&&0!=n.status||t({buffer:n.response,mimeType:n.getResponseHeader("content-type")}))},n.send(null)}async function ce(){try{const e=n.getItem("bufferTabId");if(e){const t=await o.getDataFromIndexedDB(e);if(t&&t.fileBuffer)return w=!0,{buffer:t.fileBuffer}}}catch(e){}return{}}function le(e,t,n){return new Promise(((a,r)=>{const i=h;if(i.startsWith("file://"))return void oe(i,a);const s=new XMLHttpRequest;var o;s.open("GET",i),s.responseType="arraybuffer",t&&s.setRequestHeader("If-Range","randomrange"),s.onreadystatechange=(o=s,function(e){if(this.readyState==this.HEADERS_RECEIVED){if(!function(e,t){const n=e.getResponseHeader("content-type"),a=e.getResponseHeader("content-disposition");if(n){const e=n.toLowerCase().split(";",1)[0].trim();if(a&&/^\s*attachment[;]?/i.test(a))return!1;if("application/pdf"===e)return!0;if("application/octet-stream"===e&&a&&/\.pdf(["']|$)/i.test(a))return!0}return!1}(o))return ee("Fall back to native - not pdf from headers"),z();w=!0}}),s.onprogress=function(e,t){return function(n){n.lengthComputable&&(f=n.total,e.sendProgress("progress",n.total,n.loaded,t))}}(e,n),s.onload=()=>{if(s.status>=200&&s.status<400)a({buffer:s.response,mimeType:s.getResponseHeader("content-type"),downLoadEndTime:(new Date).getTime()});else{const e={status:s.status,statusText:s.statusText};r({message:"Invalid response fetching content",error:e})}},s.onerror=e=>{r({message:"Error to download file contents",error:e})},s.ontimeout=e=>{r({message:"Timeout to download file contents",error:e})},s.send()}))}function de(e){W(`DCBrowserExt:Viewer:SignIn:AdobeYolo:${e}:clicked`),chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var t=e[0]&&e[0].id;ae("adobeYoloTabsInfo",t,"sessionStorage")})),O({main_op:"launchJumpUrl",source:e},(t=>{_._sendMessage({type:"adobeYoloJumpResponse",response:t,source:e},p.origin)}))}function me(e,t,...n){P?o.storeBufferAndCall(e,t,D,...n):chrome.tabs.getCurrent((function(a){o.storeBufferAndCall(e,t,a.id,...n)}))}function ue(e){_._sendMessage({type:"redirectToAcrobatWeb",response:e},p.origin)}function fe(t,n,a=!1){if(P){const r=e.getItem("recentFilesData");if(r&&r.isSyncedWithHistory){const e=r.recentFilesPath?[...r.recentFilesPath]:[],i=[];for(let t=e.length-1;t>=0;t--)i.push({...e[t],chromeHistory:!0,url:`chrome-extension://${chrome.runtime.id}/viewer.html?pdfurl=${e[t].url}`,mimeUrl:e[t].url});t.sendRecentUrl(!0,i,n,a)}}else chrome.history.search({text:chrome.runtime.getURL("viewer.html"),startTime:0,maxResults:1e3},(e=>{const r=e.filter((e=>e.url.startsWith(chrome.runtime.getURL("viewer.html")))),i=[];for(let e=0;e<r.length;++e){const{url:t,title:n}=r[e],{lastVisitTime:a}=r[e];i.push({filename:n,url:t,lastVisited:a,chromeHistory:!0})}t.sendRecentUrl(!0,i,n,a)}))}function pe(r,i){switch(i.data.main_op){case"open_in_acrobat":case"fillsign":!async function(t,n){const r={main_op:"open_in_acrobat"};if("fillsign"===n.data.main_op&&(r.paramName="FillnSign"),r.url=n.data.url,r.click_context="pdfviewer",r.timeStamp=Date.now(),n.data.fileBuffer){const e=new Blob([n.data.fileBuffer],{type:"application/pdf"});r.dataURL=URL.createObjectURL(e)}if(U=function(e){"fillsign"===n.data.main_op?t.openInAcrobatResponse("FILLSIGN_IN_DESKTOP_APP",e,n.origin):t.openInAcrobatResponse("OPEN_IN_DESKTOP_APP",e,n.origin),ee(`Open In Acrobat - (${n.data.main_op}) response- ${e}`)},e.getItem("isSharepointFeatureEnabled"))if(Z.isSharePointURL)r.workflow_name="SharePoint",r.isSharePointURL=!0,O(r,U);else{const e=await a.checkForSharePointURL(r.url);r.isSharePointURL=e,e&&(r.workflow_name="SharePoint"),O(r,U)}else O(r,U)}(r,i);break;case"complete_conversion":W("DCBrowserExt:Viewer:Verbs:Conversion:Redirection"),function(e){const t={};t.main_op=e.data.main_op,t.conversion_url=decodeURIComponent(e.data.conversion_url),t.timeStamp=Date.now(),O(t)}(i);break;case"updateLocale":W("DCBrowserExt:Viewer:User:Locale:Updated"),e.setItem("viewer-locale",i.data.locale),O({main_op:"localeChange",locale:i.data.locale}),chrome.tabs.reload();break;case"setInitialLocale":let c=!1;e.getItem("viewer-locale")||(c=!0,e.setItem("viewer-locale",i.data.locale),W("DCBrowserExt:Viewer:User:Locale:Initial")),i.data.reloadReq&&c&&chrome.tabs.reload();break;case"error-sign-in":!function(e){const t=a.uuid();n.setItem("csrf",t);const r=new URL(e),i=q();i.hash=i.hash+`state=${t}&signInError=true`,r.searchParams.set("redirect_uri",i),chrome.tabs.update({url:r.href,active:!0})}(i.data.url);break;case"deleteViewerLocale":e.getItem("viewer-locale")&&(e.removeItem("viewer-locale"),chrome.tabs.reload());break;case"signin":W("DCBrowserExt:Viewer:Ims:Sign:In"),n.setItem("signInSource",i.data.source),W(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),me(i.data.fileBuffer,G,{touchpoint:i.data.tp});break;case"googleSignIn":W("DCBrowserExt:Viewer:Ims:Sign:In"),W(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),n.setItem("signInSource",i.data.source),me(i.data.fileBuffer,X,i.data.application);break;case"signup":W("DCBrowserExt:Viewer:Ims:Sign:Up"),n.setItem("signUpSource",i.data.source),W(`DCBrowserExt:Viewer:Ims:Sign:Up:${i.data.source}`),me(i.data.fileBuffer,G,{sign_up:!0});break;case"reload_viewer":chrome.tabs.reload();break;case"upsell_event":!function(e){if(e&&e.url){const n=new URL(decodeURIComponent(e.url));e.returnUrlParams&&t.setItem("rtParams",e.returnUrlParams.toString()),"_blank"===e.target?chrome.tabs.create({url:n.href,active:!0}):chrome.tabs.update({url:n.href,active:!0})}}(i.data);break;case"upsell_remove_urlParams":t.removeItem("rtParams"),t.removeItem("payPalUrl");break;case"fetchLocalRecents":const l=new URL(e.getItem("cdnUrl")).origin;chrome.permissions.contains({permissions:["history"],origins:["https://www.google.com/"]},(e=>{if(i.data.fetchRecents){const t=i.data.showOverlay;e||P?fe(_,l,t):(W("DCBrowserExt:Permissions:History:DialogTriggered"),chrome.permissions.request({permissions:["history"],origins:["https://www.google.com/"]},(e=>{e?(W("DCBrowserExt:Permissions:History:Granted"),fe(_,l,t)):(W("DCBrowserExt:Permissions:History:Denied"),_.sendRecentUrl(!1,null,l))})))}else e||P?_.sendRecentUrl(!0,null,l):_.sendRecentUrl(!1,null,l)}));break;case"socialSignIn":W("DCBrowserExt:Viewer:Ims:Sign:In"),W(`DCBrowserExt:Viewer:Ims:Sign:In:${i.data.source}`),n.setItem("signInSource",i.data.source),me(i.data.fileBuffer,K,i.data.idp_token);break;case"openRecentFileLink":const m={};m.main_op=i.data.main_op,m.recent_file_url=decodeURIComponent(i.data.recent_file_url),O(m);break;case"userSubscriptionData":if(P){const e={};e.eventType=i.data.main_op,e.userSubscriptionData=i.data.userSubscriptionData,e.data=i.data,e.main_op=i.data.main_op;O(e,(function(e){e&&"showUninstallPopUp"===e.main_op&&_._sendMessage({type:"showUninstallPopUp"},p.origin)}))}break;case"uninstall":P&&O({main_op:"uninstall",defaultUrl:h});break;case"submit_form":fetch(i.data.resource,i.data.options).then((e=>{_.sendSubmitFormResponse(e.ok,i.origin)})).catch((()=>{_.sendSubmitFormResponse(!1,i.origin)}));break;case"ownerShipExperimentShown":e.removeItem("defaultOwnerShipExperiment");break;case"openAcrobatOptions":chrome.runtime.openOptionsPage(),W(`DCBrowserExt:Viewer:ManagePref:clicked:${i.data.source}`);break;case"encryptedWriteFile":document.title.endsWith(i.data.secureString)||(document.title+=i.data.secureString);break;case"launchJump":me(i.data.fileBuffer,de,i.data.source);break;case"saveAsEvent":!async function(e){try{let t;if(W("DCBrowserExt:Viewer:SaveToMyComputer:"+(B?"fileHandlerExist":"fileHandlerNotExist")),!B){const n={suggestedName:`${e.fileName}.pdf`,types:[{description:"PDF file",accept:{"application/pdf":[".pdf"]}}]};B=await window.showSaveFilePicker(n),t=!0}_._sendMessage({type:"saveToLocalResponse",newAsset:t,updatedFileName:B?.name},p.origin)}catch(e){B=null,ee("Save As Handler Error",e),_._sendMessage({type:"saveToLocalResponse",error:e},p.origin)}}(i.data);break;case"downloadFile":!async function(e){try{const t=new Blob([e.fileBuffer],{type:"application/pdf"}),n=URL.createObjectURL(t);await chrome.downloads.download({url:n,filename:`${e.fileName}.pdf`,conflictAction:"uniquify",saveAs:!0})}catch(e){ee("downloadFile error",e),_._sendMessage({type:"downloadFileError"},p.origin)}}(i.data);break;case"rememberSaveLocationPreference":!function(t){let n="";t.cloudStorage&&!e.getItem("selectedSaveLocationPreference")?n="PreferenceMigrationSuccess":t.cloudStorage||(n="SaveDialogRememberMe");n&&W(`DCBrowserExt:Viewer:ChangeSaveLocationPreference:${n}`);(!t.cloudStorage||t.cloudStorage&&!e.getItem("selectedSaveLocationPreference"))&&(e.setItem("saveLocation",t.saveLocation),e.setItem("selectedSaveLocationPreference",!0),O({panel_op:"options_page",requestType:s.OPTIONS_UPDATE_TOGGLE,toggleId:"saveLocationPreferenceTitle",toggleVal:t.saveLocation}))}(i.data);break;case"appRenderingDone":Pe();break;case"saveFileBuffer":me(i.data.fileBuffer);break;case"deleteFileBuffer":const u=n.getItem("bufferTabId");u&&o.deleteDataFromIndexedDB(u),n.removeItem("bufferTabId");case"appRenderingDone":Pe();break;case"writeToLocalSavedFile":!async function(e){try{const t=await B.createWritable();await t.write(e.fileBuffer),await t.close()}catch(e){B=null,ee("Write to Local File Error",e),_._sendMessage({type:"saveToLocalResponse",error:e},p.origin)}}(i.data);break;case"bookmarkWeb":d(i.data.url,ue,W)}}function ge(e){try{const t=new TextDecoder("utf-8").decode(e.buffer);let n=!1;-1!=t.indexOf("Linearized 1")?(n=!0,W("DCBrowserExt:Viewer:Linearization:Linearized:Version:1")):-1!=t.indexOf("Linearized")?W("DCBrowserExt:Viewer:Linearization:Linearized:Version:Other"):W("DCBrowserExt:Viewer:Linearization:Linearized:False"),_._sendMessage({type:"Linearization",linearized:n},p.origin)}catch(e){W("DCBrowserExt:Viewer:Linearization:Linearized:Detection:Failed"),ee("Linearization Detection failed",e)}}function he(t,n,a,r){a.then((a=>{const i=a.downLoadEndTime,s=a.buffer;a.buffer.byteLength;t.preview("preview",s,f,g,r,i,n.origin),_._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},p.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&_._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},p.origin)})).catch((e=>(W("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),z()))).finally((()=>{e.removeItem("sessionStarted")}))}class we{constructor(){this.request={main_op:"analytics"}}analytics=e=>{this.request.analytics||(this.request.analytics=[]),this.request.analytics.push([e])};sendAnalytics=()=>{O(this.request)}}function Ie(t,a,r,i){return s=>{try{if(s.data&&s.origin&&$(s.origin)&&(e=>{try{return e&&e.source&&e.source.top.location.origin==="chrome-extension://"+chrome.runtime.id}catch(e){return!1}})(s)){if(s.data.main_op)return pe(t,s);switch(s.data.type){case"ready":if(P?async function(t,a,r,i){let s=new we;I=!0;const o=h;document.title=g;const c=T.getHeaderValue("accept-ranges"),l=!n.getItem("bufferTabId")&&c&&"bytes"===c.toLowerCase()?"true":"false";t.sendFileMetaData("metadata",y,f,l,o,g,a.origin,!1),_e(),r?(s.analytics("DCBrowserExt:Viewer:Linearization:Range:Supported"),r.then((e=>{t.sendInitialBuffer("initialBuffer",e.startTime,e.endTime,e.buffer,a.origin),ge(e)})).catch((e=>{t.sendInitialBuffer("initialBuffer",0,0,-1,a.origin),s.analytics("DCBrowserExt:Viewer:Error:Linearization:InitialBufiled")}))):s.analytics("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),e.removeItem("isReload"),e.removeItem("isBackForward");const d=window.performance&&window.performance.timing&&window.performance.timing.navigationStart,m=ce();(await m).buffer?he(t,a,m,d):(fetch(i.streamUrl).then((e=>{let n=0;return new Response(new ReadableStream({start(r){const i=e.body.getReader();!function e(){i.read().then((({done:i,value:s})=>{i?r.close():(n+=s.byteLength,t.sendProgress("progress",f,n,a.origin),r.enqueue(s),e())})).catch((e=>{r.error(e)}))}()}}))})).then((e=>e.arrayBuffer())).then((n=>{f=n.byteLength,t.preview("preview",n,n.byteLength,g,d,(new Date).getTime(),a.origin),_._sendMessage({type:"NavigationStartTime",time:window.performance&&window.performance.timing&&window.performance.timing.navigationStart},a.origin),!0===e.getItem("isSaveLocationPrefEnabled")&&_._sendMessage({type:"changeSaveLocationPreference",saveLocation:e.getItem("saveLocation"),onLoad:!0},a.origin)})).catch((e=>(s.analytics("DCBrowserExt:Viewer:Error:FallbackToNative:FileDownload:Failed"),z()))),s.sendAnalytics()),ee("Viewer loaded")}(t,s,r,a):function(e,t,a,r,i){I=!0;const s=h,o=!n.getItem("bufferTabId")&&M("chunk")||"false",c=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("reload"),l=window.performance.getEntriesByType("navigation").map((e=>e.type)).includes("back_forward");e.sendFileMetaData("metadata",y,f,o,encodeURI(s),g,t.origin,c||l),_e(),a?(W("DCBrowserExt:Viewer:Linearization:Range:Supported"),a.then((n=>{e.sendInitialBuffer("initialBuffer",n.startTime,n.endTime,n.buffer,t.origin),ge(n)})).catch((n=>{e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin),W("DCBrowserExt:Viewer:Error:Linearization:InitialBuffer:Failed")}))):(W("DCBrowserExt:Viewer:Linearization:Range:Not:Supported"),e.sendInitialBuffer("initialBuffer",0,0,-1,t.origin)),he(e,t,r,i),ee("Viewer loaded")}(t,s,r,a,i),O({main_op:"getUserInfoFromAcrobat"},(e=>{_._sendMessage({type:"adobeYoloUserData",...e},p.origin)})),s.data.visitorID){const t=e.getItem("viewerVisitorID");e.setItem("viewerVisitorID",s.data.visitorID),t&&t!==s.data.visitorID&&W("DCBrowserExt:Analytics:viewerVisitorID:MCMID:Changed")}break;case"getFileBufferRange":!function(e,t){se({url:h},e.data.range).then((n=>{E||(W("DCBrowserExt:Viewer:Linearization:Range:Called"),E=!0),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,n.buffer,e.origin)})).catch((n=>{W("DCBrowserExt:Viewer:Error:Linearization:Range:Failed"),t.sendBufferRanges("bufferRanges",`${e.data.range.start}-${e.data.range.end}`,-1,e.origin)}))}(s,t);break;case"previewFailed":L||(W("DCBrowserExt:Viewer:Error:FallbackToNative:Preview:Failed"),L=!0,z());break;case"signin":W("DCBrowserExt:Viewer:Ims:Sign:In"),G();break;case"signout":W("DCBrowserExt:Viewer:Ims:Sign:Out"),e.removeItem("viewer-locale"),e.removeItem("userDetailsFetchedTimeStamp"),e.removeItem("discoveryExpiryTime"),e.removeItem("viewer-locale"),me(s.data.fileBuffer,Y);break;case"googleAppsPrintShown":n.setItem("googleAppsPrint","false"),W("DCBrowserExt:Viewer:GoogleApps:Print:Shown");break;case"signInExperimentShown":chrome.tabs.query({active:!0,currentWindow:!0},(function(t){const n=t[0],a=(new Date).getTime();e.setItem("signInExperimentShown",JSON.stringify({currTabId:n.id,timestamp:a}))}));break;case"disableViewer":e.setItem("pdfViewer","false"),chrome.tabs.reload();break;case"signInExperimentClosed":case"signInExperimentSkipped":e.setItem("signInExperimentSuppressed","true");break;case"enableBeta":e.setItem("betaOptOut","false"),chrome.tabs.reload();break;case"disableBeta":e.setItem("betaOptOut","true"),chrome.tabs.reload()}}}catch(e){W("DCBrowserExt:Viewer:Error:MessageHandler:Unknown")}}}function be(){if(!b)return W("DCBrowserExt:Viewer:Error:Handshake:TimedOut"),z(),!1}const ye=t=>{try{const a=T.getHeaderValue("content-length");f=a;const r=T.getHeaderValue("accept-ranges"),i=r&&"bytes"===r.toLowerCase();h=t.originalUrl,re(),g=function(){let e;const t=T.getHeaderValue("content-disposition");if(t&&/\.pdf(["']|$)/i.test(t)){const n=/filename[^;=\n\*]?=((['"]).*?\2|[^;\n]*)/.exec(t);null!=n&&n.length>1&&(e=n[1].replace(/['"]/g,""))}return e||(e=ie(h)),decodeURIComponent(e)}();const s={url:h},o=new URL(e.getItem("cdnUrl"));p||(p=o);let c=null;const l="false"!==M("linearization")&&!n.getItem("bufferTabId");l&&i&&a>0&&(c=se(s,{start:0,end:1024})),window.addEventListener("message",Ie(_,t,c)),ve(),setTimeout(be,25e3)}catch(e){ee("InitMimeHandlerScript failed",e),z()}};function _e(){if(n.getItem("signInAction")){const e=n.getItem("signInAction");_._sendMessage({type:"signInInformation",action:e,source:"signIn"===e?n.getItem("signInSource"):n.getItem("signUpSource")},p.origin),n.removeItem("signInSource"),n.removeItem("signUpSource"),n.removeItem("signInAction")}}async function ve(){chrome.storage.onChanged.addListener(((t,n)=>{"local"===n&&Object.entries(t).forEach((([t,{newValue:n}])=>{if("theme"===t&&_._sendMessage({type:"themeChange",theme:n},p.origin),"ANALYTICS_OPT_IN_ADMIN"===t){const t="false"!==e.getItem("logAnalytics"),a="false"!==n;_._sendMessage({type:"analyticsTrackingChange",value:t&&a},p.origin)}"saveLocation"===t&&_._sendMessage({type:"changeSaveLocationPreference",saveLocation:n},p.origin)}))})),await async function(){return u=await i.isInstalledViaUpsell(),u}(),O({main_op:"viewer-startup",url:h,startup_time:Date.now(),viewer:!0},(e=>{Z.isSharePointURL=!!e.isSharePointURL,Z.isSharePointFeatureEnabled=!!e.isSharePointEnabled,Z.isFrictionlessEnabled=!!e.isFrictionlessEnabled,Z.featureFlags=e.featureFlags,Z.isFillAndSignRegisteryEnabled=e.isFillnSignEnabled;const t=q().href;_.sendStartupConfigs(t,p.origin)})),O({main_op:"get-features&groups",cachePurge:"LAZY"},(e=>{_._sendMessage({type:"featureGroups",featureGroups:e.featureGroups,featureFlags:e.featureFlags,ffResponse:e.ffResponse},p.origin)})),P&&(setTimeout((()=>ae("loadedTabsInfo",D)),2e3),function(){const t=e.getItem("recentFilesData");if(t&&t.isSyncedWithHistory){const n=t.recentFilesPath?[...t.recentFilesPath]:[];1e3===n.length&&n.shift(),n.push({url:h,filename:g,lastVisited:Date.now()}),t.recentFilesPath=n,e.setItem("recentFilesData",t)}else chrome.permissions.contains({permissions:["history"],origins:["https://www.google.com/"]},(t=>{if(t)chrome.history.search({text:chrome.runtime.getURL("viewer.html"),startTime:0,maxResults:999},(t=>{const n=t.filter((e=>e.url.startsWith(chrome.runtime.getURL("viewer.html")))),a=[];for(let e=n.length-1;e>=0;e--){const{url:t,title:r,lastVisitTime:i}=n[e];let s=t;const o=t.split("viewer.html");o[1]&&(s=N(o[1],"pdfurl"),a.push({url:s,filename:r,lastVisited:i}))}a.push({url:h,filename:g,lastVisited:Date.now()}),e.setItem("recentFilesData",{recentFilesPath:a,isSyncedWithHistory:!0})}));else{const t=[];t.push({url:h,filename:g,lastVisited:Date.now()}),e.setItem("recentFilesData",{recentFilesPath:t,isSyncedWithHistory:!0})}}))}())}function Se(e){const t=document.getElementById("__acrobatDialog__");t&&0!==t.length?t&&"none"===t.style.display&&"visible"===e.frame_visibility?t.style.display="block":t&&e.trefoilClick&&(delete e.trefoilClick,t.remove()):function(e){const t=e.base64PDF;delete e.base64PDF;const n=`message=${encodeURIComponent(JSON.stringify(e))}`;e.base64PDF=t;const a=!m&&null===e.locale;let r=e.version>13||a?"210px":"130px",i="block";"hidden"===e.frame_visibility&&(i="none");const s=document.createElement("iframe");s.setAttribute("src",`${chrome.runtime.getURL("browser/js/frame.html")}?${n}`),s.setAttribute("id","__acrobatDialog__"),s.style.border="0px",s.style.zIndex="999999999999",s.style.position="fixed",s.style.top="-5px",s.style.right="80px",s.style.width="294px",s.style.height=r,s.style.display=i,s.style.margin="auto",document.getElementById("trefoil_m").appendChild(s)}(e)}function Le(e){O({main_op:"caret_mode_toggle_handler",toggleCaretModeValue:e})}function Ee(e){if(e.panel_op&&(1==e.trefoilClick?(delete e.trefoilUI,delete e.newUI,Se(e)):!0===e.reload_in_native&&(delete e.is_viewer,chrome.tabs.reload(e.tabId))),"relay_to_content"!==e.main_op||"dismiss"!==e.content_op)return"relay_to_content"===e.main_op&&"caret_mode_toggle_handler"===e.content_op?_._sendMessage({type:"toggleCaretMode",toggleCaretModeValue:e.status},p.origin):"reset"===e.main_op?_._sendMessage({type:"toggleAnalytics",logAnalytics:e.analytics_on},p.origin):"showUninstallPopUp"===e.main_op?_._sendMessage({type:"showUninstallPopUp"},p.origin):"jumpUrlSuccess"===e.main_op&&(!P||e.tabInfo&&e.tabInfo.includes(D))&&_._sendMessage({type:"adobeYoloJumpUrlSuccess"},p.origin),!1;{delete e.content_op,delete e.trefoilClick,delete e.reload_in_native;let t=document.getElementById("__acrobatDialog__");t&&(t.remove(),t=null)}}function Pe(){const t=e.getItem("userState");let n=!1;if(void 0!==t?.rvu&&(n=!0),!0!==t.rvu){const t={rvu:n};e.setItem("userState",t)}}document.addEventListener("DOMContentLoaded",function(e){const t=(new Date).getTime();let n=window.setInterval((function(){(function(){const e=document.getElementById("dc-view-frame");return e&&e.contentWindow&&1===e.contentWindow.length}()||(new Date).getTime()-t>15e3)&&(window.clearInterval(n),e.call(this))}),200)}((function(){const e=document.getElementById("dc-view-frame");e&&e.contentWindow&&e.contentWindow.focus()}))),void 0!==chrome.runtime&&i.isMimeHandlerAvailable().then((async function(t){if(chrome.runtime.onMessage.addListener(Ee),t){if(P=!0,!window.navigator.onLine&&e.getItem("offlineSupportDisable"))return void z();e.getItem("sessionStarted")||(e.setItem("sessionId",a.uuid()),e.setItem("sessionStarted",!0));const t=await i.getStreamInfo()||{};T=new l(t.responseHeaders),D=t.tabId;let n=await O({main_op:"check-is-google-print"});R=n&&n.isGooglePrint,C=await i.caretModeStatus(),i.addCaretModeListener(Le),O({main_op:"viewer-preview",startup_time:Date.now(),viewer:!0},(()=>ye(t)))}else H(),(async()=>{try{if(!A(h))return void(w=!1);re();const t=M("clen")||-1,a=M("chunk")||!1,r="false"!==M("linearization")&&!n.getItem("bufferTabId"),i={url:h},s=(new Date).getTime(),o=new URL(e.getItem("cdnUrl"));g=M("pdffilename")||ie(h),document.title=decodeURIComponent(g),p||(p=o);let c=null;const l=r&&a&&t>0;l&&(c=se(i,{start:0,end:1024}));const d=ce(),m=(await d).buffer?d:le(_,l,o.origin);window.addEventListener("message",Ie(_,m,c,s)),setTimeout(be,25e3)}catch(e){ee("InitScript failed",e),z()}})(),ve()}))}();