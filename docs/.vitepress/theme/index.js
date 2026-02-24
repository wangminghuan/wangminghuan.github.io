import DefaultTheme from "vitepress/theme";
import Layout from "../../components/Layout.vue";
import "./customize.css";
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 如果不是完全自定义主题,需要执行主题的默认行为
    DefaultTheme.enhanceApp({ app, router, siteData });
  },
};
