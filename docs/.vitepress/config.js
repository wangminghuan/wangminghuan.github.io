import { defineConfig } from 'vitepress';
import { getSidebar } from 'vitepress-plugin-auto-sidebar';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  title: "WMH's Blog",
  description: "just code it",
  base: '/',
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    defaultHighlightLang: "js",
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI系列', link: '/AI/主流大模型概述' },
    ],
    sidebar: getSidebar({
      contentRoot: resolve(__dirname, '../'),
      contentDirs: ['AI','JavaScript','Nodejs','Python','Flutter'],
      collapsible: true,
      collapsed: true,
      useFrontmatter: true
    }),
    logo: '/logo.svg',
    outline: "deep",
    outlineTitle: "目录",
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangminghuan' },
    ],
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present WMH'
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    darkModeSwitchTitle: "切换暗色主题",
    lightModeSwitchTitle: "切换亮色主题",
    darkModeSwitchLabel: "切换主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
    langMenuLabel: "切换语言",
    lastUpdatedText: "更新时间",
    externalLinkIcon: true,
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除",
            footer: {
              closeText: "关闭",
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    }
  }
})