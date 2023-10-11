import { defineConfig } from "vite";
import { resolve } from "node:path";
import { viteSingleFile } from "vite-plugin-singlefile";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/],
		}),
		viteSingleFile()
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	base: "./"
});
