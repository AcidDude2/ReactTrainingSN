(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[687],{5687:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return T}});var t=r(5671),s=r(3144),o=r(136),i=r(516),a=r(2791),l=r(5987),u="User_userBlock__3LOf8",c="User_userPhoto__NZyZG",p=r(4353),f=r(1087),g=r(184),d=function(e){var n=e.user,r=e.followingInProgress,t=e.follow,s=e.unfollow;return(0,g.jsxs)("div",{className:u,children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("div",{children:(0,g.jsx)(f.OL,{to:"./../profile/"+n.id,children:(0,g.jsx)("img",{src:null!=n.photos.small?n.photos.small:p,className:c})})}),(0,g.jsx)("div",{children:n.followed?(0,g.jsx)("button",{disabled:r.some((function(e){return e===n.id})),onClick:function(){s(n.id)},children:"Unfollow"}):(0,g.jsx)("button",{disabled:r.some((function(e){return e===n.id})),onClick:function(){t(n.id)},children:"Follow"})})]}),(0,g.jsxs)("span",{children:[(0,g.jsxs)("span",{children:[(0,g.jsx)("div",{children:n.name}),(0,g.jsx)("div",{children:n.status})]}),(0,g.jsxs)("span",{children:[(0,g.jsx)("div",{children:"user.location.cityName"}),(0,g.jsx)("div",{children:"user.location.countryName"})]})]})]})},h=r(4942),j=r(9439),P="Paginator_paginator__+d78J",v="Paginator_pageNumber__-EcLD",x="Paginator_selectedPage__dsOrR",m=r(5947),y=r.n(m),w=function(e){for(var n=e.totalItemsCount,r=e.onPageChanged,t=e.currentPage,s=e.pageSize,o=e.portionSize,i=void 0===o?10:o,l=Math.ceil(n/s),u=[],c=1;c<=l;c++)u.length<=100&&u.push(c);var p=Math.ceil(l/i),f=(0,a.useState)(Math.ceil(t/i)),d=(0,j.Z)(f,2),m=d[0],w=d[1],b=(m-1)*i+1,C=m*i;return(0,g.jsxs)("div",{class:P,children:[m>1&&(0,g.jsx)("button",{onClick:function(){w(m-1)},children:"PREV"}),u.filter((function(e){return e>=b&&e<=C})).map((function(e){return(0,g.jsx)("span",{className:y()((0,h.Z)({},x,t===e),v),onClick:function(n){r(e)},children:e},e)})),p>m&&(0,g.jsx)("button",{onClick:function(){w(m+1)},children:"NEXT"})]})},b=["currentPage","totalUsersCount","pageSize","onPageChanged","users"],C=function(e){var n=e.currentPage,r=e.totalUsersCount,t=e.pageSize,s=e.onPageChanged,o=e.users,i=(0,l.Z)(e,b);return(0,g.jsxs)("div",{children:[(0,g.jsx)(w,{currentPage:n,onPageChanged:s,totalItemsCount:r,pageSize:t}),(0,g.jsx)("div",{children:o.map((function(e){return(0,g.jsx)(d,{user:e,followingInProgress:i.followingInProgress,follow:i.follow,unfollow:i.unfollow},e.id)}))})]})},k=r(8687),_=r(6155),S=function(e){return e.usersPage.users},Z=function(e){return e.usersPage.pageSize},O=function(e){return e.usersPage.totalUsersCount},U=function(e){return e.usersPage.currentPage},z=function(e){return e.usersPage.isFetching},N=function(e){return e.usersPage.followingInProgress},I=r(8570),q=function(e){(0,o.Z)(r,e);var n=(0,i.Z)(r);function r(){var e;(0,t.Z)(this,r);for(var s=arguments.length,o=new Array(s),i=0;i<s;i++)o[i]=arguments[i];return(e=n.call.apply(n,[this].concat(o))).onPageChanged=function(n){var r=e.props.pageSize;e.props.requestUsers(n,r)},e}return(0,s.Z)(r,[{key:"componentDidMount",value:function(){var e=this.props,n=e.currentPage,r=e.pageSize;this.props.requestUsers(n,r)}},{key:"render",value:function(){return(0,g.jsx)(g.Fragment,{children:this.props.isFetching?(0,g.jsx)(I.Z,{}):(0,g.jsx)(C,{totalUsersCount:this.props.totalUsersCount,onPageChanged:this.onPageChanged,currentPage:this.props.currentPage,pageSize:this.props.pageSize,users:this.props.users,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress})})}}]),r}(a.Component),T=(0,k.$j)((function(e){return{users:S(e),pageSize:Z(e),totalUsersCount:O(e),currentPage:U(e),isFetching:z(e),followingInProgress:N(e)}}),{follow:_.ZN,unfollow:_.fv,requestUsers:_.D7})(q)},5947:function(e){function n(){var e={},r={},t="";function s(r){n.each(r.split(" "),(function(n){e[n]=!!n}))}return n.each([].slice.call(arguments),(function(e){switch(n.getType(e)){case"string":case"number":s(e);break;case"array":s(n.apply(null,e));break;case"element":s(n(e.className||""));break;case"nodelist":s(n.apply(null,[].slice.call(e)));break;case"jquery":s(n.apply(null,e.get()));break;case"object":r=n.extend(r,e)}})),e=n.extend(e,r),n.each(e,(function(e,n){e&&(t+=" "+n)})),t.substr(1)}n.setTo=function(e){var r=n.getType(e);return"element"===r&&(e=[e]),"jquery"===r&&(e=e.get()),"nodelist"===r&&(e=[].slice.call(e)),function(){var r=n.apply(null,arguments);n.each(e,(function(e){e.className=r}))}},n.each=function(e,r){var t=n.getType(e);if("array"===t)for(var s=0;s<e.length;s++)r(e[s],s);if("object"===t)for(var o in e)r(e[o],o)},n.getType=function(e){var n=Object.prototype.toString.call(e).slice(8,-1).toLowerCase();return"object"===n&&e.jquery?"jquery":n.indexOf("element")>1?"element":n},n.extend=function(e,r){var t={},s=[e,r];return n.each(s,(function(e){n.each(e,(function(n,r){e.hasOwnProperty(r)&&(t[r]=n)}))})),t},e.exports&&(e.exports=n)},4353:function(e,n,r){"use strict";e.exports=r.p+"static/media/user.25558adea84bbfb81666.png"},5987:function(e,n,r){"use strict";r.d(n,{Z:function(){return s}});var t=r(3366);function s(e,n){if(null==e)return{};var r,s,o=(0,t.Z)(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(s=0;s<i.length;s++)r=i[s],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}}}]);
//# sourceMappingURL=687.ec1501f1.chunk.js.map