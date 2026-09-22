---
title: '用 Astro 搭一个极简静态博客'
description: '从零开始：内容集合、Markdown、分页、搜索与部署的完整思路。'
pubDate: 2026-09-21
tags: ['Astro', '前端', '工程化']
---

这个博客本身就是用 Astro 搭的。记录一下整体思路，方便以后迁移或重建。

## 为什么选 Astro

对于博客这种**内容为主、交互很少**的站点，静态生成是最合适的：

- 构建时输出纯 HTML，没有运行时框架开销，首屏极快；
- 可以部署在任何免费的静态托管平台上；
- 文章是本地 Markdown 文件，不依赖数据库，备份就是 `git push`。

Astro 相比传统静态站点生成器的好处是：组件模型现代（`.astro` 文件）、内容层有类型校验、与 npm 生态无缝衔接。

## 内容集合

所有文章放在 `src/content/blog/` 下，通过内容集合定义 frontmatter 的结构：

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

Schema 带来的好处是：写错字段名或日期格式时，**构建阶段就会报错**，而不是上线后才发现。

## 页面结构

整个站点的页面非常少：

| 路径 | 作用 |
| --- | --- |
| `/` | 文章列表，带分页 |
| `/posts/[id]` | 文章正文 |
| `/tags`、`/tags/[tag]` | 标签浏览 |
| `/about` | 关于 |
| `/rss.xml` | RSS 订阅 |

## 全文搜索

搜索用 [Pagefind](https://pagefind.app/)：构建后扫描 `dist/` 里的静态页面，生成纯静态的搜索索引，不需要任何服务端。索引按词块懒加载，即使文章很多也不拖慢首屏。

## 部署流程

理想的工作流只有三步：

```bash
git add .
git commit -m "post: 新文章"
git push
```

推送后托管平台自动构建发布，全程免费。

## 小结

技术博客的核心是**写**，不是折腾工具。一次把架子搭好，让发布成本低到只剩写文章本身，这个工具就算合格了。
