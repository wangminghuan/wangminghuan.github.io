import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import featureConfig from './theme/feature.js'
// 侧边栏配置
const sidebarConfig = [{
  documentRootPath: 'docs', // 文档根目录
  scanStartPath:'markdown', // 从 markdown 目录开始扫描
  resolvePath: '/markdown/',
  followSymLinks: true,
  useTitleFromFrontmatter: true,
  collapsed: true,
  collapsedDepth: 2,
}]
export default defineConfig(withSidebar({
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
      ...featureConfig.map(item => ({ 
        text: item.title, 
        link: item.link,
        activeMatch: item.link.split('/').slice(0, -1).join('/')
      })),
    ],
    logo: '/favicon.svg',
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
},sidebarConfig))