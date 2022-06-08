import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import copy from 'rollup-plugin-copy'
import viteSSR from "vite-ssr/plugin"

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        fs: {
            // The API logic is in outside of the project
            strict: false,
        },
    },
    plugins: [viteSSR(), vue(), copy({
        targets: [
            {src: './src/assets/*', dest: './public/assets'},
        ]
    })],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
    }})
