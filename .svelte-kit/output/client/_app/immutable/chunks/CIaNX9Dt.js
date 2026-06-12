import"./CWj6FrbW.js";import"./69_IOA4Y.js";import{p as Be,g as Ie,m as C,o as Fe,l as r,k as l,v as Ve,w as se,x as je,y as Ne,f as z,c as w,r as v,n as Z,t as ce,A as J,a as A,d as Oe,q as le,b as Ue,s as Ge,e as P,B as de,ab as $e}from"./C2nA3pgh.js";import{i as He}from"./C-bTUrpv.js";import{e as Xe,i as Ke}from"./Bf5DTlK8.js";import{s as W,b as Ze}from"./sOk58fe6.js";import{b as Je}from"./C_guK841.js";import{i as Pe}from"./93KRqSnc.js";import{p as h}from"./Cw3zEkWF.js";import{t as q}from"./D4UaXR_u.js";import{c as Qe,b as Ye}from"./D8RFyiHr.js";import{l as et}from"./C1syeAZX.js";import{t as tt}from"./BXC3wgRp.js";import{X as rt}from"./C-Aam6GL.js";import{d as fe}from"./AoanbIlI.js";import{l as ot}from"./D_W3pTeS.js";var at=z('<div class="flex items-center h-full"><div></div></div>'),it=z(`<div class=" text-gray-500 rounded-full cursor-not-allowed"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><style>.spinner_OSmW {
								transform-origin: center;
								animation: spinner_T6mA 0.75s step-end infinite;
							}
							@keyframes spinner_T6mA {
								8.3% {
									transform: rotate(30deg);
								}
								16.6% {
									transform: rotate(60deg);
								}
								25% {
									transform: rotate(90deg);
								}
								33.3% {
									transform: rotate(120deg);
								}
								41.6% {
									transform: rotate(150deg);
								}
								50% {
									transform: rotate(180deg);
								}
								58.3% {
									transform: rotate(210deg);
								}
								66.6% {
									transform: rotate(240deg);
								}
								75% {
									transform: rotate(270deg);
								}
								83.3% {
									transform: rotate(300deg);
								}
								91.6% {
									transform: rotate(330deg);
								}
								100% {
									transform: rotate(360deg);
								}
							}</style><g class="spinner_OSmW"><rect x="11" y="1" width="2" height="5" opacity=".14"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"></rect><rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)"></rect></g></svg></div>`),nt=z('<button id="confirm-recording-button" type="button" class="p-1.5 bg-indigo-500 text-white dark:bg-indigo-500 dark:text-blue-950 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"></path></svg></button>'),st=z('<div><div class="flex items-center mr-1"><button type="button"><!></button></div> <div class="flex flex-1 self-center items-center justify-between ml-2 mx-1 overflow-hidden h-6" dir="rtl"><div class="flex items-center gap-0.5 h-6 w-full max-w-full overflow-hidden overflow-x-hidden flex-wrap"></div></div> <div class="flex"><div class="  mx-1.5 pr-1 flex justify-center items-center"><div> </div></div> <div class="flex items-center"><!></div></div></div>');function St(ue,u){Be(u,!1);const Q=()=>P(Qe,"$config",F),B=()=>P(Ye,"$settings",F),I=()=>P(me,"$i18n",F),[F,ge]=Ge();fe.extend(ot);const me=Ie("i18n");let g=h(u,"recording",12,!1),Y=h(u,"transcribe",8,!0),ve=h(u,"displayMedia",8,!1),pe=h(u,"echoCancellation",8,!0),we=h(u,"noiseSuppression",8,!0),he=h(u,"autoGainControl",8,!0),ye=h(u,"className",8," p-2.5 w-full max-w-full"),V=h(u,"onCancel",8,()=>{}),j=h(u,"onConfirm",8,e=>{}),c=C(!1),L=!1,R=C(0),N=null,O="";const be=()=>{N=setInterval(()=>{$e(R)},1e3)},ke=()=>{clearInterval(N),l(R,0)},xe=e=>{const t=Math.floor(e/60),o=e%60,a=o<10?`0${o}`:o;return`${t}:${a}`};let _=null;const ee=async()=>{if("wakeLock"in navigator)try{_=await navigator.wakeLock.request("screen"),_.addEventListener("release",()=>{})}catch{}},U=async()=>{if(_){try{await _.release()}catch{}_=null}};let f,p,m,x=[];const _e=-45;let b=300,n=C(Array(b).fill(0));const Se=e=>{let t=0;for(let o=0;o<e.length;o++){const a=(e[o]-128)/128;t+=a*a}return Math.sqrt(t/e.length)},Me=e=>{e=e*10;const o=Math.pow(e,1.5);return Math.min(1,Math.max(.01,o))},Ce=e=>{const t=new AudioContext,o=t.createMediaStreamSource(e),a=t.createAnalyser();a.minDecibels=_e,o.connect(a);const i=a.frequencyBinCount,s=new Uint8Array(i),d=new Uint8Array(a.fftSize);(()=>{const y=()=>{if(!(!g()||r(c))){if(g()&&!r(c)){a.getByteTimeDomainData(d),a.getByteFrequencyData(s);const D=Se(d);r(n).push(Me(D)),r(n).length>=b&&r(n).shift(),l(n,r(n))}window.requestAnimationFrame(y)}};window.requestAnimationFrame(y)})()},Le=async(e,t="wav")=>{var a,i,s,d,k,y;await de();const o=et(e,`Recording-${fe().format("L LT")}.${t}`);if(Y()){if(Q().audio.stt.engine==="web"||(((s=(i=(a=B())==null?void 0:a.audio)==null?void 0:i.stt)==null?void 0:s.engine)??"")==="web")return;const D=await tt(localStorage.token,o,(y=(k=(d=B())==null?void 0:d.audio)==null?void 0:k.stt)==null?void 0:y.language).catch(ze=>(q.error(`${ze}`),null));D&&j()(D)}else j()({file:o,blob:e})},Re=async()=>{var t,o,a;l(c,!0);try{if(ve()){const i=await navigator.mediaDevices.getDisplayMedia({audio:!0});f=new MediaStream;for(const s of i.getAudioTracks())f.addTrack(s);for(const s of i.getVideoTracks())s.stop()}else f=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:pe(),noiseSuppression:we(),autoGainControl:he()}})}catch{q.error(I().t("Error accessing media devices.")),l(c,!1),g(!1);return}const e=["audio/webm; codecs=opus","audio/webm","audio/ogg; codecs=opus","audio/mp4","audio/wav"];m=new MediaRecorder(f,{mimeType:e.find(i=>MediaRecorder.isTypeSupported(i))}),m.onstart=async()=>{l(c,!1),be(),await ee(),x=[],Ce(f)},m.ondataavailable=i=>x.push(i.data),m.onstop=async()=>{var i;if(L){let s=((i=x[0])==null?void 0:i.type)||m.mimeType||"audio/webm",d=s.split("/")[1].split(";")[0]||"webm";s.startsWith("audio/")||(d="webm");const k=new Blob(x,{type:s});await Le(k,d),L=!1,l(c,!1)}x=[],g(!1)};try{m.start()}catch{q.error(I().t("Error starting recording.")),l(c,!1),g(!1);return}if(Y()&&(Q().audio.stt.engine==="web"||(((a=(o=(t=B())==null?void 0:t.audio)==null?void 0:o.stt)==null?void 0:a.engine)??"")==="web")&&("SpeechRecognition"in window||"webkitSpeechRecognition"in window)){p=new(window.SpeechRecognition||window.webkitSpeechRecognition),p.continuous=!0;const i=2e3;let s;p.start(),p.onresult=async d=>{var y;clearTimeout(s);const k=d.results[Object.keys(d.results).length-1][0].transcript;O=`${O}${k}`,await de(),(y=document.getElementById("chat-input"))==null||y.focus(),s=setTimeout(()=>{p.stop()},i)},p.onend=function(){te(),j()({text:O}),L=!1,l(c,!1)},p.onerror=function(d){q.error(I().t("Speech recognition error: {{error}}",{error:d.error})),V()(),E()}}},E=async()=>{g()&&m&&await m.stop(),p&&p.stop(),await U(),ke(),x=[],l(n,Array(b).fill(0)),f&&f.getTracks().forEach(t=>t.stop()),f=null},te=async()=>{l(c,!0),L=!0,g()&&m&&await m.stop(),clearInterval(N),await U(),f&&f.getTracks().forEach(t=>t.stop()),f=null};let G,$=C(),Ee=C(300);const re=e=>{e.key==="Escape"&&(e.preventDefault(),E(),V()())},oe=async()=>{g()&&document.visibilityState==="visible"&&await ee()};Fe(()=>{window.addEventListener("keydown",re),document.addEventListener("visibilitychange",oe),G=new ResizeObserver(()=>{b=Math.floor(window.innerWidth/4),r(n).length>b?l(n,r(n).slice(r(n).length-b)):l(n,Array(b-r(n).length).fill(0).concat(r(n)))}),G.observe(document.body)}),Ve(()=>{window.removeEventListener("keydown",re),document.removeEventListener("visibilitychange",oe),U(),G.disconnect()}),se(()=>je(g()),()=>{g()?Re():E()}),se(()=>r($),()=>{l(Ee,Math.floor(r($)/5))}),Ne(),Pe();var S=st(),H=w(S),T=w(H),Te=w(T);rt(Te,{className:"size-4"}),v(T),v(H);var M=Z(H,2),ae=w(M);Xe(ae,5,()=>(r(n),J(()=>r(n).slice().reverse())),Ke,(e,t)=>{var o=at(),a=w(o);v(o),ce(i=>{W(a,1,`w-[2px] shrink-0
                    
                    ${r(c)?" bg-gray-500 dark:bg-gray-400   ":"bg-indigo-500 dark:bg-indigo-400  "} 
                    
                    inline-block h-full`),Ze(a,`height: ${i??""}%;`)},[()=>(r(t),J(()=>Math.min(100,Math.max(14,r(t)*100))))]),A(e,o)}),v(ae),v(M);var ie=Z(M,2),X=w(ie),K=w(X),De=w(K,!0);v(K),v(X);var ne=Z(X,2),Ae=w(ne);{var We=e=>{var t=it();A(e,t)},qe=e=>{var t=nt();le("click",t,async()=>{await te()}),A(e,t)};He(Ae,e=>{r(c)?e(We):e(qe,-1)})}v(ne),v(ie),v(S),ce(e=>{W(S,1,`${r(c)?" bg-gray-100/50 dark:bg-gray-850/50":"bg-indigo-300/10 dark:bg-indigo-500/10 "} rounded-full flex justify-between ${ye()??""}`,"svelte-nkn4fu"),W(T,1,`p-1.5

            ${r(c)?" bg-gray-200 dark:bg-gray-700/50":"bg-indigo-400/20 text-indigo-600 dark:text-indigo-300 "} 


             rounded-full`),M.dir=M.dir,W(K,1,`text-sm
        
        
        ${r(c)?" text-gray-500  dark:text-gray-400  ":" text-indigo-400 "} 
       font-medium flex-1 mx-auto text-center`),Oe(De,e)},[()=>(r(R),J(()=>xe(r(R))))]),le("click",T,async()=>{E(),V()()}),Je(S,"clientWidth",e=>l($,e)),A(ue,S),Ue(),ge()}export{St as V};
