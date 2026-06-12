import{r}from"./root.js";import"./internal.js";let a={};function h(t){}function p(t){a=t}function g(t){}let i=null;function u(t){i=t}function f(t){}const y={app_template_contains_nonce:!1,async:!1,csp:{mode:"auto",directives:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1},reportOnly:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1}},csrf_check_origin:!0,csrf_trusted_origins:[],embedded:!1,env_public_prefix:"PUBLIC_",env_private_prefix:"",hash_routing:!1,hooks:null,preload_strategy:"modulepreload",root:r,service_worker:!1,service_worker_options:void 0,server_error_boundaries:!1,templates:{app:({head:t,body:n,assets:e,nonce:o,env:s})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/png" href="/static/favicon.png" crossorigin="use-credentials" />
		<link
			rel="icon"
			type="image/png"
			href="/static/favicon-96x96.png"
			sizes="96x96"
			crossorigin="use-credentials"
		/>
		<link
			rel="icon"
			type="image/svg+xml"
			href="/static/favicon.svg"
			crossorigin="use-credentials"
		/>
		<link rel="shortcut icon" href="/static/favicon.ico" crossorigin="use-credentials" />
		<link
			rel="apple-touch-icon"
			sizes="180x180"
			href="/static/apple-touch-icon.png"
			crossorigin="use-credentials"
		/>
		<link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
		/>
		<meta name="theme-color" content="#171717" />
		<meta name="robots" content="noindex,nofollow" />

		<script src="/static/loader.js" defer crossorigin="use-credentials"><\/script>
		<link rel="stylesheet" href="/static/custom.css" crossorigin="use-credentials" />

		<script>
			function resizeIframe(obj) {
				obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
			}
		<\/script>

		<script>
			// On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
			(() => {
				const metaThemeColorTag = document.querySelector('meta[name="theme-color"]');
				const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

				if (!localStorage?.theme) {
					localStorage.theme = 'system';
				}

				if (localStorage.theme === 'system') {
					document.documentElement.classList.add(prefersDarkTheme ? 'dark' : 'light');
					metaThemeColorTag.setAttribute('content', prefersDarkTheme ? '#171717' : '#ffffff');
				} else if (localStorage.theme === 'oled-dark') {
					document.documentElement.style.setProperty('--color-gray-800', '#101010');
					document.documentElement.style.setProperty('--color-gray-850', '#050505');
					document.documentElement.style.setProperty('--color-gray-900', '#000000');
					document.documentElement.style.setProperty('--color-gray-950', '#000000');
					document.documentElement.classList.add('dark');
					metaThemeColorTag.setAttribute('content', '#000000');
				} else if (localStorage.theme === 'light') {
					document.documentElement.classList.add('light');
					metaThemeColorTag.setAttribute('content', '#ffffff');
				} else if (localStorage.theme === 'her') {
					document.documentElement.classList.add('her');
					metaThemeColorTag.setAttribute('content', '#983724');
				} else {
					document.documentElement.classList.add('dark');
					metaThemeColorTag.setAttribute('content', '#171717');
				}

				const preloadHref = document.documentElement.classList.contains('dark')
					? '/static/splash-dark.png'
					: '/static/splash.png';
				const preload = document.createElement('link');
				preload.rel = 'preload';
				preload.as = 'image';
				preload.href = preloadHref;
				preload.setAttribute('fetchpriority', 'high');
				document.head.appendChild(preload);

				window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
					if (localStorage.theme === 'system') {
						if (e.matches) {
							document.documentElement.classList.add('dark');
							document.documentElement.classList.remove('light');
							metaThemeColorTag.setAttribute('content', '#171717');
						} else {
							document.documentElement.classList.add('light');
							document.documentElement.classList.remove('dark');
							metaThemeColorTag.setAttribute('content', '#ffffff');
						}
					}
				});
				const isDarkMode = document.documentElement.classList.contains('dark');

				const logo = document.createElement('img');
				logo.id = 'logo';
				logo.style =
					'position: absolute; width: auto; height: 6rem; top: 44%; left: 50%; transform: translateX(-50%); display:block;';
				logo.loading = 'eager';
				logo.fetchPriority = 'high';
				logo.src = isDarkMode ? '/static/splash-dark.png' : '/static/splash.png';

				document.addEventListener('DOMContentLoaded', function () {
					const splash = document.getElementById('splash-screen');
					if (document.documentElement.classList.contains('her')) {
						return;
					}

					if (splash) splash.prepend(logo);
				});
			})();
		<\/script>

		<title>Open WebUI</title>

		`+t+`
	</head>

	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">`+n+`</div>

		<div
			id="splash-screen"
			style="position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 100%"
		>
			<style type="text/css" nonce="">
				html {
					overflow-y: scroll !important;
				}
			</style>

			<div
				style="
					position: absolute;
					top: 33%;
					left: 50%;

					width: 24rem;
					transform: translateX(-50%);

					display: flex;
					flex-direction: column;
					align-items: center;
				"
			>
				<img
					id="logo-her"
					style="width: auto; height: 13rem"
					src="/static/splash.png"
					loading="eager"
					fetchpriority="high"
					class="animate-pulse-fast"
				/>

				<div style="position: relative; width: 24rem; margin-top: 0.5rem">
					<div
						id="progress-background"
						style="
							position: absolute;
							width: 100%;
							height: 0.75rem;

							border-radius: 9999px;
							background-color: #fafafa9a;
						"
					></div>

					<div
						id="progress-bar"
						style="
							position: absolute;
							width: 0%;
							height: 0.75rem;
							border-radius: 9999px;
							background-color: #fff;
						"
						class="bg-white"
					></div>
				</div>
			</div>

			<!-- <span style="position: absolute; bottom: 32px; left: 50%; margin: -36px 0 0 -36px">
				Footer content
			</span> -->
		</div>
	</body>

	<style type="text/css" nonce="">
		html {
			overflow-y: hidden !important;
			overscroll-behavior-y: none;
		}

		#splash-screen {
			background: #fff;
		}

		html.dark #splash-screen {
			background: #000;
		}

		html.her #splash-screen {
			background: #983724;
		}

		#logo-her {
			display: none;
		}

		#progress-background {
			display: none;
		}

		#progress-bar {
			display: none;
		}

		html.her #logo {
			display: none;
		}

		html.her #logo-her {
			display: block;
			filter: invert(1);
		}

		html.her #progress-background {
			display: block;
		}

		html.her #progress-bar {
			display: block;
		}

		@media (max-width: 24rem) {
			html.her #progress-background {
				display: none;
			}

			html.her #progress-bar {
				display: none;
			}
		}

		@keyframes pulse {
			50% {
				opacity: 0.65;
			}
		}

		.animate-pulse-fast {
			animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		}
	</style>
</html>
`,error:({status:t,message:n})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>`+n+`</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">`+t+`</span>
			<div class="message">
				<h1>`+n+`</h1>
			</div>
		</div>
	</body>
</html>
`},version_hash:"1ot1rqw"};async function b(){return{handle:void 0,handleFetch:void 0,handleError:void 0,handleValidationError:void 0,init:void 0,reroute:void 0,transport:void 0}}export{p as a,u as b,g as c,f as d,b as g,y as o,a as p,i as r,h as s};
