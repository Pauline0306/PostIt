import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // Ensure you're using a proper adapter depending on your deployment
    adapter: adapter(),
  },

  vite: {
    build: {
      sourcemap: false,  // Disable sourcemaps in production build
    }
  }
};

export default config;
