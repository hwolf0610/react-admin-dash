(this["webpackJsonp@coreui/coreui-pro-react-admin-template"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template"]||[]).push([[26],{1395:function(e,n,t){"use strict";t.r(n),t.d(n,"Context",(function(){return g}));var a=t(150),o=t(151),i=t(155),l=t(152),r=t(153),s=t(2),c=t.n(s),u=t(492),p=t.n(u),m=t(493),d=t(48),h=t(661),b=function(e){Object(r.a)(t,e);var n=Object(l.a)(t);function t(){var e;Object(a.a)(this,t);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return(e=n.call.apply(n,[this].concat(i))).loading=function(){return c.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},c.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"}))},e}return Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return c.a.createElement("main",{className:"c-main"},c.a.createElement(m.w,{fluid:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(d.d,null,h.a.map((function(e,n){return e.component?c.a.createElement(d.b,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return c.a.createElement(e.component,n)}}):null})),c.a.createElement(d.a,{from:"/",to:"/login"})))))}}]),t}(s.Component),g=c.a.createContext({show:!1}),f=c.a.lazy((function(){return t.e(18).then(t.bind(null,1394))})),y=c.a.lazy((function(){return t.e(32).then(t.bind(null,1390))})),z=c.a.lazy((function(){return t.e(33).then(t.bind(null,1391))})),v=c.a.lazy((function(){return t.e(25).then(t.bind(null,1393))})),S=function(e){Object(r.a)(t,e);var n=Object(l.a)(t);function t(e){var o;return Object(a.a)(this,t),(o=n.call(this,e)).loading=function(){return c.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},c.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"}))},o.c={},o.toggleSidebar=o.toggleSidebar.bind(Object(i.a)(o)),o.toggleSidebarMobile=o.toggleSidebarMobile.bind(Object(i.a)(o)),o.minimizeSidebar=o.minimizeSidebar.bind(Object(i.a)(o)),o.closeSidebar=o.closeSidebar.bind(Object(i.a)(o)),o.toggleAside=o.toggleAside.bind(Object(i.a)(o)),o.getAside=o.getAside.bind(Object(i.a)(o)),o.toggleTheme=o.toggleTheme.bind(Object(i.a)(o)),o.state={isAsideOpen:!1,isSidebarOpen:"responsive",isSidebarMinimized:!1,themeDark:!1,sidebarMobile:!1,sidebarDisplay:"sm"},o}return Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,n){return!0}},{key:"toggleSidebar",value:function(e,n){var t=!0===this.state.isSidebarOpen||"responsive"===this.state.isSidebarOpen;this.setState({isSidebarOpen:!t&&"responsive"})}},{key:"toggleSidebarMobile",value:function(e,n){var t="responsive"===this.state.isSidebarOpen||!1===this.state.isSidebarOpen;this.setState({isSidebarOpen:!!t||"responsive"})}},{key:"minimizeSidebar",value:function(){this.setState({isSidebarMinimized:!this.state.isSidebarMinimized})}},{key:"closeSidebar",value:function(){this.setState({isSidebarOpen:"responsive"})}},{key:"getAside",value:function(e){this.toggleThisAside=e}},{key:"toggleAside",value:function(){this.toggleThisAside&&this.toggleThisAside()}},{key:"toggleTheme",value:function(){this.setState({themeDark:!this.state.themeDark})}},{key:"render",value:function(){var e=p()("c-app c-default-layout",!!this.state.themeDark&&"c-dark-theme");return c.a.createElement("div",{className:e},c.a.createElement(f,{sidebarShow:this.state.isSidebarOpen,sidebarMinimize:this.state.isSidebarMinimized,sidebarDisplay:this.state.sidebarDisplay,sidebarMobile:this.state.sidebarMobile,onChange:this.closeSidebar,location:this.props.location}),c.a.createElement(y,{sidebarShow:this.state.isAsideOpen,toggleAside:this.toggleAside,getToggleAside:this.getAside}),c.a.createElement("div",{className:"c-wrapper"},c.a.createElement(m.M,{withSubheader:!0},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(v,{toggleSidebar:this.toggleSidebar,toggleSidebarMobile:this.toggleSidebarMobile,toggleAside:this.toggleAside,toggleTheme:this.toggleTheme}))),c.a.createElement("div",{className:"c-body"},c.a.createElement(b,null)),c.a.createElement(m.I,{fixed:!1},c.a.createElement(s.Suspense,{fallback:this.loading()},c.a.createElement(z,null)))))}}]),t}(s.Component);n.default=S},661:function(e,n,t){"use strict";var a=t(2),o=t.n(a),i=o.a.lazy((function(){return t.e(72).then(t.bind(null,755))})),l=o.a.lazy((function(){return t.e(39).then(t.bind(null,1354))})),r=o.a.lazy((function(){return Promise.all([t.e(4),t.e(38)]).then(t.bind(null,1356))})),s=o.a.lazy((function(){return t.e(35).then(t.bind(null,905))})),c=o.a.lazy((function(){return t.e(34).then(t.bind(null,906))})),u=o.a.lazy((function(){return t.e(37).then(t.bind(null,907))})),p=o.a.lazy((function(){return t.e(77).then(t.bind(null,908))})),m=o.a.lazy((function(){return Promise.all([t.e(14),t.e(60)]).then(t.bind(null,1357))})),d=o.a.lazy((function(){return Promise.all([t.e(2),t.e(12),t.e(61)]).then(t.bind(null,916))})),h=o.a.lazy((function(){return t.e(27).then(t.bind(null,990))})),b=o.a.lazy((function(){return t.e(28).then(t.bind(null,991))})),g=o.a.lazy((function(){return t.e(29).then(t.bind(null,992))})),f=o.a.lazy((function(){return t.e(36).then(t.bind(null,993))})),y=o.a.lazy((function(){return Promise.all([t.e(1),t.e(8),t.e(16)]).then(t.bind(null,994))})),z=o.a.lazy((function(){return t.e(62).then(t.bind(null,1086))})),v=o.a.lazy((function(){return Promise.all([t.e(2),t.e(11),t.e(21)]).then(t.bind(null,1087))})),S=o.a.lazy((function(){return Promise.all([t.e(2),t.e(9),t.e(63)]).then(t.bind(null,1130))})),E=o.a.lazy((function(){return t.e(70).then(t.bind(null,1234))})),k=o.a.lazy((function(){return Promise.all([t.e(1),t.e(2),t.e(10),t.e(76)]).then(t.bind(null,1235))})),x=o.a.lazy((function(){return Promise.all([t.e(13),t.e(22)]).then(t.bind(null,1355))})),O=o.a.lazy((function(){return t.e(23).then(t.bind(null,1311))})),C=o.a.lazy((function(){return t.e(78).then(t.bind(null,1350))})),P=o.a.lazy((function(){return t.e(30).then(t.bind(null,1313))})),A=o.a.lazy((function(){return t.e(40).then(t.bind(null,1314))})),M=o.a.lazy((function(){return t.e(41).then(t.bind(null,1315))})),T=o.a.lazy((function(){return t.e(42).then(t.bind(null,1316))})),j=o.a.lazy((function(){return t.e(43).then(t.bind(null,1317))})),w=o.a.lazy((function(){return t.e(44).then(t.bind(null,1318))})),D=o.a.lazy((function(){return t.e(45).then(t.bind(null,1319))})),B=o.a.lazy((function(){return t.e(46).then(t.bind(null,1320))})),N=o.a.lazy((function(){return t.e(47).then(t.bind(null,1321))})),I=o.a.lazy((function(){return t.e(48).then(t.bind(null,1322))})),F=o.a.lazy((function(){return t.e(49).then(t.bind(null,1323))})),U=o.a.lazy((function(){return t.e(50).then(t.bind(null,1324))})),G=o.a.lazy((function(){return t.e(51).then(t.bind(null,1325))})),J=o.a.lazy((function(){return t.e(52).then(t.bind(null,1326))})),V=o.a.lazy((function(){return t.e(53).then(t.bind(null,1345))})),L=o.a.lazy((function(){return t.e(54).then(t.bind(null,1327))})),H=o.a.lazy((function(){return t.e(55).then(t.bind(null,1328))})),W=o.a.lazy((function(){return t.e(56).then(t.bind(null,1329))})),q=o.a.lazy((function(){return t.e(57).then(t.bind(null,1330))})),K=o.a.lazy((function(){return t.e(58).then(t.bind(null,1331))})),Q=o.a.lazy((function(){return Promise.all([t.e(1),t.e(3),t.e(59)]).then(t.bind(null,1332))})),R=o.a.lazy((function(){return Promise.all([t.e(1),t.e(3),t.e(20)]).then(t.bind(null,1348))})),X=o.a.lazy((function(){return t.e(65).then(t.bind(null,1334))})),Y=o.a.lazy((function(){return t.e(66).then(t.bind(null,1335))})),Z=o.a.lazy((function(){return t.e(64).then(t.bind(null,1336))})),$=o.a.lazy((function(){return t.e(67).then(t.bind(null,1337))})),_=o.a.lazy((function(){return t.e(68).then(t.bind(null,1338))})),ee=o.a.lazy((function(){return t.e(69).then(t.bind(null,1339))})),ne=o.a.lazy((function(){return t.e(79).then(t.bind(null,1351))})),te=[{path:"/",exact:!0,name:"Home"},{path:"/login",name:"login",component:i},{path:"/dashboard",name:"Dashboard",component:R},{path:"/apps/programs/plan",name:"Plan",component:l},{path:"/apps/programs/Plan/:id",name:"PlanVersion",component:r},{path:"/apps/Challenges/ChallengesView",name:"Challenges",component:s},{path:"/apps/Card/CardLibrary",name:"Card",component:c},{path:"/apps/Post/FlaggedPost",name:"Post",component:u},{path:"/setting/MainSetting",name:"Setting",component:p},{path:"/theme",name:"Theme",component:ne,exact:!0},{path:"/theme/colors",name:"Colors",component:ne},{path:"/theme/typography",name:"Typography",component:o.a.lazy((function(){return t.e(80).then(t.bind(null,1340))}))},{path:"/base",name:"Base",component:M,exact:!0},{path:"/base/breadcrumbs",name:"Breadcrumbs",component:A},{path:"/base/cards",name:"Cards",component:M},{path:"/base/carousels",name:"Carousel",component:T},{path:"/base/collapses",name:"Collapse",component:j},{path:"/base/jumbotrons",name:"Jumbotrons",component:w},{path:"/base/list-groups",name:"List Groups",component:D},{path:"/base/navbars",name:"Navbars",component:B},{path:"/base/navs",name:"Navs",component:N},{path:"/base/paginations",name:"Paginations",component:I},{path:"/base/popovers",name:"Popovers",component:F},{path:"/base/progress-bar",name:"Progress Bar",component:U},{path:"/base/spinners",name:"Spinners",component:G},{path:"/base/switches",name:"Switches",component:J},{path:"/base/tabs",name:"Tabs",component:V},{path:"/base/tooltips",name:"Tooltips",component:L},{path:"/buttons",name:"Buttons",component:K,exact:!0},{path:"/buttons/buttons",name:"Buttons",component:K},{path:"/buttons/button-dropdowns",name:"Dropdowns",component:W},{path:"/buttons/button-groups",name:"Button Groups",component:q},{path:"/buttons/brand-buttons",name:"Brand Buttons",component:H},{path:"/charts",name:"Charts",component:Q},{path:"/editors",name:"Editors",component:m,exact:!0},{path:"/editors/code-editors",name:"Code Editors",component:m},{path:"/editors/text-editors",name:"Text Editors",component:d},{path:"/forms",name:"Forms",component:z,exact:!0},{path:"/forms/advanced-forms",name:"Advanced Forms",component:y},{path:"/forms/basic-forms",name:"Basic Forms",component:z},{path:"/forms/validation-forms",name:"Form Validation",component:v},{path:"/google-maps",name:"Google Maps",component:S},{path:"/icons",exact:!0,name:"Icons",component:X},{path:"/icons/coreui-icons",name:"CoreUI Icons",component:X},{path:"/icons/flags",name:"Flags",component:Y},{path:"/icons/brands",name:"Brands",component:Z},{path:"/notifications",name:"Notifications",component:$,exact:!0},{path:"/notifications/alerts",name:"Alerts",component:$},{path:"/notifications/badges",name:"Badges",component:_},{path:"/notifications/modals",name:"Modals",component:ee},{path:"/notifications/toaster",name:"Toaster",component:E},{path:"/plugins",name:"Plugins",component:k,exact:!0},{path:"/plugins/calendar",name:"Calendar",component:k},{path:"/plugins/draggable",name:"Draggable Cards",component:x},{path:"/plugins/spinners",name:"Spinners",component:O},{path:"/tables",name:"Tables",component:P,exact:!0},{path:"/tables/data-table",name:"Data Table",component:C},{path:"/tables/tables",name:"Tables",component:P},{path:"/widgets",name:"Widgets",component:o.a.lazy((function(){return Promise.all([t.e(1),t.e(3),t.e(15)]).then(t.bind(null,1341))}))},{path:"/apps",name:"Apps",component:h,exact:!0},{path:"/apps/email",name:"Email",component:h,exact:!0},{path:"/apps/email/compose",name:"Compose",component:h},{path:"/apps/email/inbox",name:"Inbox",component:b},{path:"/apps/email/message",name:"Message",component:g},{path:"/apps/invoicing",name:"Invoice",component:f,exact:!0},{path:"/apps/invoicing/invoice",name:"Invoice",component:f},{path:"/users",exact:!0,name:"Users",component:o.a.lazy((function(){return t.e(24).then(t.bind(null,1342))}))},{path:"/users/:id",exact:!0,name:"User Details",component:o.a.lazy((function(){return Promise.all([t.e(4),t.e(31)]).then(t.bind(null,1352))}))}];n.a=te}}]);
//# sourceMappingURL=26.30a39f47.chunk.js.map