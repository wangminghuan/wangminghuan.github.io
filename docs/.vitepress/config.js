// docs/.vitepress/config.js
import { defineConfig } from 'vitepress'
import AutoNav from "vite-plugin-vitepress-auto-nav";

export default defineConfig({
  srcDir: './src',
  title: "WMH's Blog",
  description: "just code it",
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    defaultHighlightLang: "js",
  },
  // 构建输出目录
  outDir: '../dist',
  // Vite配置
  vite: {
    plugins: [
      AutoNav({
        itemsSetting: {
          AI系列: { sort: 0 },
          前端系列: { sort: 1 }
        },
      })
    ],
    server: {
      port: 3000,
      open: true
    }
  },
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
       {
        text: "前端系列",
        link: "/前端系列/Nodejs/Nodejs系列-1-基础",
        activeMatch: "/前端系列/",
      },
      {
        text: "AI系列",
        link: "/AI系列/LLM/LLM系列-1-速览",
        activeMatch: "/AI系列/",
      }
    ],
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