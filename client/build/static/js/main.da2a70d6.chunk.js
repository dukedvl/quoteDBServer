(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{61:function(e,t,n){e.exports=n(74)},66:function(e,t,n){},67:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(8),o=n(41),l=(n(66),n(30)),c=n(31),i=n(37),s=n(38),m=n(21),d=(n(67),n(19)),p=n.n(d),f=n(29),h=n(24),E=n(100),b=n(104),v=n(105),y=n(113),g=n(106),O=n(107),j=n(108),Q=n(109),q=n(111),w=n(110),x=n(112),k=n(0),B=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).getQuotes=a.getQuotes.bind(Object(h.a)(a)),a.postQuote=a.postQuote.bind(Object(h.a)(a)),a.deleteQuote=a.deleteQuote.bind(Object(h.a)(a)),a.state={quoteList:[{}]},a}return Object(c.a)(n,[{key:"getQuotes",value:function(){var e=Object(f.a)(p.a.mark((function e(){var t,n=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"get"},e.next=3,fetch("/api/quotes",t).then((function(e){return e.json()})).then((function(e){n.setState({quoteList:e})}));case 3:console.log("list of quotes:"+JSON.stringify(this.state.quoteList));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(f.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getQuotes();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"postQuote",value:function(){var e=Object(f.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!==this.refs.author&&""!==this.refs.quote){e.next=3;break}return e.abrupt("return");case 3:return n={author:document.getElementById("author").value,quote:document.getElementById("quote").value},e.next=6,fetch("/api/quotes",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 6:return e.next=8,this.getQuotes();case 8:document.getElementById("author").value="",document.getElementById("quote").value="";case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteQuote",value:function(){var e=Object(f.a)(p.a.mark((function e(t,n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("api/quotes/".concat(n),{method:"delete"});case 2:return e.next=4,this.getQuotes();case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return k.createElement("div",{className:"App"},k.createElement(E.a,{position:"static",className:"AppBar"},k.createElement(b.a,null,k.createElement(v.a,{variant:"h6"},"Inspirational Quotes!"))),k.createElement("table",null,k.createElement("tbody",null,k.createElement("tr",null,k.createElement("td",{width:"200"}),k.createElement("td",null,k.createElement("div",{align:"center",position:"top"},k.createElement("form",{autoComplete:"off",noValidate:!0,onSubmit:this.postQuote},k.createElement(y.a,{variant:"outlined",id:"author",required:!0,label:"Author",defaultValue:"Bard"})," ",k.createElement("br",null),k.createElement("br",null),k.createElement(y.a,{variant:"outlined",id:"quote",multiline:!0,required:!0,rowsMax:"5",type:"text",label:"Quote",defaultValue:"A bear has a long long tail--"})," ",k.createElement("br",null),k.createElement("br",null),k.createElement(g.a,{variant:"contained",color:"primary",type:"submit"},"Add Quote")))),k.createElement("td",{width:"300"}),k.createElement("td",null,k.createElement("div",{align:"left"},Array.from(this.state.quoteList).map((function(t,n){return k.createElement(O.a,{variant:"outlined",className:"Card",key:n},k.createElement(j.a,null,k.createElement(v.a,{variant:"body2",color:"textSecondary",gutterBottom:!0},"Added: ",new Date(new Date(t.timestamp)-60*new Date(t.timestamp).getTimezoneOffset()*1e3).toString("yyyy, MMM dd hh:mm:ss")),k.createElement(v.a,{paragraph:!0},t.quote),k.createElement(v.a,{variant:"subtitle2"},"-",t.author),k.createElement(Q.a,{"disable-spacing":"true"},k.createElement(w.a,null),k.createElement(q.a,{onClick:function(n){e.deleteQuote(n,t.id)}},k.createElement(x.a,null)))))}))))))))}}]),n}(k.Component),A=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=function(){return r.a.createElement("div",null,r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/",component:B})))};return r.a.createElement(m.c,null,r.a.createElement(e,null))}}]),n}(a.Component);Object(u.render)(r.a.createElement(o.a,null,r.a.createElement(A,null)),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.da2a70d6.chunk.js.map