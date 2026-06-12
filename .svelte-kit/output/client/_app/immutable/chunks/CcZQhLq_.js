import"./CWj6FrbW.js";import"./69_IOA4Y.js";import{p as Ve,g as He,w as de,x as P,y as Oe,f as g,i as Ue,c as a,r,q as ue,a as _,l,u as k,n as d,t as y,A as n,e as We,m as M,k as b,d as f,b as je,s as ze,B as W}from"./C2nA3pgh.js";import{i as Le}from"./C-bTUrpv.js";import{r as j,a as z}from"./sOk58fe6.js";import{b as L}from"./B9kq-aJO.js";import{b as fe}from"./BPbEsnP1.js";import{p as Ge}from"./Bfc47y5P.js";import{i as Je}from"./93KRqSnc.js";import{p as h}from"./Cw3zEkWF.js";import{g as Ke}from"./BnxW8uz-.js";import{n as G,e as Qe,f as Re}from"./C1syeAZX.js";import{C as Xe}from"./B9moEl7K.js";import{C as Ye}from"./BLUdOI3z.js";import{B as Ze}from"./BJngHh6j.js";import{T as q}from"./DB1mSVu3.js";import{C as et}from"./Bjt7wO-F.js";var tt=g('<button class="w-full text-left text-sm py-1.5 px-1 rounded-lg dark:text-gray-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-gray-850" type="button"><!></button>'),at=g('<input class="w-full text-2xl font-medium bg-transparent outline-hidden font-primary" type="text" required=""/>'),rt=g('<div class="text-sm text-gray-500 shrink-0"> </div>'),it=g('<input class="w-full text-sm disabled:text-gray-500 bg-transparent outline-hidden" type="text" required=""/>'),st=g('<input class="w-full text-sm bg-transparent outline-hidden" type="text" required=""/>'),ot=g('<div class="text-sm text-gray-500"><div class=" bg-yellow-500/20 text-yellow-700 dark:text-yellow-200 rounded-lg px-4 py-3"><div> </div> <ul class=" mt-1 list-disc pl-4 text-xs"><li> </li> <li> </li></ul></div> <div class="my-3"> </div></div>'),nt=g('<div class=" flex flex-col justify-between w-full overflow-y-auto h-full"><div class="mx-auto w-full md:px-0 h-full"><form class=" flex flex-col max-h-[100dvh] h-full"><div class="flex flex-col flex-1 overflow-auto h-0 rounded-lg"><div class="w-full mb-2 flex flex-col gap-0.5"><div class="flex w-full items-center"><div class=" shrink-0 mr-2"><!></div> <div class="flex-1"><!></div> <div><!></div></div> <div class=" flex gap-2 px-1 items-center"><!> <!></div></div> <div class="mb-2 flex-1 overflow-auto h-0 rounded-lg"><!></div> <div class="pb-3 flex justify-between"><div class="flex-1 pr-3"><div class="text-xs text-gray-500 line-clamp-2"><span class=" font-semibold dark:text-gray-200"> </span> <br/>— <span class=" font-medium dark:text-gray-400"> </span></div></div> <button class="px-3.5 py-1.5 text-sm font-medium bg-black hover:bg-gray-900 text-white dark:bg-white dark:text-black dark:hover:bg-gray-100 transition rounded-full" type="submit"> </button></div></div></form></div></div> <!>',1);function Ft(ce,c){Ve(c,!1);const e=()=>We(pe,"$i18n",ve),[ve,me]=ze(),pe=He("i18n");let $=M(null),A=M(!1),_e=h(c,"onSave",8,()=>{}),x=h(c,"edit",8,!1),J=h(c,"clone",8,!1),w=h(c,"id",12,""),v=h(c,"name",12,""),m=h(c,"meta",28,()=>({description:""})),p=h(c,"content",12,""),F=M("");const he=()=>{b(F,p())};let I=M(),ge=`"""
title: Example Filter
author: open-webui
author_url: https://github.com/open-webui
funding_url: https://github.com/open-webui
version: 0.1
"""

from pydantic import BaseModel, Field
from typing import Optional


class Filter:
    class Valves(BaseModel):
        priority: int = Field(
            default=0, description="Priority level for the filter operations."
        )
        max_turns: int = Field(
            default=8, description="Maximum allowable conversation turns for a user."
        )
        pass

    class UserValves(BaseModel):
        max_turns: int = Field(
            default=4, description="Maximum allowable conversation turns for a user."
        )
        pass

    def __init__(self):
        # Indicates custom file handling logic. This flag helps disengage default routines in favor of custom
        # implementations, informing the WebUI to defer file-related operations to designated methods within this class.
        # Alternatively, you can remove the files directly from the body in from the inlet hook
        # self.file_handler = True

        # Initialize 'valves' with specific configurations. Using 'Valves' instance helps encapsulate settings,
        # which ensures settings are managed cohesively and not confused with operational flags like 'file_handler'.
        self.valves = self.Valves()
        pass

    def inlet(self, body: dict, __user__: Optional[dict] = None) -> dict:
        # Modify the request body or validate it before processing by the chat completion API.
        # This function is the pre-processor for the API where various checks on the input can be performed.
        # It can also modify the request before sending it to the API.
        print(f"inlet:{__name__}")
        print(f"inlet:body:{body}")
        print(f"inlet:user:{__user__}")

        if __user__.get("role", "admin") in ["user", "admin"]:
            messages = body.get("messages", [])

            max_turns = min(__user__["valves"].max_turns, self.valves.max_turns)
            if len(messages) > max_turns:
                raise Exception(
                    f"Conversation turn limit exceeded. Max turns: {max_turns}"
                )

        return body

    def outlet(self, body: dict, __user__: Optional[dict] = None) -> dict:
        # Modify or analyze the response body after processing by the API.
        # This function is the post-processor for the API, which can be used to modify the response
        # or perform additional checks and analytics.
        print(f"outlet:{__name__}")
        print(f"outlet:body:{body}")
        print(f"outlet:user:{__user__}")

        return body
`;const xe=async()=>{_e()({id:w(),name:v(),meta:m(),content:p()})},K=async()=>{if(l(I)){p(l(F)),await W();const t=await l(I).formatPythonCodeHandler();await W(),p(l(F)),await W(),xe()}};de(()=>P(p()),()=>{p()&&he()}),de(()=>(P(v()),P(x()),P(J()),G),()=>{v()&&!x()&&!J()&&w(G(v()))}),Oe(),Je();var Q=nt(),B=Ue(Q),R=a(B),C=a(R),X=a(C),T=a(X),E=a(T),N=a(E),ye=a(N);{let t=k(()=>(e(),n(()=>e().t("Back"))));q(ye,{get content(){return l(t)},children:(s,u)=>{var i=tt(),o=a(i);et(o,{strokeWidth:"2.5"}),r(i),ue("click",i,()=>{Ke("/admin/functions")}),_(s,i)},$$slots:{default:!0}})}r(N);var S=d(N,2),be=a(S);{let t=k(()=>(e(),n(()=>e().t("e.g. My Filter"))));q(be,{get content(){return l(t)},placement:"top-start",children:(s,u)=>{var i=at();j(i),y(o=>z(i,"placeholder",o),[()=>(e(),n(()=>e().t("Function Name")))]),L(i,v),_(s,i)},$$slots:{default:!0}})}r(S);var Y=d(S,2),we=a(Y);{let t=k(()=>(e(),n(()=>e().t("Function"))));Ze(we,{type:"muted",get content(){return l(t)}})}r(Y),r(E);var Z=d(E,2),ee=a(Z);{var ke=t=>{var s=rt(),u=a(s,!0);r(s),y(()=>f(u,w())),_(t,s)},$e=t=>{{let s=k(()=>(e(),n(()=>e().t("e.g. my_filter"))));q(t,{className:"w-full",get content(){return l(s)},placement:"top-start",children:(u,i)=>{var o=it();j(o),y(O=>{z(o,"placeholder",O),o.disabled=x()},[()=>(e(),n(()=>e().t("Function ID")))]),L(o,w),_(u,o)},$$slots:{default:!0}})}};Le(ee,t=>{x()?t(ke):t($e,-1)})}var Fe=d(ee,2);{let t=k(()=>(e(),n(()=>e().t("e.g. A filter to remove profanity from text"))));q(Fe,{className:"w-full self-center items-center flex",get content(){return l(t)},placement:"top-start",children:(s,u)=>{var i=st();j(i),y(o=>z(i,"placeholder",o),[()=>(e(),n(()=>e().t("Function Description")))]),L(i,()=>m().description,o=>m(m().description=o,!0)),_(s,i)},$$slots:{default:!0}})}r(Z),r(T);var D=d(T,2),Ie=a(D);fe(Xe(Ie,{get value(){return p()},lang:"python",boilerplate:ge,onChange:t=>{if(b(F,t),!x()){const s=Qe(t);s.title&&!v()&&(v(Re(s.title)),w(G(s.title))),s.description&&!m().description&&m({...m(),description:s.description})}},onSave:async()=>{l($)&&l($).requestSubmit()},$$legacy:!0}),t=>b(I,t),()=>l(I)),r(D);var te=d(D,2),V=a(te),ae=a(V),H=a(ae),Ce=a(H,!0);r(H);var re=d(H),ie=d(re,3),Pe=a(ie,!0);r(ie),r(ae),r(V);var se=d(V,2),Me=a(se,!0);r(se),r(te),r(X),r(C),fe(C,t=>b($,t),()=>l($)),r(R),r(B);var qe=d(B,2);Ye(qe,{get show(){return l(A)},set show(t){b(A,t)},$$events:{confirm:()=>{K()}},children:(t,s)=>{var u=ot(),i=a(u),o=a(i),O=a(o,!0);r(o);var oe=d(o,2),U=a(oe),Ae=a(U,!0);r(U);var ne=d(U,2),Be=a(ne,!0);r(ne),r(oe),r(i);var le=d(i,2),Te=a(le,!0);r(le),r(u),y((Ee,Ne,Se,De)=>{f(O,Ee),f(Ae,Ne),f(Be,Se),f(Te,De)},[()=>(e(),n(()=>e().t("Please carefully review the following warnings:"))),()=>(e(),n(()=>e().t("Functions allow arbitrary code execution."))),()=>(e(),n(()=>e().t("Do not install functions from sources you do not fully trust."))),()=>(e(),n(()=>e().t("I acknowledge that I have read and I understand the implications of my action. I am aware of the risks associated with executing arbitrary code and I have verified the trustworthiness of the source.")))]),_(t,u)},$$slots:{default:!0},$$legacy:!0}),y((t,s,u,i)=>{f(Ce,t),f(re,` ${s??""} `),f(Pe,u),f(Me,i)},[()=>(e(),n(()=>e().t("Warning:"))),()=>(e(),n(()=>e().t("Functions allow arbitrary code execution."))),()=>(e(),n(()=>e().t("don't install random functions from sources you don't trust."))),()=>(e(),n(()=>e().t("Save")))]),ue("submit",C,Ge(()=>{x()?K():b(A,!0)})),_(ce,Q),je(),me()}export{Ft as F};
