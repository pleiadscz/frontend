
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(app)" | "/" | "/(app)/admin" | "/(app)/admin/analytics" | "/(app)/admin/analytics/[tab]" | "/(app)/admin/evaluations" | "/(app)/admin/evaluations/[tab]" | "/(app)/admin/functions" | "/(app)/admin/functions/create" | "/(app)/admin/functions/edit" | "/(app)/admin/settings" | "/(app)/admin/settings/[tab]" | "/(app)/admin/users" | "/(app)/admin/users/[tab]" | "/auth" | "/(app)/automations" | "/(app)/automations/[id]" | "/(app)/calendar" | "/(app)/channels" | "/(app)/channels/[id]" | "/(app)/c" | "/(app)/c/[id]" | "/error" | "/(app)/home" | "/(app)/notes" | "/(app)/notes/new" | "/(app)/notes/[id]" | "/(app)/playground" | "/(app)/playground/completions" | "/(app)/playground/images" | "/s" | "/s/[id]" | "/watch" | "/(app)/workspace" | "/(app)/workspace/functions" | "/(app)/workspace/functions/create" | "/(app)/workspace/knowledge" | "/(app)/workspace/knowledge/create" | "/(app)/workspace/knowledge/[id]" | "/(app)/workspace/models" | "/(app)/workspace/models/create" | "/(app)/workspace/models/edit" | "/(app)/workspace/prompts" | "/(app)/workspace/prompts/create" | "/(app)/workspace/prompts/[id]" | "/(app)/workspace/skills" | "/(app)/workspace/skills/create" | "/(app)/workspace/skills/edit" | "/(app)/workspace/tools" | "/(app)/workspace/tools/create" | "/(app)/workspace/tools/edit";
		RouteParams(): {
			"/(app)/admin/analytics/[tab]": { tab: string };
			"/(app)/admin/evaluations/[tab]": { tab: string };
			"/(app)/admin/settings/[tab]": { tab: string };
			"/(app)/admin/users/[tab]": { tab: string };
			"/(app)/automations/[id]": { id: string };
			"/(app)/channels/[id]": { id: string };
			"/(app)/c/[id]": { id: string };
			"/(app)/notes/[id]": { id: string };
			"/s/[id]": { id: string };
			"/(app)/workspace/knowledge/[id]": { id: string };
			"/(app)/workspace/prompts/[id]": { id: string }
		};
		LayoutParams(): {
			"/(app)": { tab?: string | undefined; id?: string | undefined };
			"/": { tab?: string | undefined; id?: string | undefined };
			"/(app)/admin": { tab?: string | undefined };
			"/(app)/admin/analytics": { tab?: string | undefined };
			"/(app)/admin/analytics/[tab]": { tab: string };
			"/(app)/admin/evaluations": { tab?: string | undefined };
			"/(app)/admin/evaluations/[tab]": { tab: string };
			"/(app)/admin/functions": Record<string, never>;
			"/(app)/admin/functions/create": Record<string, never>;
			"/(app)/admin/functions/edit": Record<string, never>;
			"/(app)/admin/settings": { tab?: string | undefined };
			"/(app)/admin/settings/[tab]": { tab: string };
			"/(app)/admin/users": { tab?: string | undefined };
			"/(app)/admin/users/[tab]": { tab: string };
			"/auth": Record<string, never>;
			"/(app)/automations": { id?: string | undefined };
			"/(app)/automations/[id]": { id: string };
			"/(app)/calendar": Record<string, never>;
			"/(app)/channels": { id?: string | undefined };
			"/(app)/channels/[id]": { id: string };
			"/(app)/c": { id?: string | undefined };
			"/(app)/c/[id]": { id: string };
			"/error": Record<string, never>;
			"/(app)/home": Record<string, never>;
			"/(app)/notes": { id?: string | undefined };
			"/(app)/notes/new": Record<string, never>;
			"/(app)/notes/[id]": { id: string };
			"/(app)/playground": Record<string, never>;
			"/(app)/playground/completions": Record<string, never>;
			"/(app)/playground/images": Record<string, never>;
			"/s": { id?: string | undefined };
			"/s/[id]": { id: string };
			"/watch": Record<string, never>;
			"/(app)/workspace": { id?: string | undefined };
			"/(app)/workspace/functions": Record<string, never>;
			"/(app)/workspace/functions/create": Record<string, never>;
			"/(app)/workspace/knowledge": { id?: string | undefined };
			"/(app)/workspace/knowledge/create": Record<string, never>;
			"/(app)/workspace/knowledge/[id]": { id: string };
			"/(app)/workspace/models": Record<string, never>;
			"/(app)/workspace/models/create": Record<string, never>;
			"/(app)/workspace/models/edit": Record<string, never>;
			"/(app)/workspace/prompts": { id?: string | undefined };
			"/(app)/workspace/prompts/create": Record<string, never>;
			"/(app)/workspace/prompts/[id]": { id: string };
			"/(app)/workspace/skills": Record<string, never>;
			"/(app)/workspace/skills/create": Record<string, never>;
			"/(app)/workspace/skills/edit": Record<string, never>;
			"/(app)/workspace/tools": Record<string, never>;
			"/(app)/workspace/tools/create": Record<string, never>;
			"/(app)/workspace/tools/edit": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/" | "/admin/analytics" | "/admin/analytics/" | `/admin/analytics/${string}` & {} | `/admin/analytics/${string}/` & {} | "/admin/evaluations" | "/admin/evaluations/" | `/admin/evaluations/${string}` & {} | `/admin/evaluations/${string}/` & {} | "/admin/functions" | "/admin/functions/" | "/admin/functions/create" | "/admin/functions/create/" | "/admin/functions/edit" | "/admin/functions/edit/" | "/admin/settings" | "/admin/settings/" | `/admin/settings/${string}` & {} | `/admin/settings/${string}/` & {} | "/admin/users" | "/admin/users/" | `/admin/users/${string}` & {} | `/admin/users/${string}/` & {} | "/auth" | "/auth/" | "/automations" | "/automations/" | `/automations/${string}` & {} | `/automations/${string}/` & {} | "/calendar" | "/calendar/" | `/channels/${string}` & {} | `/channels/${string}/` & {} | `/c/${string}` & {} | `/c/${string}/` & {} | "/error" | "/error/" | "/home" | "/home/" | "/notes" | "/notes/" | "/notes/new" | "/notes/new/" | `/notes/${string}` & {} | `/notes/${string}/` & {} | "/playground" | "/playground/" | "/playground/completions" | "/playground/completions/" | "/playground/images" | "/playground/images/" | `/s/${string}` & {} | `/s/${string}/` & {} | "/watch" | "/watch/" | "/workspace" | "/workspace/" | "/workspace/functions/create" | "/workspace/functions/create/" | "/workspace/knowledge" | "/workspace/knowledge/" | "/workspace/knowledge/create" | "/workspace/knowledge/create/" | `/workspace/knowledge/${string}` & {} | `/workspace/knowledge/${string}/` & {} | "/workspace/models" | "/workspace/models/" | "/workspace/models/create" | "/workspace/models/create/" | "/workspace/models/edit" | "/workspace/models/edit/" | "/workspace/prompts" | "/workspace/prompts/" | "/workspace/prompts/create" | "/workspace/prompts/create/" | `/workspace/prompts/${string}` & {} | `/workspace/prompts/${string}/` & {} | "/workspace/skills" | "/workspace/skills/" | "/workspace/skills/create" | "/workspace/skills/create/" | "/workspace/skills/edit" | "/workspace/skills/edit/" | "/workspace/tools" | "/workspace/tools/" | "/workspace/tools/create" | "/workspace/tools/create/" | "/workspace/tools/edit" | "/workspace/tools/edit/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/assets/fonts/Archivo-Variable.ttf" | "/assets/fonts/InstrumentSerif-Italic.ttf" | "/assets/fonts/InstrumentSerif-Regular.ttf" | "/assets/fonts/Inter-Variable.ttf" | "/assets/fonts/Mona-Sans.woff2" | "/assets/fonts/Vazirmatn-Variable.ttf" | "/assets/images/adam.jpg" | "/assets/images/earth.jpg" | "/assets/images/galaxy.jpg" | "/assets/images/space.jpg" | "/audio/greeting.mp3" | "/audio/notification.mp3" | "/favicon.png" | "/image-placeholder.png" | "/manifest.json" | "/marker-icon-2x.png" | "/marker-icon.png" | "/marker-shadow.png" | "/opensearch.xml" | "/pyodide/README.md" | "/pyodide/annotated_types-0.7.0-py3-none-any.whl" | "/pyodide/anyio-4.9.0-py3-none-any.whl" | "/pyodide/beautifulsoup4-4.13.3-py3-none-any.whl" | "/pyodide/black-26.5.1-py3-none-any.whl" | "/pyodide/certifi-2025.7.14-py3-none-any.whl" | "/pyodide/charset_normalizer-3.4.2-py3-none-any.whl" | "/pyodide/click-8.2.1-py3-none-any.whl" | "/pyodide/console.html" | "/pyodide/contourpy-1.3.1-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/cycler-0.12.1-py3-none-any.whl" | "/pyodide/distro-1.9.0-py3-none-any.whl" | "/pyodide/ffi.d.ts" | "/pyodide/fonttools-4.56.0-py3-none-any.whl" | "/pyodide/httpx-0.28.1-py3-none-any.whl" | "/pyodide/idna-3.10-py3-none-any.whl" | "/pyodide/jiter-0.9.0-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/joblib-1.4.2-py3-none-any.whl" | "/pyodide/kiwisolver-1.4.8-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/libopenblas-0.3.26.zip" | "/pyodide/libopenssl-1.1.1w.zip" | "/pyodide/matplotlib-3.8.4-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/micropip-0.10.1-py3-none-any.whl" | "/pyodide/mpmath-1.3.0-py3-none-any.whl" | "/pyodide/mypy_extensions-1.1.0-py3-none-any.whl" | "/pyodide/numpy-2.2.5-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/openai-1.68.2-py3-none-any.whl" | "/pyodide/package.json" | "/pyodide/packaging-24.2-py3-none-any.whl" | "/pyodide/pandas-2.3.1-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/pathspec-1.1.1-py3-none-any.whl" | "/pyodide/pillow-11.3.0-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/platformdirs-4.3.6-py3-none-any.whl" | "/pyodide/pydantic-2.10.6-py3-none-any.whl" | "/pyodide/pydantic_core-2.27.2-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/pyodide-lock.json" | "/pyodide/pyodide.asm.js" | "/pyodide/pyodide.asm.wasm" | "/pyodide/pyodide.d.ts" | "/pyodide/pyodide.js" | "/pyodide/pyodide.js.map" | "/pyodide/pyodide.mjs" | "/pyodide/pyodide.mjs.map" | "/pyodide/pyparsing-3.2.1-py3-none-any.whl" | "/pyodide/python_dateutil-2.9.0.post0-py2.py3-none-any.whl" | "/pyodide/python_stdlib.zip" | "/pyodide/pytokens-0.4.1-py3-none-any.whl" | "/pyodide/pytz-2025.2-py2.py3-none-any.whl" | "/pyodide/regex-2024.11.6-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/requests-2.32.4-py3-none-any.whl" | "/pyodide/scikit_learn-1.7.0-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/scipy-1.14.1-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/six-1.17.0-py2.py3-none-any.whl" | "/pyodide/sniffio-1.3.1-py3-none-any.whl" | "/pyodide/soupsieve-2.6-py3-none-any.whl" | "/pyodide/ssl-1.0.0-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/sympy-1.13.3-py3-none-any.whl" | "/pyodide/threadpoolctl-3.5.0-py3-none-any.whl" | "/pyodide/tiktoken-0.9.0-cp313-cp313-pyodide_2025_0_wasm32.whl" | "/pyodide/typing_extensions-4.14.1-py3-none-any.whl" | "/pyodide/urllib3-2.5.0-py3-none-any.whl" | "/robots.txt" | "/sql.js/sql-wasm.wasm" | "/static/apple-touch-icon.png" | "/static/custom.css" | "/static/favicon-96x96.png" | "/static/favicon-dark.png" | "/static/favicon.ico" | "/static/favicon.png" | "/static/favicon.svg" | "/static/loader.js" | "/static/logo.png" | "/static/site.webmanifest" | "/static/splash-dark.png" | "/static/splash.png" | "/static/user-import.csv" | "/static/user.png" | "/static/web-app-manifest-192x192.png" | "/static/web-app-manifest-512x512.png" | "/themes/rosepine-dawn.css" | "/themes/rosepine.css" | "/user.png" | string & {};
	}
}