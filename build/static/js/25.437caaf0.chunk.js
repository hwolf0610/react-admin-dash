(this["webpackJsonp@coreui/coreui-pro-react-admin-template"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template"]||[]).push([[25],{1393:function(e,a,t){"use strict";t.r(a);var l=t(150),s=t(151),c=t(152),n=t(153),m=t(2),r=t.n(m),o=t(493),i=t(494),d=t(661),u=t(155),E=t(48),g=function(e){Object(n.a)(t,e);var a=Object(c.a)(t);function t(e){var s;return Object(l.a)(this,t),(s=a.call(this,e)).onAccountLogout=function(){console.log("logout"),localStorage.setItem("accountLoginFlag","no"),s.props.history.push("/login")},s.toggle=s.toggle.bind(Object(u.a)(s)),s.state={dropdownOpen:!1},s}return Object(s.a)(t,[{key:"toggle",value:function(){this.setState({dropdownOpen:!this.state.dropdownOpen})}},{key:"dropNotif",value:function(){return r.a.createElement(o.z,{inNav:!0,className:"c-header-nav-item mx-2"},r.a.createElement(o.E,{className:"c-header-nav-link",caret:!1},r.a.createElement(i.a,{name:"cil-bell"}),r.a.createElement(o.b,{shape:"pill",color:"danger"},5)),r.a.createElement(o.D,{placement:"bottom-end",className:"pt-0"},r.a.createElement(o.C,{header:!0,tag:"div",className:"text-center",color:"light"},r.a.createElement("strong",null,"You have ",5," notifications")),r.a.createElement(o.C,null,r.a.createElement(i.a,{name:"cil-user-follow",className:"mr-2 text-success"})," New user registered"),r.a.createElement(o.C,null,r.a.createElement(i.a,{name:"cil-user-unfollow",className:"mr-2 text-danger"})," User deleted"),r.a.createElement(o.C,null,r.a.createElement(i.a,{name:"cil-chart",className:"mr-2 text-info"})," Sales report is ready"),r.a.createElement(o.C,null,r.a.createElement(i.a,{name:"cil-basket",className:"mr-2 text-primary"})," New client"),r.a.createElement(o.C,null,r.a.createElement(i.a,{name:"cil-speedometer",className:"mr-2 text-warning"})," Server overloaded"),r.a.createElement(o.C,{header:!0,tag:"div",color:"light"},r.a.createElement("strong",null,"Server")),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"text-uppercase mb-1"},r.a.createElement("small",null,r.a.createElement("b",null,"CPU Usage"))),r.a.createElement(o.ub,{size:"xs",color:"info",value:25}),r.a.createElement("small",{className:"text-muted"},"348 Processes. 1/4 Cores.")),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"text-uppercase mb-1"},r.a.createElement("small",null,r.a.createElement("b",null,"Memory Usage"))),r.a.createElement(o.ub,{size:"xs",color:"warning",value:70}),r.a.createElement("small",{className:"text-muted"},"11444GB/16384MB")),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"text-uppercase mb-1"},r.a.createElement("small",null,r.a.createElement("b",null,"SSD 1 Usage"))),r.a.createElement(o.ub,{size:"xs",color:"danger",value:90}),r.a.createElement("small",{className:"text-muted"},"243GB/256GB"))))}},{key:"dropTasks",value:function(){return r.a.createElement(o.z,{inNav:!0,className:"c-header-nav-item mx-2"},r.a.createElement(o.E,{className:"c-header-nav-link",caret:!1},r.a.createElement(i.a,{name:"cil-list"}),r.a.createElement(o.b,{shape:"pill",color:"warning"},5)),r.a.createElement(o.D,{placement:"bottom-end",className:"pt-0"},r.a.createElement(o.C,{header:!0,tag:"div",className:"text-center",color:"light"},r.a.createElement("strong",null,"You have ",5," pending tasks")),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"small mb-1"},"Upgrade NPM & Bower ",r.a.createElement("span",{className:"float-right"},r.a.createElement("strong",null,"0%"))),r.a.createElement(o.ub,{size:"xs",color:"info",value:0})),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"small mb-1"},"ReactJS Version ",r.a.createElement("span",{className:"float-right"},r.a.createElement("strong",null,"25%"))),r.a.createElement(o.ub,{size:"xs",color:"danger",value:25})),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"small mb-1"},"VueJS Version ",r.a.createElement("span",{className:"float-right"},r.a.createElement("strong",null,"50%"))),r.a.createElement(o.ub,{size:"xs",color:"warning",value:50})),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"small mb-1"},"Add new layouts ",r.a.createElement("span",{className:"float-right"},r.a.createElement("strong",null,"75%"))),r.a.createElement(o.ub,{size:"xs",color:"info",value:75})),r.a.createElement(o.C,{className:"d-block"},r.a.createElement("div",{className:"small mb-1"},"Angular 2 Cli Version ",r.a.createElement("span",{className:"float-right"},r.a.createElement("strong",null,"100%"))),r.a.createElement(o.ub,{size:"xs",color:"success",value:100})),r.a.createElement(o.C,{className:"text-center border-top"},r.a.createElement("strong",null,"View all tasks"))))}},{key:"dropMssgs",value:function(){return r.a.createElement(o.z,{inNav:!0,className:"c-header-nav-item mx-2",direction:"down"},r.a.createElement(o.E,{className:"c-header-nav-link",caret:!1},r.a.createElement(i.a,{name:"cil-envelope-open"}),r.a.createElement(o.b,{shape:"pill",color:"info"},4)),r.a.createElement(o.D,{className:"pt-0",placement:"bottom-end"},r.a.createElement(o.C,{header:!0,tag:"div",color:"light"},r.a.createElement("strong",null,"You have ",4," messages")),r.a.createElement(o.C,{href:"#"},r.a.createElement("div",{className:"message"},r.a.createElement("div",{className:"pt-3 mr-3 float-left"},r.a.createElement("div",{className:"c-avatar"},r.a.createElement(o.P,{src:"assets/img/avatars/7.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),r.a.createElement(o.b,{color:"success",className:"c-avatar-status"}))),r.a.createElement("div",null,r.a.createElement("small",{className:"text-muted"},"John Doe"),r.a.createElement("small",{className:"text-muted float-right mt-1"},"Just now")),r.a.createElement("div",{className:"text-truncate font-weight-bold"},r.a.createElement("span",{className:"fa fa-exclamation text-danger"})," Important message"),r.a.createElement("div",{className:"small text-muted text-truncate"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt..."))),r.a.createElement(o.C,{href:"#"},r.a.createElement("div",{className:"message"},r.a.createElement("div",{className:"pt-3 mr-3 float-left"},r.a.createElement("div",{className:"c-avatar"},r.a.createElement(o.P,{src:"assets/img/avatars/6.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),r.a.createElement(o.b,{color:"warning",className:"c-avatar-status"}))),r.a.createElement("div",null,r.a.createElement("small",{className:"text-muted"},"Jane Dovve"),r.a.createElement("small",{className:"text-muted float-right mt-1"},"5 minutes ago")),r.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),r.a.createElement("div",{className:"small text-muted text-truncate"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt..."))),r.a.createElement(o.C,{href:"#"},r.a.createElement("div",{className:"message"},r.a.createElement("div",{className:"pt-3 mr-3 float-left"},r.a.createElement("div",{className:"c-avatar"},r.a.createElement(o.P,{src:"assets/img/avatars/5.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),r.a.createElement(o.b,{color:"danger",className:"c-avatar-status"}))),r.a.createElement("div",null,r.a.createElement("small",{className:"text-muted"},"Janet Doe"),r.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),r.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),r.a.createElement("div",{className:"small text-muted text-truncate"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt..."))),r.a.createElement(o.C,{href:"#"},r.a.createElement("div",{className:"message"},r.a.createElement("div",{className:"pt-3 mr-3 float-left"},r.a.createElement("div",{className:"c-avatar"},r.a.createElement(o.P,{src:"assets/img/avatars/4.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),r.a.createElement(o.b,{color:"info",className:"c-avatar-status"}))),r.a.createElement("div",null,r.a.createElement("small",{className:"text-muted"},"Joe Doe"),r.a.createElement("small",{className:"text-muted float-right mt-1"},"4:03 AM")),r.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),r.a.createElement("div",{className:"small text-muted text-truncate"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt..."))),r.a.createElement(o.C,{href:"#",className:"text-center border-top"},r.a.createElement("strong",null,"View all messages"))))}},{key:"dropAccnt",value:function(){return r.a.createElement(o.z,{inNav:!0,className:"c-header-nav-items mx-2",direction:"down"},r.a.createElement(o.E,{className:"c-header-nav-link",caret:!1},r.a.createElement("div",{className:"c-avatar"},r.a.createElement(o.P,{src:"assets/img/avatars/6.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}))),r.a.createElement(o.D,{className:"pt-0",placement:"bottom-end"},r.a.createElement(o.C,{header:!0,tag:"div",color:"light",className:"text-center"},r.a.createElement("strong",null,"Account")),r.a.createElement(o.C,{onClick:this.onAccountLogout},r.a.createElement(i.a,{name:"cil-account-logout",className:"mr-2"})," Logout")))}},{key:"render",value:function(){var e=this.props,a=e.notif,t=e.accnt,l=e.tasks,s=e.mssgs;return a?this.dropNotif():t?this.dropAccnt():l?this.dropTasks():s?this.dropMssgs():null}}]),t}(m.Component);g.defaultProps={notif:!1,accnt:!1,tasks:!1,mssgs:!1};var p=Object(E.i)(g),N=t(901),v=t.n(N),b=function(e){Object(n.a)(t,e);var a=Object(c.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){var e=this.props,a=e.toggleSidebarMobile,t=e.toggleSidebar,l=(e.toggleAside,e.toggleTheme);return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.Qb,{inHeader:!0,className:"ml-md-3 d-lg-none",onClick:a}),r.a.createElement(o.Qb,{inHeader:!0,className:"ml-3 d-md-down-none",onClick:t}),r.a.createElement(o.N,{className:"mx-auto d-lg-none",to:"/"},r.a.createElement(i.a,{src:v.a,height:"48",alt:"Logo"})),r.a.createElement(o.O,{className:"d-md-down-none mr-auto"}),r.a.createElement(o.O,null,r.a.createElement(o.Qb,{inHeader:!0,className:"ml-3 d-md-down-none",onClick:l,title:"Toggle Light/Dark Mode"},r.a.createElement(i.a,{name:"cil-moon",className:"c-d-dark-none",alt:"CoreUI Icons Moon"}),r.a.createElement(i.a,{name:"cil-sun",className:"c-d-default-none",alt:"CoreUI Icons Sun"})),r.a.createElement(p,{accnt:!0})),r.a.createElement(o.Gb,{className:"px-3 justify-content-between"},r.a.createElement(o.e,{className:"border-0 c-subheader-nav m-0 px-0 px-md-3",routes:d.a})))}}]),t}(m.Component);b.defaultProps={};a.default=b},901:function(e,a,t){e.exports=t.p+"static/media/coreui-pro-base.97bb9369.svg"}}]);
//# sourceMappingURL=25.437caaf0.chunk.js.map