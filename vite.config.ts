import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),copy({
	  targets: [
		  { src: './src/assets/*', dest: './public/assets' },
	  ]
  })],
  resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	},
	build:{
		terserOptions:{
			compress:{
				drop_console:true
			}
		},
	},
})
