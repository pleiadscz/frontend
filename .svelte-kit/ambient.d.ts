
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const COLORTERM: string;
	export const NIX_BUILD_CORES: string;
	export const REPL_OWNER: string;
	export const configureFlags: string;
	export const DATABASE_URL: string;
	export const NIXPKGS_ALLOW_UNFREE: string;
	export const mesonFlags: string;
	export const __EGL_VENDOR_LIBRARY_FILENAMES: string;
	export const shell: string;
	export const depsHostHost: string;
	export const REPLIT_DOMAINS: string;
	export const LD_AUDIT: string;
	export const PGPORT: string;
	export const XDG_DATA_HOME: string;
	export const REPL_OWNER_ID: string;
	export const STRINGS: string;
	export const PGPASSWORD: string;
	export const XDG_CONFIG_HOME: string;
	export const depsTargetTarget: string;
	export const REPLIT_LD_AUDIT: string;
	export const stdenv: string;
	export const builder: string;
	export const REPLIT_ARTIFACT_ROUTER: string;
	export const REPLIT_CLI: string;
	export const shellHook: string;
	export const NPM_CONFIG_REGISTRY: string;
	export const phases: string;
	export const PWD: string;
	export const SOURCE_DATE_EPOCH: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const REPLIT_DB_URL: string;
	export const NIX_PATH: string;
	export const REPLIT_EXPO_DEV_DOMAIN: string;
	export const CXX: string;
	export const REPL_ID: string;
	export const system: string;
	export const HOST_PATH: string;
	export const doInstallCheck: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const LANG: string;
	export const CONNECTORS_HOSTNAME: string;
	export const REPL_IDENTITY: string;
	export const LS_COLORS: string;
	export const depsTargetTargetPropagated: string;
	export const REPLIT_RIPPKGS_INDICES: string;
	export const GOSUMDB: string;
	export const REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE: string;
	export const cmakeFlags: string;
	export const outputs: string;
	export const PIP_TRUSTED_HOST: string;
	export const NIX_STORE: string;
	export const GIT_ASKPASS: string;
	export const PGUSER: string;
	export const LD: string;
	export const buildPhase: string;
	export const REPLIT_CONTAINER: string;
	export const YARN_NPM_REGISTRY_SERVER: string;
	export const READELF: string;
	export const XDG_CACHE_HOME: string;
	export const NIX_PS1: string;
	export const doCheck: string;
	export const REPLIT_RTLD_LOADER: string;
	export const depsBuildBuild: string;
	export const REPLIT_DEV_DOMAIN: string;
	export const TERM: string;
	export const REPLIT_CLUSTER: string;
	export const REPLIT_BASHRC: string;
	export const SIZE: string;
	export const propagatedNativeBuildInputs: string;
	export const npm_config_prefix: string;
	export const REPL_LANGUAGE: string;
	export const strictDeps: string;
	export const SESSION_SECRET: string;
	export const REPL_HOME: string;
	export const TZDIR: string;
	export const REPLIT_PID1_VERSION: string;
	export const YARN_REGISTRY: string;
	export const AR: string;
	export const AS: string;
	export const PIP_INDEX_URL: string;
	export const GOPROXY: string;
	export const DISPLAY: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const SHLVL: string;
	export const NIX_BUILD_TOP: string;
	export const NM: string;
	export const REPLIT_NIX_CHANNEL: string;
	export const GIT_EDITOR: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const PGDATABASE: string;
	export const patches: string;
	export const PROMPT_DIRTRIM: string;
	export const REPL_IN_MICROVM: string;
	export const LIBGL_DRIVERS_PATH: string;
	export const buildInputs: string;
	export const REPLIT_MODE: string;
	export const LOCALE_ARCHIVE: string;
	export const preferLocalBuild: string;
	export const REPLIT_CONNECTORS_HOSTNAME: string;
	export const REPLIT_PID2: string;
	export const NODE_PATH: string;
	export const depsBuildTarget: string;
	export const OBJCOPY: string;
	export const PGHOST: string;
	export const out: string;
	export const REPLIT_LD_LIBRARY_PATH: string;
	export const STRIP: string;
	export const XDG_DATA_DIRS: string;
	export const REPL_IDENTITY_KEY: string;
	export const REPLIT_HELIUM_ENABLED: string;
	export const OBJDUMP: string;
	export const PATH: string;
	export const propagatedBuildInputs: string;
	export const DOCKER_CONFIG: string;
	export const CC: string;
	export const NIX_CC: string;
	export const __ETC_PROFILE_SOURCED: string;
	export const depsBuildTargetPropagated: string;
	export const depsBuildBuildPropagated: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const GLIBC_TUNABLES: string;
	export const npm_config_registry: string;
	export const REPL_PUBKEYS: string;
	export const CONFIG_SHELL: string;
	export const __structuredAttrs: string;
	export const RANLIB: string;
	export const NIX_HARDENING_ENABLE: string;
	export const REPL_SLUG: string;
	export const NIX_LDFLAGS: string;
	export const nativeBuildInputs: string;
	export const depsHostHostPropagated: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		COLORTERM: string;
		NIX_BUILD_CORES: string;
		REPL_OWNER: string;
		configureFlags: string;
		DATABASE_URL: string;
		NIXPKGS_ALLOW_UNFREE: string;
		mesonFlags: string;
		__EGL_VENDOR_LIBRARY_FILENAMES: string;
		shell: string;
		depsHostHost: string;
		REPLIT_DOMAINS: string;
		LD_AUDIT: string;
		PGPORT: string;
		XDG_DATA_HOME: string;
		REPL_OWNER_ID: string;
		STRINGS: string;
		PGPASSWORD: string;
		XDG_CONFIG_HOME: string;
		depsTargetTarget: string;
		REPLIT_LD_AUDIT: string;
		stdenv: string;
		builder: string;
		REPLIT_ARTIFACT_ROUTER: string;
		REPLIT_CLI: string;
		shellHook: string;
		NPM_CONFIG_REGISTRY: string;
		phases: string;
		PWD: string;
		SOURCE_DATE_EPOCH: string;
		NIX_ENFORCE_NO_NATIVE: string;
		REPLIT_DB_URL: string;
		NIX_PATH: string;
		REPLIT_EXPO_DEV_DOMAIN: string;
		CXX: string;
		REPL_ID: string;
		system: string;
		HOST_PATH: string;
		doInstallCheck: string;
		HOME: string;
		NIX_BINTOOLS: string;
		LANG: string;
		CONNECTORS_HOSTNAME: string;
		REPL_IDENTITY: string;
		LS_COLORS: string;
		depsTargetTargetPropagated: string;
		REPLIT_RIPPKGS_INDICES: string;
		GOSUMDB: string;
		REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE: string;
		cmakeFlags: string;
		outputs: string;
		PIP_TRUSTED_HOST: string;
		NIX_STORE: string;
		GIT_ASKPASS: string;
		PGUSER: string;
		LD: string;
		buildPhase: string;
		REPLIT_CONTAINER: string;
		YARN_NPM_REGISTRY_SERVER: string;
		READELF: string;
		XDG_CACHE_HOME: string;
		NIX_PS1: string;
		doCheck: string;
		REPLIT_RTLD_LOADER: string;
		depsBuildBuild: string;
		REPLIT_DEV_DOMAIN: string;
		TERM: string;
		REPLIT_CLUSTER: string;
		REPLIT_BASHRC: string;
		SIZE: string;
		propagatedNativeBuildInputs: string;
		npm_config_prefix: string;
		REPL_LANGUAGE: string;
		strictDeps: string;
		SESSION_SECRET: string;
		REPL_HOME: string;
		TZDIR: string;
		REPLIT_PID1_VERSION: string;
		YARN_REGISTRY: string;
		AR: string;
		AS: string;
		PIP_INDEX_URL: string;
		GOPROXY: string;
		DISPLAY: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		SHLVL: string;
		NIX_BUILD_TOP: string;
		NM: string;
		REPLIT_NIX_CHANNEL: string;
		GIT_EDITOR: string;
		NIX_CFLAGS_COMPILE: string;
		PGDATABASE: string;
		patches: string;
		PROMPT_DIRTRIM: string;
		REPL_IN_MICROVM: string;
		LIBGL_DRIVERS_PATH: string;
		buildInputs: string;
		REPLIT_MODE: string;
		LOCALE_ARCHIVE: string;
		preferLocalBuild: string;
		REPLIT_CONNECTORS_HOSTNAME: string;
		REPLIT_PID2: string;
		NODE_PATH: string;
		depsBuildTarget: string;
		OBJCOPY: string;
		PGHOST: string;
		out: string;
		REPLIT_LD_LIBRARY_PATH: string;
		STRIP: string;
		XDG_DATA_DIRS: string;
		REPL_IDENTITY_KEY: string;
		REPLIT_HELIUM_ENABLED: string;
		OBJDUMP: string;
		PATH: string;
		propagatedBuildInputs: string;
		DOCKER_CONFIG: string;
		CC: string;
		NIX_CC: string;
		__ETC_PROFILE_SOURCED: string;
		depsBuildTargetPropagated: string;
		depsBuildBuildPropagated: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		GLIBC_TUNABLES: string;
		npm_config_registry: string;
		REPL_PUBKEYS: string;
		CONFIG_SHELL: string;
		__structuredAttrs: string;
		RANLIB: string;
		NIX_HARDENING_ENABLE: string;
		REPL_SLUG: string;
		NIX_LDFLAGS: string;
		nativeBuildInputs: string;
		depsHostHostPropagated: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
