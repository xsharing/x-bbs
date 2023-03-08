import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig({
  appType: 'custom',
  server: {
    port: 4002,
    hmr: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
    }),
    // pothos schema builder has problem with reload(registering same type)
    ViteRestart({
      restart: ['src/**/*.ts'],
    }),
  ],
  optimizeDeps: {
    exclude: [],
  },
});
