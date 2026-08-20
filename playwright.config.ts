import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PORT || 3100);
const baseUrl = `http://127.0.0.1:${port}`;

export default defineConfig({ testDir:'tests/e2e', use:{baseURL:baseUrl,...devices['Desktop Chrome']}, webServer:{command:`npm run build && PORT=${port} npm run start`,url:`${baseUrl}/api/health`,reuseExistingServer:false}, reporter:'list' });
