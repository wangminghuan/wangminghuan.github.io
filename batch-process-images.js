import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录
const rootDir = path.resolve(__dirname);
// _posts 目录
const postsDir = path.join(rootDir, '_posts');
// docs 目录
const docsDir = path.join(rootDir, 'docs');

// 清理已生成的image文件夹
function cleanImageFolders() {
  walk(docsDir, (filePath) => {
    if (path.basename(filePath) === 'image' && fs.statSync(filePath).isDirectory()) {
      // 删除目录及其内容
      fs.rmSync(filePath, { recursive: true, force: true });
      console.log(`删除了目录: ${filePath}`);
    }
  });
}

// 遍历 _posts 目录下的所有文件夹
function processPostsDir() {
  // 先清理已生成的image文件夹
  cleanImageFolders();
  
  const postFolders = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  postFolders.forEach(folderName => {
    processPostFolder(folderName);
  });
}

// 处理单个 _posts 文件夹
function processPostFolder(folderName) {
  const postFolderPath = path.join(postsDir, folderName);
  const mdFilePath = findCorrespondingMdFile(folderName);

  if (!mdFilePath) {
    console.log(`未找到对应 ${folderName} 的 md 文件`);
    return;
  }

  // 创建对应 docs 目录下的 image 文件夹
  const docDir = path.dirname(mdFilePath);
  const imageDir = path.join(docDir, 'image');
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log(`创建了目录: ${imageDir}`);
  }

  // 读取 md 文件内容
  let mdContent = fs.readFileSync(mdFilePath, 'utf8');

  // 获取 md 文件中的所有图片引用
  const imageReferences = extractImageReferences(mdContent);

  // 复制图片文件到 image 目录并更新引用
  imageReferences.forEach(ref => {
    // 跳过已经是 /image/ 格式的引用
    if (ref.startsWith('/image/')) {
      return;
    }
    
    const imageFile = path.basename(ref);
    const sourcePath = path.join(postFolderPath, imageFile);
    
    // 检查图片文件是否存在
    if (!fs.existsSync(sourcePath)) {
      console.log(`未找到图片文件: ${sourcePath}`);
      return;
    }
    
    // 生成10位随机数作为新文件名
    const randomName = generateRandomName(10) + path.extname(imageFile);
    const destPath = path.join(imageDir, randomName);
    
    // 复制文件
    fs.copyFileSync(sourcePath, destPath);
    console.log(`复制图片: ${imageFile} -> ${destPath}`);
    
    // 更新 md 文件中的图片引用路径
    mdContent = mdContent.replace(ref, `/image/${randomName}`);
  });

  // 写回修改后的 md 文件内容
  fs.writeFileSync(mdFilePath, mdContent, 'utf8');
  console.log(`更新了 md 文件: ${mdFilePath}`);
}

// 查找对应文件夹名的 md 文件
function findCorrespondingMdFile(folderName) {
  // 遍历 docs 目录查找对应的 md 文件
  const mdFiles = [];
  walk(docsDir, (filePath) => {
    if (path.extname(filePath) === '.md') {
      const fileName = path.basename(filePath, '.md');
      if (fileName === folderName) {
        mdFiles.push(filePath);
      }
    }
  });

  return mdFiles.length > 0 ? mdFiles[0] : null;
}

// 提取 md 文件中的所有图片引用
function extractImageReferences(mdContent) {
  const regex = /!\[.*?\]\(([^)]+)\)/g;
  const references = [];
  let match;
  
  while ((match = regex.exec(mdContent)) !== null) {
    references.push(match[1]);
  }
  
  return references;
}

// 生成指定长度的随机数字符串
function generateRandomName(length) {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 递归遍历目录
function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

// 执行脚本
console.log('开始处理图片文件...');
processPostsDir();
console.log('图片处理完成！');