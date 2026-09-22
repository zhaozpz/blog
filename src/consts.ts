// 全站配置：改这一个文件即可
export const SITE = {
  title: '笔记',
  author: '赵培卓',
  // 真实域名（sitemap / RSS 使用）；绑定自定义域名后改之
  url: 'https://blog-a0v.pages.dev',
  description: '记录技术、工程与思考。',
  postsPerPage: 8,
};

// 社交链接（留空字符串则不显示）
export const SOCIAL = {
  github: 'https://github.com/yourname',
  email: 'you@example.com',
  rss: '/rss.xml',
};

// Giscus 评论：需要在 GitHub 创建公开仓库并在 https://giscus.app 生成以下四个值。
// 全部留空则自动隐藏评论区，不影响其他功能。
export const GISCUS = {
  repo: '',
  repositoryId: '',
  category: '',
  categoryId: '',
};
