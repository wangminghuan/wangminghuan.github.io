import { createContentLoader } from "vitepress";
import { basename, extname } from "path";

// 避免导入时报错
let data = [];
export { data };

// 获取并处理所有文档数据，供首页等使用
// createContentLoader会默认忽略'**/node_modules/**', '**/dist/**'
export default createContentLoader(
  [
    "posts/**/*.md",
    "**/*.md"
  ],
  {
    includeSrc: true,
    async transform(data) {
      try {
        // 过滤有效数据
        const validData = data.filter(item => item.url && (item.src || item.frontmatter));
        
        const processedData = validData.map(({ frontmatter, src, url }) => {
          // 用页面的一级标题作为文章标题
          let title = 
            src?.match(/^\s*#\s+(.*)\s*$/m)?.[1] ||
            frontmatter?.title ||
            basename(url).replace(extname(url), "");

          // 标题可能用到了变量，需要替换
          if (title && typeof title === 'string') {
            const regexp = /\{\{\s*\$frontmatter\.(\S+?)\s*\}\}/g;
            let match;
            while ((match = regexp.exec(title)) !== null) {
              const replaceReg = new RegExp(
                "\\{\\{\\s*\\$frontmatter\\." + match[1] + "\\s*\\}\\}",
                "g"
              );
              title = title.replace(replaceReg, frontmatter?.[match[1]] || '');
            }
          }

          // 处理详情内容
          let details = '';
          if (src) {
            details = src
              // 去除html标签
              .replace(/<[^>]+?>/g, "")
              // 去除frontmatter
              .replace(/^---[\s\S]*?---/, "")
              // 去除标题
              .replace(/^#+\s+.*?$/gm, "")
              // 去除引用
              .replace(/^\>/gm, "")
              // 只保留反引号内部内容
              .replace(/`(.+?)`/g, "$1")
              // 只保留加粗、倾斜符号中的内容
              .replace(/\*{1,3}(.+?)\*{1,3}/g, "$1")
              // 只保留跳转内容
              .replace(/\[(.+?)\]\(.+?\)/g, "$1")
              // 去除提示块
              .replace(/^:::.*$/gm, "")
              // 统一空白字符为一个空格
              .replace(/\s/g, " ")
              // 仅保留可能显示的部分，减小数据大小
              .slice(0, 200);
          }

          // 安全处理链接
          const link = url ? url.replace(/^\//, '') : '';

          // 安全处理时间
          const now = Date.now();
          const fileTimeInfo = [now, now];

          return {
            title: title || '无标题',
            details: details || '无内容',
            link: link,
            fileTimeInfo: fileTimeInfo,
            date: frontmatter?.date || new Date().toISOString()
          };
        });

        // 按日期排序
        processedData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        // 更新导出的数据
        data = processedData;
        
        return processedData;
      } catch (error) {
        console.error('Error processing content:', error);
        return [];
      }
    },
  }
);

// 简化版时间获取函数（避免git依赖）
function getFileTime(filePath) {
  try {
    const { birthtimeMs, mtimeMs } = require('fs').statSync(filePath);
    return [birthtimeMs, mtimeMs];
  } catch {
    const now = Date.now();
    return [now, now];
  }
}