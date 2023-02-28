import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.js"),
            name: "vue3-multiselect-checkboxed",
            fileName: `vue3-multiselect-checkboxed`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                }
            }
        }
    },
    plugins: [vue(), {
        include: ["src/components/*.vue", "src/style.css"],
        exclude: ["src/App.vue"]
    }]
})