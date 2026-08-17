import { defineConfig, devices } from '@playwright/test';
export default defineConfig({ testDir:'tests/e2e', use:{baseURL:'http://127.0.0.1:3100',...devices['Desktop Chrome']}, webServer:{command:'npm run build && PORT=3100 npm run start',url:'http://127.0.0.1:3100/api/health',reuseExistingServer:false}, reporter:'list' });
