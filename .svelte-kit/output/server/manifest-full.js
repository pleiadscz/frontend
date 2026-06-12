export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/fonts/Archivo-Variable.ttf","assets/fonts/InstrumentSerif-Italic.ttf","assets/fonts/InstrumentSerif-Regular.ttf","assets/fonts/Inter-Variable.ttf","assets/fonts/Mona-Sans.woff2","assets/fonts/Vazirmatn-Variable.ttf","assets/images/adam.jpg","assets/images/earth.jpg","assets/images/galaxy.jpg","assets/images/space.jpg","audio/greeting.mp3","audio/notification.mp3","favicon.png","image-placeholder.png","manifest.json","marker-icon-2x.png","marker-icon.png","marker-shadow.png","opensearch.xml","pyodide/README.md","pyodide/annotated_types-0.7.0-py3-none-any.whl","pyodide/anyio-4.9.0-py3-none-any.whl","pyodide/beautifulsoup4-4.13.3-py3-none-any.whl","pyodide/black-26.5.1-py3-none-any.whl","pyodide/certifi-2025.7.14-py3-none-any.whl","pyodide/charset_normalizer-3.4.2-py3-none-any.whl","pyodide/click-8.2.1-py3-none-any.whl","pyodide/console.html","pyodide/contourpy-1.3.1-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/cycler-0.12.1-py3-none-any.whl","pyodide/distro-1.9.0-py3-none-any.whl","pyodide/ffi.d.ts","pyodide/fonttools-4.56.0-py3-none-any.whl","pyodide/httpx-0.28.1-py3-none-any.whl","pyodide/idna-3.10-py3-none-any.whl","pyodide/jiter-0.9.0-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/joblib-1.4.2-py3-none-any.whl","pyodide/kiwisolver-1.4.8-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/libopenblas-0.3.26.zip","pyodide/libopenssl-1.1.1w.zip","pyodide/matplotlib-3.8.4-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/micropip-0.10.1-py3-none-any.whl","pyodide/mpmath-1.3.0-py3-none-any.whl","pyodide/mypy_extensions-1.1.0-py3-none-any.whl","pyodide/numpy-2.2.5-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/openai-1.68.2-py3-none-any.whl","pyodide/package.json","pyodide/packaging-24.2-py3-none-any.whl","pyodide/pandas-2.3.1-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/pathspec-1.1.1-py3-none-any.whl","pyodide/pillow-11.3.0-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/platformdirs-4.3.6-py3-none-any.whl","pyodide/pydantic-2.10.6-py3-none-any.whl","pyodide/pydantic_core-2.27.2-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/pyodide-lock.json","pyodide/pyodide.asm.js","pyodide/pyodide.asm.wasm","pyodide/pyodide.d.ts","pyodide/pyodide.js","pyodide/pyodide.js.map","pyodide/pyodide.mjs","pyodide/pyodide.mjs.map","pyodide/pyparsing-3.2.1-py3-none-any.whl","pyodide/python_dateutil-2.9.0.post0-py2.py3-none-any.whl","pyodide/python_stdlib.zip","pyodide/pytokens-0.4.1-py3-none-any.whl","pyodide/pytz-2025.2-py2.py3-none-any.whl","pyodide/regex-2024.11.6-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/requests-2.32.4-py3-none-any.whl","pyodide/scikit_learn-1.7.0-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/scipy-1.14.1-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/six-1.17.0-py2.py3-none-any.whl","pyodide/sniffio-1.3.1-py3-none-any.whl","pyodide/soupsieve-2.6-py3-none-any.whl","pyodide/ssl-1.0.0-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/sympy-1.13.3-py3-none-any.whl","pyodide/threadpoolctl-3.5.0-py3-none-any.whl","pyodide/tiktoken-0.9.0-cp313-cp313-pyodide_2025_0_wasm32.whl","pyodide/typing_extensions-4.14.1-py3-none-any.whl","pyodide/urllib3-2.5.0-py3-none-any.whl","robots.txt","sql.js/sql-wasm.wasm","static/apple-touch-icon.png","static/custom.css","static/favicon-96x96.png","static/favicon-dark.png","static/favicon.ico","static/favicon.png","static/favicon.svg","static/loader.js","static/logo.png","static/site.webmanifest","static/splash-dark.png","static/splash.png","static/user-import.csv","static/user.png","static/web-app-manifest-192x192.png","static/web-app-manifest-512x512.png","themes/rosepine-dawn.css","themes/rosepine.css","user.png"]),
	mimeTypes: {".ttf":"font/ttf",".woff2":"font/woff2",".jpg":"image/jpeg",".mp3":"audio/mpeg",".png":"image/png",".json":"application/json",".xml":"text/xml",".md":"text/markdown",".html":"text/html",".ts":"video/mp2t",".zip":"application/zip",".js":"text/javascript",".wasm":"application/wasm",".map":"application/json",".mjs":"text/javascript",".txt":"text/plain",".css":"text/css",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".csv":"text/csv"},
	_: {
		client: null,
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js')),
			__memo(() => import('./nodes/36.js')),
			__memo(() => import('./nodes/37.js')),
			__memo(() => import('./nodes/38.js')),
			__memo(() => import('./nodes/39.js')),
			__memo(() => import('./nodes/40.js')),
			__memo(() => import('./nodes/41.js')),
			__memo(() => import('./nodes/42.js')),
			__memo(() => import('./nodes/43.js')),
			__memo(() => import('./nodes/44.js')),
			__memo(() => import('./nodes/45.js')),
			__memo(() => import('./nodes/46.js')),
			__memo(() => import('./nodes/47.js')),
			__memo(() => import('./nodes/48.js')),
			__memo(() => import('./nodes/49.js')),
			__memo(() => import('./nodes/50.js')),
			__memo(() => import('./nodes/51.js')),
			__memo(() => import('./nodes/52.js')),
			__memo(() => import('./nodes/53.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(app)",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/admin/analytics",
				pattern: /^\/admin\/analytics\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/admin/analytics/[tab]",
				pattern: /^\/admin\/analytics\/([^/]+?)\/?$/,
				params: [{"name":"tab","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/admin/evaluations",
				pattern: /^\/admin\/evaluations\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/admin/evaluations/[tab]",
				pattern: /^\/admin\/evaluations\/([^/]+?)\/?$/,
				params: [{"name":"tab","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/admin/functions",
				pattern: /^\/admin\/functions\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(app)/admin/functions/create",
				pattern: /^\/admin\/functions\/create\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/admin/functions/edit",
				pattern: /^\/admin\/functions\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(app)/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(app)/admin/settings/[tab]",
				pattern: /^\/admin\/settings\/([^/]+?)\/?$/,
				params: [{"name":"tab","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(app)/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(app)/admin/users/[tab]",
				pattern: /^\/admin\/users\/([^/]+?)\/?$/,
				params: [{"name":"tab","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 50 },
				endpoint: null
			},
			{
				id: "/(app)/automations",
				pattern: /^\/automations\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/(app)/automations/[id]",
				pattern: /^\/automations\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/(app)/calendar",
				pattern: /^\/calendar\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/(app)/channels/[id]",
				pattern: /^\/channels\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/(app)/c/[id]",
				pattern: /^\/c\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/error",
				pattern: /^\/error\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 51 },
				endpoint: null
			},
			{
				id: "/(app)/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,2,4,], errors: [1,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(app)/notes",
				pattern: /^\/notes\/?$/,
				params: [],
				page: { layouts: [0,2,5,], errors: [1,,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/(app)/notes/new",
				pattern: /^\/notes\/new\/?$/,
				params: [],
				page: { layouts: [0,2,5,], errors: [1,,,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/(app)/notes/[id]",
				pattern: /^\/notes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,5,], errors: [1,,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/(app)/playground",
				pattern: /^\/playground\/?$/,
				params: [],
				page: { layouts: [0,2,6,], errors: [1,,,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/(app)/playground/completions",
				pattern: /^\/playground\/completions\/?$/,
				params: [],
				page: { layouts: [0,2,6,], errors: [1,,,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/(app)/playground/images",
				pattern: /^\/playground\/images\/?$/,
				params: [],
				page: { layouts: [0,2,6,], errors: [1,,,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/s/[id]",
				pattern: /^\/s\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 52 },
				endpoint: null
			},
			{
				id: "/watch",
				pattern: /^\/watch\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 53 },
				endpoint: null
			},
			{
				id: "/(app)/workspace",
				pattern: /^\/workspace\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/functions/create",
				pattern: /^\/workspace\/functions\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/knowledge",
				pattern: /^\/workspace\/knowledge\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/knowledge/create",
				pattern: /^\/workspace\/knowledge\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/knowledge/[id]",
				pattern: /^\/workspace\/knowledge\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/models",
				pattern: /^\/workspace\/models\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/models/create",
				pattern: /^\/workspace\/models\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/models/edit",
				pattern: /^\/workspace\/models\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/prompts",
				pattern: /^\/workspace\/prompts\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/prompts/create",
				pattern: /^\/workspace\/prompts\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/prompts/[id]",
				pattern: /^\/workspace\/prompts\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/skills",
				pattern: /^\/workspace\/skills\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/skills/create",
				pattern: /^\/workspace\/skills\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/skills/edit",
				pattern: /^\/workspace\/skills\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/tools",
				pattern: /^\/workspace\/tools\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/tools/create",
				pattern: /^\/workspace\/tools\/create\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/(app)/workspace/tools/edit",
				pattern: /^\/workspace\/tools\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,7,], errors: [1,,,], leaf: 49 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
