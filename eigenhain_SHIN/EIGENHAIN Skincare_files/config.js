
window[window["TiktokAnalyticsObject"]].instance("C6GEBA5G6B5B1R5TSTPG").setAdvancedMatchingAvailableProperties({"email":true,"phone_number":true,"auto_email":false,"auto_phone_number":false});
window[window["TiktokAnalyticsObject"]].instance("C6GEBA5G6B5B1R5TSTPG").setPixelInfo && window[window["TiktokAnalyticsObject"]].instance("C6GEBA5G6B5B1R5TSTPG").setPixelInfo({status: 0, name: "TikTok Pixel for Shopify 1637934504", advertiserID: "7034872664040669186", setupMode: 1, partner: "Shopify", is_onsite: false });
window[window["TiktokAnalyticsObject"]].setPCMDomain && window[window["TiktokAnalyticsObject"]].setPCMDomain("eigenhain.com");
window[window["TiktokAnalyticsObject"]].setPCMConfig && window[window["TiktokAnalyticsObject"]].setPCMConfig([]);
!function(e){var o={};function i(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=o,i.d=function(n,t,e){i.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},i.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)i.d(e,o,function(n){return t[n]}.bind(null,o));return e},i.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(t,"a",t),t},i.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},i.p="https://analytics.tiktok.com/i18n/pixel/",i(i.s="1XwD")}({"1XwD":function(n,t,e){"use strict";e.r(t);var i,r=e("SbFU");(e={})[e.OTHER=0]="OTHER",e[e.ANDROID=1]="ANDROID",e[e.IOS=2]="IOS",(e=i=i||{}).LOAD_START="load_start",e.LOAD_END="load_end",e.BEFORE_INIT="before_init",e.INIT_START="init_start",e.INIT_END="init_end",e.JSB_INIT_START="jsb_init_start",e.JSB_INIT_END="jsb_init_end",e.BEFORE_AD_INFO_INIT_START="before_ad_info_init_start",e.AD_INFO_INIT_START="ad_info_init_start",e.AD_INFO_INIT_END="ad_info_init_end",e.IDENTIFY_INIT_START="identify_init_start",e.IDENTIFY_INIT_END="identify_init_end",e.PLUGIN_INIT_START="_init_start",e.PLUGIN_INIT_END="_init_end",e.PIXEL_SEND="pixel_send",e.PIXEL_SEND_PCM="pixel_send_PCM",e.JSB_SEND="jsb_send",e.HTTP_SEND="http_send",e.HANDLE_CACHE="handle_cache",e.INIT_ERROR="init_error",e.PIXEL_EMPTY="pixel_empty",e.JSB_ERROR="jsb_error",e.API_ERROR="api_error",e.PLUGIN_ERROR="plugin_error",e.CUSTOM_INFO="custom_info",e.CUSTOM_ERROR="custom_error";var _="shopify_auto_am",e=function(){var n,t,e,o;window.Shopify&&(n=(null===(o=null===(o=window.Shopify)||void 0===o?void 0:o.checkout)||void 0===o?void 0:o.email)||(null===(o=null===(o=null===(o=window.Shopify)||void 0===o?void 0:o.Checkout)||void 0===o?void 0:o.customer)||void 0===o?void 0:o.email),t=(null===(e=null===(e=window.Shopify)||void 0===e?void 0:e.checkout)||void 0===e?void 0:e.phone)||(null===(e=null===(e=null===(e=window.Shopify)||void 0===e?void 0:e.checkout)||void 0===e?void 0:e.billing_address)||void 0===e?void 0:e.phone),o={},e=[],n&&(o.email=n,e.push("email")),t&&(o.phone_number=t,e.push("phone_number")),0<e.length&&function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{var e=Object(r.a)().monitor;e&&e.info.apply(e,n)}catch(o){}}(i.CUSTOM_INFO,{custom_name:_,custom_enum:e.join(",")}),Object(r.a)().identify(o))};try{e()}catch(o){console.warn("[TikTok Pixel]",o),function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{var e=Object(r.a)().monitor;e&&e.error.apply(e,n)}catch(o){}}(i.CUSTOM_ERROR,o,{custom_name:_})}},SbFU:function(n,t,e){"use strict";e.d(t,"a",function(){return i}),e.d(t,"b",function(){return r});var o;r(function(){return/open_news/i.test(navigator.userAgent)});(t=o=o||{}).EMPTY_VALUE="empty_value",t.WRONG_FORMAT="wrong_format",t.CORRECT_FORMAT="correct_format",t.HASHED="hashed",t.HASHED_ERR="hashed_err",t.HASHED_CORRECT="hashed_correct",t.PLAINTEXT_EMAIL="plaintext_email",t.PLAINTEXT_PHONE="plaintext_phone",(t={}).Manual="manual",t.Auto="auto";undefined&&undefined.__spreadArrays;var i=function(){return"object"==typeof window&&window["object"==typeof window&&window.TiktokAnalyticsObject||"ttq"]};function r(e,o){var i,r=e;return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return r&&(i=e.apply(o,n),r=null),i}}}});