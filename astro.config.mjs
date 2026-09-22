// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { SITE } from './src/consts.ts';

// 部署后把 SITE.url 改成你的真实域名（sitemap / RSS 需要）
export default defineConfig({
  site: SITE.url,
  integrations: [sitemap(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
