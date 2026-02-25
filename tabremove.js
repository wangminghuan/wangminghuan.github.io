import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 移除 md 文件代码块内的基础缩进，保留相对缩进
 * @param {string} targetPath - 要处理的文件或目录路径
 */
function removeBaseIndentInCodeBlocks(targetPath) {
  const stats = fs.statSync(targetPath);

  // 如果是目录，递归处理其中的所有文件
  if (stats.isDirectory()) {
    const files = fs.readdirSync(targetPath, { withFileTypes: true });
    files.forEach(file => {
      const fullPath = path.join(targetPath, file.name);
      removeBaseIndentInCodeBlocks(fullPath);
    });
  }

  // 如果是 .md 文件，处理它
  if (stats.isFile() && path.extname(targetPath) === '.md') {
    try {
      console.log(`🔍 处理文件: ${targetPath}`);
      
      // 读取文件内容
      const content = fs.readFileSync(targetPath, 'utf8');
      
      // 按行处理
      const lines = content.split('\n');
      const resultLines = [];
      
      let inCodeBlock = false;
      let codeBlockLines = [];
      let codeBlockCount = 0;
      let modifiedBlockCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // 检查代码块开始
        if (line.startsWith('```')) {
          if (!inCodeBlock) {
            // 开始新代码块
            inCodeBlock = true;
            codeBlockLines = [];
            codeBlockCount++;
            console.log(`   📝 找到代码块 ${codeBlockCount}`);
            resultLines.push(line); // 保留代码块开始行
          } else {
            // 结束代码块
            inCodeBlock = false;
            
            // 处理代码块内容
            if (codeBlockLines.length > 0) {
              // 过滤掉空行，只考虑有内容的行
              const nonEmptyLines = codeBlockLines.filter(l => l.trim() !== '');
              
              if (nonEmptyLines.length > 0) {
                // 检测最小缩进量
                let minIndent = Infinity;
                nonEmptyLines.forEach(l => {
                  const indentMatch = l.match(/^[\t\s]+/);
                  if (indentMatch) {
                    const indentLength = indentMatch[0].length;
                    if (indentLength < minIndent) {
                      minIndent = indentLength;
                    }
                  } else {
                    minIndent = 0;
                  }
                });
                
                // 移除基础缩进
                if (minIndent > 0) {
                  const processedLines = codeBlockLines.map(l => {
                    if (l.length >= minIndent) {
                      return l.slice(minIndent);
                    }
                    return l;
                  });
                  
                  resultLines.push(...processedLines);
                  modifiedBlockCount++;
                  console.log(`   ✅ 代码块 ${codeBlockCount}: 移除了 ${minIndent} 个字符的基础缩进`);
                } else {
                  resultLines.push(...codeBlockLines);
                  console.log(`   ℹ️ 代码块 ${codeBlockCount}: 无基础缩进`);
                }
              } else {
                resultLines.push(...codeBlockLines);
                console.log(`   ℹ️ 代码块 ${codeBlockCount}: 为空`);
              }
            }
            
            resultLines.push(line); // 保留代码块结束行
          }
        } 
        // 处理代码块内容
        else if (inCodeBlock) {
          codeBlockLines.push(line);
        }
        // 处理非代码块内容
        else {
          resultLines.push(line);
        }
      }
      
      // 重建内容
      const processedContent = resultLines.join('\n');
      
      // 只有内容变化时才写入
      if (processedContent !== content) {
        fs.writeFileSync(targetPath, processedContent, 'utf8');
        console.log(`✅ 完成处理: ${targetPath}`);
        console.log(`   共处理 ${codeBlockCount} 个代码块，修改了 ${modifiedBlockCount} 个`);
      } else {
        console.log(`ℹ️ 无需修改: ${targetPath}`);
        console.log(`   共检查 ${codeBlockCount} 个代码块`);
      }
      
    } catch (error) {
      console.error(`❌ 处理失败: ${targetPath}`, error.message);
    }
  }
}

// ==================== 配置项 ====================
// 替换为你的 vite-press 项目 md 文件根目录（如 docs 目录）
// 可以是单个文件路径，也可以是目录路径
const TARGET_PATH = path.resolve(__dirname, './docs/markdown/前端杂谈');

// 执行脚本
console.log(`🚀 开始处理目录: ${TARGET_PATH}`);
removeBaseIndentInCodeBlocks(TARGET_PATH);
console.log('🎉 所有文件处理完成！');