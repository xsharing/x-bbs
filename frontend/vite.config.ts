import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import codegen from 'vite-plugin-graphql-codegen';
import relay from 'vite-plugin-relay';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [codegen(), relay, react()],
});
