"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[318],{7318:function(t,s,e){e.r(s),e.d(s,{default:function(){return M}});var r=e(2791),n="ProfileInfo_descriptionBlock__k4HM9",o="ProfileInfo_profilePhoto__0KZnC",i=e(8570),u=e(4353),a=e(9439),c=e(184),l=function(t){var s=(0,r.useState)(!1),e=(0,a.Z)(s,2),n=e[0],o=e[1],i=(0,r.useState)(t.status),u=(0,a.Z)(i,2),l=u[0],d=u[1];(0,r.useEffect)((function(){d(t.status)}),[t.status]);return(0,c.jsxs)("div",{children:[!n&&(0,c.jsx)("div",{children:(0,c.jsx)("span",{onDoubleClick:function(){o(!0)},children:t.status||"-----"})}),n&&(0,c.jsx)("div",{children:(0,c.jsx)("input",{onChange:function(t){d(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),t.updateStatus(l)},value:l})})]})},d=function(t){var s=t.profile,e=t.status,r=t.updateStatus;return s?(0,c.jsxs)("div",{children:[(0,c.jsx)("img",{src:"https://bogatyr.club/uploads/posts/2023-01/thumbs/1674852902_bogatyr-club-p-zvezdnoe-nebo-fon-fon-vkontakte-2.jpg",alt:"content_picture",height:360,width:985}),(0,c.jsxs)("div",{className:n,children:[(0,c.jsx)("img",{src:null!=s.photos.large?s.photos.large:u,className:o}),(0,c.jsx)("div",{children:s.fullName}),(0,c.jsx)("div",{children:(0,c.jsx)(l,{status:e,updateStatus:r})})]}),(0,c.jsx)("div",{children:s.aboutMe})]}):(0,c.jsx)(i.Z,{})},p=e(1755),f=e(3433),h="MyPosts_postsBlock__Ce03M",x="MyPosts_posts__E0dhm",m="Post_item__Vjz2+",j=function(t){return(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:m,children:[(0,c.jsx)("img",{src:"https://cs10.pikabu.ru/post_img/big/2019/11/11/10/1573494458145017681.png"}),t.message,(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{children:"like"})," ",t.likes_counter]})]})})},v=e(6139),g=e(704),_=e(8661),Z=e(7492),P=(0,_.D)(10),b=(0,g.Z)({form:"profileAddPostForm"})((function(t){return(0,c.jsxs)("form",{onSubmit:t.handleSubmit,children:[(0,c.jsx)("div",{children:(0,c.jsx)(v.Z,{placeholder:"Enter post text",name:"newPostText",component:Z.N,child:"textarea",validate:[_.C,P]})}),(0,c.jsx)("div",{children:(0,c.jsx)("button",{children:"Add Post"})})]})})),C=r.memo((function(t){var s=(0,f.Z)(t.posts).reverse().map((function(t){return(0,c.jsx)(j,{message:t.message,likes_counter:t.likesCount})}));return(0,c.jsxs)("div",{className:h,children:[(0,c.jsx)("h3",{children:"My posts"}),(0,c.jsx)("div",{children:(0,c.jsx)(b,{onSubmit:function(s){t.addPost(s.newPostText)}})}),(0,c.jsx)("div",{className:x,children:s})]})})),S=e(8687),k=(0,S.$j)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(s){t((0,p.Wl)(s))}}}))(C),y=function(t){return(0,c.jsxs)("div",{children:[(0,c.jsx)(d,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,c.jsx)(k,{})]})},F=e(7689),A=e(5927),N=e(7781),E=e(2537);var M=(0,N.qC)(E.E,A.D,(0,S.$j)((function(t){return{profile:t.profilePage.profile,isFetching:t.profilePage.isFetching,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getUserProfile:p.et,getStatus:p.lR,updateStatus:p.Nf}))((function(t){var s=(0,F.UO)().userId;return s||(s=t.authorizedUserId),(0,r.useEffect)((function(){t.getUserProfile(s)}),[s]),(0,r.useEffect)((function(){t.getStatus(s)}),[s]),(0,c.jsx)(c.Fragment,{children:t.isFetching?(0,c.jsx)(i.Z,{}):(0,c.jsx)(y,{profile:t.profile,status:t.status,updateStatus:t.updateStatus})})}))},7492:function(t,s,e){e.d(s,{G:function(){return l},N:function(){return c}});var r=e(1413),n=e(5987),o=(e(2791),e(9234)),i=e(6139),u=e(184),a=["input","meta"],c=function(t){var s=t.input,e=t.meta,i=(0,n.Z)(t,a),c=e.touched&&e.error;return(0,u.jsxs)("div",{className:"".concat(o.Z.formControl," ").concat(c&&o.Z.error),children:[(0,u.jsx)("div",{children:(0,u.jsx)(i.child,(0,r.Z)((0,r.Z)((0,r.Z)({},i),s),e))}),c&&(0,u.jsx)("span",{children:e.error})]})},l=function(t,s,e,n,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";return(0,u.jsxs)("div",{children:[(0,u.jsx)(i.Z,(0,r.Z)({placeholder:t,name:s,child:e,validate:n,component:o},a)),c]})}},8661:function(t,s,e){e.d(s,{C:function(){return r},D:function(){return n}});var r=function(t){if(!t)return"Field is required"},n=function(t){return function(s){if(s.length>t)return"Max length is ".concat(t," symbols")}}},5927:function(t,s,e){e.d(s,{D:function(){return f}});var r=e(1413),n=e(5671),o=e(3144),i=e(136),u=e(516),a=e(2791),c=e(8687),l=e(7689),d=e(184),p=function(t){return{isAuth:t.auth.isAuth}},f=function(t){var s=function(s){(0,i.Z)(a,s);var e=(0,u.Z)(a);function a(){return(0,n.Z)(this,a),e.apply(this,arguments)}return(0,o.Z)(a,[{key:"render",value:function(){return this.props.isAuth?(0,d.jsx)(t,(0,r.Z)({},this.props)):(this.props.isAuth||this.props.router)&&(this.props.isAuth||this.props.router.params.userId)?!this.props.isAuth&&this.props.router.params.userId?(0,d.jsx)(t,(0,r.Z)({},this.props)):void 0:(0,d.jsx)(l.Fg,{to:"/login"})}}]),a}(a.Component);return(0,c.$j)(p,{})(s)}},9234:function(t,s){s.Z={formControl:"FormsControls_formControl__EUGJ+",error:"FormsControls_error__srujM",formSummaryError:"FormsControls_formSummaryError__AKM+F"}},4353:function(t,s,e){t.exports=e.p+"static/media/user.25558adea84bbfb81666.png"}}]);
//# sourceMappingURL=318.ad6e8caa.chunk.js.map