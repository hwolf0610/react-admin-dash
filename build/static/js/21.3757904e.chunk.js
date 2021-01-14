(this["webpackJsonp@coreui/coreui-pro-react-admin-template"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template"]||[]).push([[21],{1087:function(e,a,t){"use strict";t.r(a);var r=t(150),n=t(151),l=t(155),s=t(152),m=t(153),i=t(161),o=t(160),c=t(2),u=t.n(c),d=t(493),p=t(1344),h=t(1095),f=(t(1129),function(e){return h.object().shape({firstName:h.string().min(2,"First name has to be at least 2 characters").required("First name is required"),lastName:h.string().min(1,"Last name has to be at least 1 character").required("Last name is required"),userName:h.string().min(5,"Username has to be at least 5 characters").required("Username is required"),email:h.string().email("Invalid email address").required("Email is required!"),password:h.string().min(6,"Password has to be at least ".concat(6," characters!")).matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,"Password must contain: numbers, uppercase and lowercase letters\n").required("Password is required"),confirmPassword:h.string().oneOf([e.password],"Passwords must match").required("Password confirmation is required"),accept:h.bool().required("* required").test("accept","You have to accept our Terms and Conditions!",(function(e){return!0===e}))})}),E=function(e){return e.inner.reduce((function(e,a){return Object(o.a)({},e,Object(i.a)({},a.path,a.errors[0]))}),{})},N={firstName:"",lastName:"",userName:"",email:"",password:"",confirmPassword:"",accept:!1},b=function(e,a){var t=a.setSubmitting;a.setErrors;setTimeout((function(){alert(JSON.stringify(e,null,2)),t(!1)}),2e3)},v=function(e){Object(m.a)(t,e);var a=Object(s.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).touchAll=n.touchAll.bind(Object(l.a)(n)),n}return Object(n.a)(t,[{key:"findFirstError",value:function(e,a){for(var t=document.forms[e],r=0;r<t.length;r++)if(a(t[r].name)){t[r].focus();break}}},{key:"validateForm",value:function(e){this.findFirstError("simpleForm",(function(a){return Boolean(e[a])}))}},{key:"touchAll",value:function(e,a){e({firstName:!0,lastName:!0,userName:!0,email:!0,password:!0,confirmPassword:!0,accept:!0}),this.validateForm(a)}},{key:"render",value:function(){var e,a=this;return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(d.j,null,u.a.createElement(d.n,null,"Form Validation",u.a.createElement("a",{href:"https://coreui.io/pro/react/",className:"badge badge-danger ml-1"},"CoreUI Pro Component"),u.a.createElement("div",{className:"card-header-actions"},u.a.createElement("a",{className:"card-header-action",href:"https://github.com/jaredpalmer/formik",target:"_blank",rel:"noreferrer noopener"},u.a.createElement("small",{className:"text-muted"},"docs")))),u.a.createElement(d.k,null,u.a.createElement("a",{href:"https://github.com/jaredpalmer/formik",target:"_blank",rel:"noreferrer noopener"},"Formik")," ",u.a.createElement("cite",null,"Build forms in React, without the tears")," with ",u.a.createElement("a",{href:"https://github.com/jquense/yup",target:"_blank",rel:"noreferrer noopener"},"Yup")," ",u.a.createElement("cite",null,"Dead simple Object schema validation"),u.a.createElement("hr",null),u.a.createElement(p.a,{initialValues:N,validate:(e=f,function(a){var t=e(a);try{return t.validateSync(a,{abortEarly:!1}),{}}catch(r){return E(r)}}),onSubmit:b,render:function(e){var t=e.values,r=e.errors,n=e.touched,l=(e.status,e.dirty,e.handleChange),s=e.handleBlur,m=e.handleSubmit,i=e.isSubmitting,o=e.isValid,c=e.handleReset,p=e.setTouched;return u.a.createElement(d.wb,null,u.a.createElement(d.u,{lg:"6"},u.a.createElement(d.J,{onSubmit:m,noValidate:!0,name:"simpleForm"},u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"firstName"},"First Name"),u.a.createElement(d.Q,{type:"text",name:"firstName",id:"firstName",placeholder:"First Name",autoComplete:"given-name",valid:!r.firstName,invalid:n.firstName&&!!r.firstName,autoFocus:!0,required:!0,onChange:l,onBlur:s,value:t.firstName}),u.a.createElement(d.Y,null,r.firstName)),u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"lastName"},"Last Name"),u.a.createElement(d.Q,{type:"text",name:"lastName",id:"lastName",placeholder:"Last Name",autoComplete:"family-name",valid:!r.lastName,invalid:n.lastName&&!!r.lastName,required:!0,onChange:l,onBlur:s,value:t.lastName}),u.a.createElement(d.Y,null,r.lastName)),u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"userName"},"User Name"),u.a.createElement(d.Q,{type:"text",name:"userName",id:"userName",placeholder:"User Name",autoComplete:"username",valid:!r.userName,invalid:n.userName&&!!r.userName,required:!0,onChange:l,onBlur:s,value:t.userName}),u.a.createElement(d.Y,null,r.userName)),u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"email"},"Email"),u.a.createElement(d.Q,{type:"email",name:"email",id:"email",placeholder:"Email",autoComplete:"email",valid:!r.email,invalid:n.email&&!!r.email,required:!0,onChange:l,onBlur:s,value:t.email}),u.a.createElement(d.Y,null,r.email)),u.a.createElement(d.wb,null,u.a.createElement(d.u,{md:6},u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"password"},"Password"),u.a.createElement(d.Q,{type:"password",name:"password",id:"password",placeholder:"Password",autoComplete:"new-password",valid:!r.password,invalid:n.password&&!!r.password,required:!0,onChange:l,onBlur:s,value:t.password}),u.a.createElement(d.Y,null,r.password))),u.a.createElement(d.u,{md:6},u.a.createElement(d.K,null,u.a.createElement(d.ab,{htmlFor:"confirmPassword"},"Password"),u.a.createElement(d.Q,{type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Confirm password",autoComplete:"new-password",valid:!r.confirmPassword,invalid:n.confirmPassword&&!!r.confirmPassword,required:!0,onChange:l,onBlur:s,value:t.confirmPassword}),u.a.createElement(d.Y,null,r.confirmPassword)))),u.a.createElement(d.K,{variant:"custom-checkbox",className:"pb-3"},u.a.createElement(d.R,{custom:!0,id:"accept",required:!0,valid:!r.accept,invalid:n.accept&&!!r.accept,onChange:l,onBlur:s}),u.a.createElement(d.ab,{variant:"custom-checkbox",htmlFor:"accept"},"I accept the terms of use"),u.a.createElement(d.Y,null,r.accept)),u.a.createElement(d.K,null,u.a.createElement(d.f,{type:"submit",color:"primary",className:"mr-1",disabled:i||!o},i?"Wait...":"Submit"),u.a.createElement(d.f,{type:"button",color:"success",className:"mr-1",onClick:function(){return a.touchAll(p,r)},disabled:o},"Validate"),u.a.createElement(d.f,{type:"reset",color:"danger",className:"mr-1",onClick:c},"Reset")))),u.a.createElement(d.u,{lg:"6"},u.a.createElement(d.j,{color:o?"gradient-info":"gradient-secondary"},u.a.createElement(d.k,null,u.a.createElement("pre",null,"values: ",JSON.stringify(t,null,2)),u.a.createElement("pre",null,"errors: ",JSON.stringify(r,null,2)),u.a.createElement("pre",null,"touched: ",JSON.stringify(n,null,2))))))}}))))}}]),t}(u.a.Component);a.default=v},1129:function(e,a,t){}}]);
//# sourceMappingURL=21.3757904e.chunk.js.map