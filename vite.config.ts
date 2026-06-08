import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
        server: {
                host: '0.0.0.0',
                port: 5000,
                allowedHosts: true,
                hmr: {
                        protocol: 'wss',
                        clientPort: 443,
                        host: process.env.REPLIT_DEV_DOMAIN
                },
                cors: {
                        origin: '*',
                        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                        allowedHeaders: '*',
                        credentials: false
                }
        },
        plugins: [
                sveltekit(),
                viteStaticCopy({
                        targets: [
                                {
                                        src: 'node_modules/onnxruntime-web/dist/*.jsep.*',
                                        dest: 'wasm'
                                }
                        ]
                })
        ],
        define: {
                APP_VERSION: JSON.stringify(process.env.npm_package_version),
                APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build')
        },
        build: {
                minify: true,
                sourcemap: false
        },
        worker: {
                format: 'es'
        },
        esbuild: {
                drop: ['console', 'debugger']
        },
        preview: {
                host: '0.0.0.0',
                allowedHosts: true,
                cors: {
                        origin: '*',
                        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                        allowedHeaders: '*',
                        credentials: false
                }
        }
});
