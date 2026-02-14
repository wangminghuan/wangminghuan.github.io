// docs/theme/index.js
import DefaultTheme from "vitepress/theme";
import { h } from "vue";

// 自定义组件
import CustomLayout from "./Layout.vue";
import CustomImage from "./Image.vue";

// 样式文件
import "./styles/custom.css";

const theme = {
  extends: DefaultTheme,
  Layout: () => h(CustomLayout),
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("CustomImage", CustomImage);
    
    // 添加全局方法
    app.config.globalProperties.$formatDate = (date) => {
      return new Date(date).toLocaleDateString("zh-CN");
    };
  }
};

export default theme;