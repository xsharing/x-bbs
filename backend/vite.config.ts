import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 4002,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
    }),
  ],
  optimizeDeps: {
    exclude: [],
  },
});
