!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(5)},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(1),n(2),n(3),n(4);var o="input",c=".voice-icon",r=".one",i=".two",d=".three",l=".four",s=".search__recomand",a=".search__loader",u=".song-waiting",m="popular-btn",p="favoris-btn";function f(){return document.querySelector(o).value}function y(e,t){const n=document.querySelector(r),o=document.querySelector(i),c=document.querySelector(d),s=document.querySelector(l);for(let r=0;r<16;r++){let i=`\n        <div class="content__songs__col__songContainner">\n            <div class="song" data-img=${e[r].album.cover_medium} data-id=${e[r].id} style="background-image: url(${e[r].album.cover_medium});">\n                <audio src="${e[r].preview}"></audio>\n                <div class="icons">\n                    <img class="pause-btn" src="./img/img/play_circle_filled-24px.png" alt="">\n                    <img class="like-btn ${t}" src="./img/img/stars-24px.png" alt="">\n                </div>\n            </div>\n            <div class="title">${e[r].title}</div>\n        </div>\n        `;r<4?n.insertAdjacentHTML("beforeend",i):r>=4&&r<8?o.insertAdjacentHTML("beforeend",i):r>=8&&r<12?c.insertAdjacentHTML("beforeend",i):r>=12&&r<16&&s.insertAdjacentHTML("beforeend",i)}!function(){let e=document.querySelectorAll("audio");for(let t of e)t.addEventListener("timeupdate",()=>{t.currentTime===t.duration&&(t.nextElementSibling.childNodes[1].src="./img/img/play_circle_filled-24px.png")})}()}function g(){const e=document.querySelectorAll(r+" .content__songs__col__songContainner"),t=document.querySelectorAll(i+" .content__songs__col__songContainner"),n=document.querySelectorAll(d+" .content__songs__col__songContainner"),o=document.querySelectorAll(l+" .content__songs__col__songContainner");for(let t of e)t.parentNode.removeChild(t);for(let e of t)e.parentNode.removeChild(e);for(let e of n)e.parentNode.removeChild(e);for(let e of o)e.parentNode.removeChild(e)}function h(){document.querySelector(a).style.display="none"}function v(){document.querySelector(s).style.display="none"}class _{constructor(e){this.input=e}async getData(){const e={method:"get",headers:{"x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com","x-rapidapi-key":"f71b085143msh517af3594e3330dp1ae11ajsn2a02e5d9c963"}};try{const t=await(await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q="+this.input,e)).json();this.result=t.data}catch(e){console.log(e.message)}}}const S=document.querySelector(o);function k(){const e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.onresult=e=>{const t=e.resultIndex,n=e.results[t][0].transcript;S.value=n,function(e){const t=new SpeechSynthesisUtterance;t.text=e,t.volume=1,t.rate=.5,t.pitch=1,speechSynthesis.speak(t)}("You have just said"+n)},e.start()}const b={},N=document.getElementById(m),L=document.getElementById(p);async function q(){let e=f().trim();if(document.querySelector(o).value="",h(),g(),document.querySelector(u).style.display="initial",e.trim()){b.searchh=new _(e);try{await b.searchh.getData(),document.querySelector(u).style.display="none",y(b.searchh.result)}catch(e){console.log(e)}}else alert("filled not accepted!")}function w(e){let t=e.target;"pause-btn"===t.className&&(t.parentNode.parentNode.childNodes[1].paused?(t.src="./img/img/round_pause_circle_filled_white_18dp.png",t.parentNode.parentNode.childNodes[1].play()):(t.src="./img/img/play_circle_filled-24px.png",t.parentNode.parentNode.childNodes[1].pause()))}function E(e){const t=e.target;t.classList.contains("like-btn")&&(t.classList.contains("clicked")?(t.classList.remove("clicked"),b.likedItem.dltFromStorage(t.parentNode.parentNode.dataset.id)):(t.classList.add("clicked"),b.likedItem.addLiked(t.parentNode.parentNode.dataset.id,t.parentNode.parentNode.dataset.img,t.parentNode.parentNode.childNodes[1].currentSrc,t.parentNode.parentNode.nextElementSibling.textContent)))}function x(){document.querySelector(o).value="eminem",q(),document.addEventListener("click",w),document.addEventListener("click",E)}document.querySelector(o).addEventListener("input",(async function(){let e=f();if(function(){document.querySelector(a).style.display="initial"}(),e.trim()){b.searchh=new _(e);try{await b.searchh.getData(),function(e){const t=document.querySelectorAll(s+" p");for(let e of t)e.parentNode.removeChild(e);const n=document.querySelector(s);n.style.display="inline-block";for(let t=0;t<7&&!(t>=e.length);t++)n.insertAdjacentHTML("beforeend",`<p><span class="arrow">></span> ${e[t].title}</p>`)}(b.searchh.result),h(),document.querySelector(s).addEventListener("click",e=>{document.querySelector(o).value=e.target.childNodes[1].nodeValue,v(),q(),document.addEventListener("click",w),document.addEventListener("click",E)})}catch(e){console.log(e)}}})),document.addEventListener("keypress",e=>{13===e.keyCode&&(q(),document.addEventListener("click",w),document.addEventListener("click",E))}),document.querySelector(c).addEventListener("click",(function(){k();let e=setInterval(()=>{""!==document.querySelector(o).value&&(q(),clearInterval(e))},1e3);document.addEventListener("click",w)})),document.addEventListener("click",()=>v()),addEventListener("load",x),N.addEventListener("click",(function(){this.className="selected",L.classList.remove("selected"),x()})),L.addEventListener("click",(function(){N.classList.remove("selected"),this.className="selected",g(),y(JSON.parse(localStorage.getItem("likes")),"clicked")})),b.likedItem=new class{constructor(){this.likes=[]}addLiked(e,t,n,o){const c={id:e,album:{cover_medium:t},preview:n,title:o};this.likes.push(c),this.addToStorage()}addToStorage(){localStorage.setItem("likes",JSON.stringify(this.likes))}dltFromStorage(e){const t=this.likes.findIndex(t=>t.id===e);this.likes.splice(t,1),this.addToStorage()}}}]);