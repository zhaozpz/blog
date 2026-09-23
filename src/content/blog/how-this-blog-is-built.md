---
title: '这个博客是怎么搭起来的：从零到 zpz0801.xyz'
description: '一篇完整的搭建复盘：Astro 静态生成、Cloudflare Pages 免费部署、域名迁移、评论系统，以及过程中的坑。'
pubDate: 2026-09-23
tags: ['Astro', 'Cloudflare', '博客', '工程化']
---

前一篇[《用 Astro 搭一个极简静态博客》](/posts/build-a-fast-static-blog/)讲了选型思路，这篇记录完整的落地过程——从空目录到 `zpz0801.xyz` 上线，包括每一步实际做了什么、踩了哪些坑。

## 整体链路

```
本地 Markdown → git push → GitHub 仓库 → Cloudflare Pages 自动构建 → 全球 CDN
```

核心只有一句话：**内容即代码，发布即推送**。写作时不需要碰任何后台，`git push` 之后大约一分钟全网生效。

## 技术选型

- **Astro 5** 静态生成：构建产物是纯 HTML + 少量原生 JS，首屏没有框架运行时开销；
- **零 UI 框架**：手写 CSS，系统字体，没有外部字体请求；
- **Pagefind** 全文搜索：构建后对静态页面建索引，`Ctrl/⌘+K` 唤起，中文搜索可用；
- 深色模式为默认主题，浅色可一键切换，选择存在 `localStorage` 里，刷新不闪白。

## 部署与域名

1. GitHub 建仓库，本地 `git init && git push`；
2. Cloudflare Pages 连接仓库，框架选 Astro，构建命令 `npm run build`，输出目录 `dist`，首次构建约 40 秒；
3. 之后每次 push 自动触发重新部署，无需人工干预。

域名部分多花了点功夫：

- 域名在阿里云注册，把 NS 从万网迁到 Cloudflare（`kai/laylah.ns.cloudflare.com`），注册局生效大约半小时；
- Pages 项目绑定 `zpz0801.xyz` 和 `www.zpz0801.xyz`，DNS 记录与 SSL 证书自动签发；
- sitemap 和 RSS 用同一个配置文件（`src/consts.ts`）里的域名，改一处全站同步。

## 评论系统

评论用的是 [Giscus](https://giscus.app)：数据存在本仓库的 GitHub Discussions 里，访客用 GitHub 账号登录即可发言，无广告、无数据库，深浅色自动跟随。配置只有四个值（repo / repoId / category / categoryId），填进 `consts.ts` 即生效。

## 踩过的坑

- **www 跳转**：想让 `www` 301 到主域名，控制台的「重定向规则」里类型下拉只有「静态」，填动态表达式会变成字面文本，直接重定向循环。最后用一个小 Worker 拦截 `www.zpz0801.xyz/*` 做 301 解决；
- **国内推送 GitHub**：`git push` 偶尔 TLS 中断，本地代理端口配到 git 的 `http.proxy` 后稳定；
- **证书报错排查**：本机 curl 报吊销服务器离线（CRYPT_E_REVOCATION_OFFLINE），加 `--ssl-no-revoke` 区分「本机问题」和「站点问题」，少走弯路。

## 日常写作流程

在 `src/content/blog/` 新建一个 `.md`：

```md
---
title: '标题'
description: '一句话摘要'
pubDate: 2026-09-23
tags: ['标签']
---

正文 Markdown……
```

`git add . && git commit -m "post: 标题" && git push`，一分钟上线。这篇就是这么发的。

## 还想做的

- [ ] 加「关于」页面
- [ ] 文章阅读量统计（或接入 Cloudflare Web Analytics）
- [ ] 友链页
