// docs/.vitepress/config.js
import { defineConfig } from "file:///E:/myProject/vite-blog/node_modules/vitepress/dist/node/index.js";
import { getSidebar } from "file:///E:/myProject/vite-blog/node_modules/vitepress-plugin-auto-sidebar/dist/vitepress-plugin-auto-sidebar.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __vite_injected_original_import_meta_url = "file:///E:/myProject/vite-blog/docs/.vitepress/config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var config_default = defineConfig({
  title: "WMH's Blog",
  description: "just code it",
  base: "/",
  lang: "zh-CN",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    defaultHighlightLang: "js"
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "blog", link: "/blog" }
    ],
    sidebar: getSidebar({
      contentRoot: resolve(__dirname, "../"),
      collapsible: true,
      collapsed: true,
      useFrontmatter: true
    }),
    logo: "/logo.svg",
    outline: "deep",
    outlineTitle: "\u76EE\u5F55",
    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/wangminghuan" }
    ],
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright \xA9 2024-present WMH"
    },
    docFooter: {
      prev: "\u4E0A\u4E00\u7BC7",
      next: "\u4E0B\u4E00\u7BC7"
    },
    darkModeSwitchTitle: "\u5207\u6362\u6697\u8272\u4E3B\u9898",
    lightModeSwitchTitle: "\u5207\u6362\u4EAE\u8272\u4E3B\u9898",
    darkModeSwitchLabel: "\u5207\u6362\u4E3B\u9898",
    sidebarMenuLabel: "\u83DC\u5355",
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    langMenuLabel: "\u5207\u6362\u8BED\u8A00",
    lastUpdatedText: "\u66F4\u65B0\u65F6\u95F4",
    externalLinkIcon: true,
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "\u641C\u7D22\u6587\u6863"
          },
          modal: {
            displayDetails: "\u663E\u793A\u8BE6\u60C5",
            noResultsText: "\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C",
            resetButtonTitle: "\u6E05\u9664",
            footer: {
              closeText: "\u5173\u95ED",
              selectText: "\u9009\u62E9",
              navigateText: "\u5207\u6362"
            }
          }
        }
      }
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXG15UHJvamVjdFxcXFx2aXRlLWJsb2dcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxteVByb2plY3RcXFxcdml0ZS1ibG9nXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L215UHJvamVjdC92aXRlLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcyc7XHJcbmltcG9ydCB7IGdldFNpZGViYXIgfSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLWF1dG8tc2lkZWJhcic7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoX19maWxlbmFtZSk7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgdGl0bGU6IFwiV01IJ3MgQmxvZ1wiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImp1c3QgY29kZSBpdFwiLFxyXG4gIGJhc2U6ICcvJyxcclxuICBsYW5nOiAnemgtQ04nLFxyXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBsaW5lTnVtYmVyczogdHJ1ZSxcclxuICAgIGRlZmF1bHRIaWdobGlnaHRMYW5nOiBcImpzXCIsXHJcbiAgfSxcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogJ0hvbWUnLCBsaW5rOiAnLycgfSxcclxuICAgICAgeyB0ZXh0OiAnYmxvZycsIGxpbms6ICcvYmxvZycgfSxcclxuICAgIF0sXHJcbiAgICBzaWRlYmFyOiBnZXRTaWRlYmFyKHtcclxuICAgICAgY29udGVudFJvb3Q6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vJyksXHJcbiAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxyXG4gICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgIHVzZUZyb250bWF0dGVyOiB0cnVlXHJcbiAgICB9KSxcclxuICAgIGxvZ286ICcvbG9nby5zdmcnLFxyXG4gICAgb3V0bGluZTogXCJkZWVwXCIsXHJcbiAgICBvdXRsaW5lVGl0bGU6IFwiXHU3NkVFXHU1RjU1XCIsXHJcbiAgICAvLyBcdTc5M0VcdTRFQTRcdTk0RkVcdTYzQTVcclxuICAgIHNvY2lhbExpbmtzOiBbXHJcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vd2FuZ21pbmdodWFuJyB9LFxyXG4gICAgXSxcclxuICAgIC8vIFx1OTg3NVx1ODExQVxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6ICdSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuJyxcclxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDI0LXByZXNlbnQgV01IJ1xyXG4gICAgfSxcclxuICAgIGRvY0Zvb3Rlcjoge1xyXG4gICAgICBwcmV2OiBcIlx1NEUwQVx1NEUwMFx1N0JDN1wiLFxyXG4gICAgICBuZXh0OiBcIlx1NEUwQlx1NEUwMFx1N0JDN1wiLFxyXG4gICAgfSxcclxuICAgIGRhcmtNb2RlU3dpdGNoVGl0bGU6IFwiXHU1MjA3XHU2MzYyXHU2Njk3XHU4MjcyXHU0RTNCXHU5ODk4XCIsXHJcbiAgICBsaWdodE1vZGVTd2l0Y2hUaXRsZTogXCJcdTUyMDdcdTYzNjJcdTRFQUVcdTgyNzJcdTRFM0JcdTk4OThcIixcclxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6IFwiXHU1MjA3XHU2MzYyXHU0RTNCXHU5ODk4XCIsXHJcbiAgICBzaWRlYmFyTWVudUxhYmVsOiBcIlx1ODNEQ1x1NTM1NVwiLFxyXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogXCJcdTU2REVcdTUyMzBcdTk4NzZcdTkwRThcIixcclxuICAgIGxhbmdNZW51TGFiZWw6IFwiXHU1MjA3XHU2MzYyXHU4QkVEXHU4QTAwXCIsXHJcbiAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XCIsXHJcbiAgICBleHRlcm5hbExpbmtJY29uOiB0cnVlLFxyXG4gICAgc2VhcmNoOiB7XHJcbiAgICAgIHByb3ZpZGVyOiBcImxvY2FsXCIsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICB0cmFuc2xhdGlvbnM6IHtcclxuICAgICAgICAgIGJ1dHRvbjoge1xyXG4gICAgICAgICAgICBidXR0b25UZXh0OiBcIlx1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2M1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1vZGFsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXRhaWxzOiBcIlx1NjYzRVx1NzkzQVx1OEJFNlx1NjBDNVwiLFxyXG4gICAgICAgICAgICBub1Jlc3VsdHNUZXh0OiBcIlx1NjcyQVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5Q1wiLFxyXG4gICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiBcIlx1NkUwNVx1OTY2NFwiLFxyXG4gICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICBjbG9zZVRleHQ6IFwiXHU1MTczXHU5NUVEXCIsXHJcbiAgICAgICAgICAgICAgc2VsZWN0VGV4dDogXCJcdTkwMDlcdTYyRTlcIixcclxuICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6IFwiXHU1MjA3XHU2MzYyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1MsU0FBUyxvQkFBb0I7QUFDalUsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxTQUFTLGVBQWU7QUFIdUosSUFBTSwyQ0FBMkM7QUFJek8sSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUNwQyxJQUFPLGlCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixzQkFBc0I7QUFBQSxFQUN4QjtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDMUIsRUFBRSxNQUFNLFFBQVEsTUFBTSxRQUFRO0FBQUEsSUFDaEM7QUFBQSxJQUNBLFNBQVMsV0FBVztBQUFBLE1BQ2xCLGFBQWEsUUFBUSxXQUFXLEtBQUs7QUFBQSxNQUNyQyxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxJQUNsQixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUE7QUFBQSxJQUVkLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0sa0NBQWtDO0FBQUEsSUFDNUQ7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxJQUNyQixzQkFBc0I7QUFBQSxJQUN0QixxQkFBcUI7QUFBQSxJQUNyQixrQkFBa0I7QUFBQSxJQUNsQixrQkFBa0I7QUFBQSxJQUNsQixlQUFlO0FBQUEsSUFDZixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsWUFDTixZQUFZO0FBQUEsVUFDZDtBQUFBLFVBQ0EsT0FBTztBQUFBLFlBQ0wsZ0JBQWdCO0FBQUEsWUFDaEIsZUFBZTtBQUFBLFlBQ2Ysa0JBQWtCO0FBQUEsWUFDbEIsUUFBUTtBQUFBLGNBQ04sV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGNBQ1osY0FBYztBQUFBLFlBQ2hCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
