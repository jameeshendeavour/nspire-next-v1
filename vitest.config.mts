import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    // setupFiles: ['__tests__/setup.ts'],
    coverage: {
      provider: 'v8', // Use the v8 coverage provider
      reporter: ['text', 'json', 'html'] // Specify the coverage report formats
      // You can add more options here as needed
    }
  }
});
