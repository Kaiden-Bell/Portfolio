import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
    plugins: [react(), tailwindcss()],
    base: "/Portfolio/",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
    },
  };
});
