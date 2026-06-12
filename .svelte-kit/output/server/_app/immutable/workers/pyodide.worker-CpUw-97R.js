import{loadPyodide as u}from"pyodide";let a=null;async function m(e=[]){self.stdout=null,self.stderr=null,self.result=null,self.pyodide=await u({indexURL:"/pyodide/",stdout:t=>{self.stdout?self.stdout+=`${t}
`:self.stdout=`${t}
`},stderr:t=>{self.stderr?self.stderr+=`${t}
`:self.stderr=`${t}
`},packages:["micropip"]});const s="/mnt/uploads";self.pyodide.FS.mkdirTree(s),self.pyodide.FS.mount(self.pyodide.FS.filesystems.IDBFS,{},"/mnt"),await new Promise(t=>{self.pyodide.FS.syncfs(!0,i=>{t()})});try{self.pyodide.FS.stat(s)}catch{self.pyodide.FS.mkdirTree(s)}await self.pyodide.pyimport("micropip").install(e)}async function p(e=[]){a||(a=m(e)),await a,e.length>0&&self.pyodide&&await self.pyodide.pyimport("micropip").install(e)}function f(){self.pyodide&&self.pyodide.FS.syncfs(!1,e=>{})}function c(e,s="/mnt/uploads"){try{self.pyodide.FS.stat(s)}catch{self.pyodide.FS.mkdirTree(s)}for(const o of e)self.pyodide.FS.writeFile(`${s}/${o.name}`,new Uint8Array(o.data))}function b(e){const s=[];try{const o=self.pyodide.FS.readdir(e).filter(t=>t!=="."&&t!=="..");for(const t of o)try{const i=self.pyodide.FS.stat(`${e}/${t}`),r=self.pyodide.FS.isDir(i.mode);s.push({name:t,type:r?"directory":"file",size:r?0:i.size})}catch{}}catch{}return s}function g(e){return self.pyodide.FS.readFile(e).buffer}function y(e){try{const s=self.pyodide.FS.stat(e);if(self.pyodide.FS.isDir(s.mode)){const o=self.pyodide.FS.readdir(e).filter(t=>t!=="."&&t!=="..");for(const t of o)y(`${e}/${t}`);self.pyodide.FS.rmdir(e)}else self.pyodide.FS.unlink(e)}catch{}}function S(e){self.pyodide.FS.mkdirTree(e)}async function F(e,s,o){self.stdout=null,self.stderr=null,self.result=null,o&&o.length>0&&(c(o),f());try{s.includes("matplotlib")&&await self.pyodide.runPythonAsync(`import base64
import os
from io import BytesIO

# before importing matplotlib
# to avoid the wasm backend (which needs js.document', not available in worker)
os.environ["MPLBACKEND"] = "AGG"

import matplotlib.pyplot

_old_show = matplotlib.pyplot.show
assert _old_show, "matplotlib.pyplot.show"

def show(*, block=None):
	buf = BytesIO()
	matplotlib.pyplot.savefig(buf, format="png")
	buf.seek(0)
	# encode to a base64 str
	img_str = base64.b64encode(buf.read()).decode('utf-8')
	matplotlib.pyplot.clf()
	buf.close()
	print(f"data:image/png;base64,{img_str}")

matplotlib.pyplot.show = show`),self.result=await self.pyodide.runPythonAsync(s),self.result=l(self.result),f()}catch(t){self.stderr=t instanceof Error?t.message:String(t)}self.postMessage({id:e,result:self.result,stdout:self.stdout,stderr:self.stderr})}self.onmessage=async e=>{const s=e.data,{id:o,type:t}=s;if(!t||t==="execute"){const{code:i,files:r,...n}=s;for(const d of Object.keys(n))d!=="id"&&d!=="type"&&(self[d]=n[d]);await p(self.packages),await F(o,i,r);return}switch(await p(),t){case"fs:upload":{const{files:i,dir:r}=s;c(i,r),f(),self.postMessage({id:o,type:"fs:upload",success:!0});break}case"fs:list":{const i=b(s.path);self.postMessage({id:o,type:"fs:list",entries:i});break}case"fs:read":{try{const i=g(s.path);self.postMessage({id:o,type:"fs:read",data:i},{transfer:[i]})}catch(i){self.postMessage({id:o,type:"fs:read",error:i instanceof Error?i.message:String(i)})}break}case"fs:delete":{y(s.path),f(),self.postMessage({id:o,type:"fs:delete",success:!0});break}case"fs:mkdir":{S(s.path),f(),self.postMessage({id:o,type:"fs:mkdir",success:!0});break}case"fs:sync":{self.pyodide.FS.syncfs(!0,i=>{self.postMessage({id:o,type:"fs:sync",success:!i})});break}}};function l(e){try{if(e==null)return null;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;if(typeof e=="bigint")return e.toString();if(Array.isArray(e))return e.map(s=>l(s));if(typeof e.toJs=="function")return l(e.toJs());if(typeof e=="object"){const s={};for(const o in e)Object.prototype.hasOwnProperty.call(e,o)&&(s[o]=l(e[o]));return s}return JSON.stringify(e)}catch(s){return`[processResult error]: ${s instanceof Error?s.message:String(s)}`}}
