#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置项
const config = {
  hexoPostsDir: path.join(__dirname, 'source', '_posts'),
  vitepressPostsDir: path.join(__dirname, 'docs', 'posts'),
  hexoImagesDir: path.join(__dirname, 'source', '_posts'),
  vitepressImagesDir: path.join(__dirname, 'docs', 'public', 'images'),
  
  // 分类映射（根据你的Hexo分类）
  categoryMapping: {
    'JavaScript': 'javascript',
    'CSS': 'css',
    'Vue': 'vue',
    'React': 'react',
    'Nodejs': 'nodejs',
    'Python': 'python',
    '数据库': 'database',
    '前端工程化': 'frontend-engineering',
    'Web框架': 'web-framework',
    'Web调试': 'web-debug',
    '图形图像': 'graphics',
    '计算机相关': 'computer',
    '随笔': 'essay',
    'ES6系列': 'javascript',
    'Nodejs-系列': 'nodejs',
    'React-系列': 'react',
    'Vue-系列': 'vue',
    'Web-Server': 'web-framework',
    '前端杂烩': 'frontend-engineering',
    '重学前端': 'javascript',
    'Chromium': 'web-debug'
  }
}

// 工具函数
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function parseHexoFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (!match) {
    return { frontMatter: {}, content: content }
  }
  
  const frontMatterText = match[1]
  const contentText = match[2]
  const frontMatter = {}
  
  frontMatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim()
      
      // 处理数组格式
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim())
      }
      
      frontMatter[key.trim()] = value
    }
  })
  
  return { frontMatter, content: contentText }
}

function convertToVitePressFrontMatter(hexoFrontMatter) {
  const vitepressFrontMatter = {}
  
  // 标题
  if (hexoFrontMatter.title) {
    vitepressFrontMatter.title = hexoFrontMatter.title
  }
  
  // 日期
  if (hexoFrontMatter.date) {
    vitepressFrontMatter.date = hexoFrontMatter.date
  }
  
  // 描述（从内容中提取第一段）
  if (hexoFrontMatter.description) {
    vitepressFrontMatter.description = hexoFrontMatter.description
  }
  
  // 分类
  if (hexoFrontMatter.categories) {
    const categories = Array.isArray(hexoFrontMatter.categories) 
      ? hexoFrontMatter.categories 
      : [hexoFrontMatter.categories]
    
    vitepressFrontMatter.categories = categories.map(cat => {
      return config.categoryMapping[cat] || cat.toLowerCase().replace(/\s+/g, '-')
    })
  }
  
  // 标签
  if (hexoFrontMatter.tags) {
    const tags = Array.isArray(hexoFrontMatter.tags) 
      ? hexoFrontMatter.tags 
      : [hexoFrontMatter.tags]
    
    vitepressFrontMatter.tags = tags
  }
  
  return vitepressFrontMatter
}

function generateVitePressContent(frontMatter, content) {
  let frontMatterText = '---\n'
  
  Object.entries(frontMatter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      frontMatterText += `${key}:\n`
      value.forEach(item => {
        frontMatterText += `  - ${item}\n`
      })
    } else {
      frontMatterText += `${key}: ${value}\n`
    }
  })
  
  frontMatterText += '---\n\n'
  
  return frontMatterText + content
}

function copyImageResources(hexoPostDir, postTitle, vitepressCategory) {
  const imageDir = path.join(hexoPostDir, postTitle)
  
  if (fs.existsSync(imageDir) && fs.statSync(imageDir).isDirectory()) {
    const targetDir = path.join(config.vitepressImagesDir, vitepressCategory, postTitle)
    ensureDir(targetDir)
    
    const files = fs.readdirSync(imageDir)
    files.forEach(file => {
      if (/\.(png|jpg|jpeg|gif|svg)$/i.test(file)) {
        const sourcePath = path.join(imageDir, file)
        const targetPath = path.join(targetDir, file)
        fs.copyFileSync(sourcePath, targetPath)
        console.log(`✅ 复制图片: ${file}`)
      }
    })
  }
}

function updateImageLinks(content, postTitle, category) {
  // 更新相对路径的图片链接
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g, 
    (match, alt, src) => {
      if (src.startsWith('http')) {
        return match // 保持外部链接不变
      }
      
      // 处理相对路径图片
      const newSrc = `/images/${category}/${postTitle}/${src}`
      return `![${alt}](${newSrc})`
    }
  )
}

async function migratePost(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { frontMatter, content: markdownContent } = parseHexoFrontMatter(content)
    
    if (!frontMatter.title) {
      console.log(`⚠️ 跳过无标题文章: ${filePath}`)
      return
    }
    
    const postTitle = path.basename(filePath, '.md')
    const categories = frontMatter.categories 
      ? (Array.isArray(frontMatter.categories) ? frontMatter.categories : [frontMatter.categories])
      : ['uncategorized']
    
    const primaryCategory = categories[0]
    const vitepressCategory = config.categoryMapping[primaryCategory] || primaryCategory.toLowerCase().replace(/\s+/g, '-')
    
    // 转换Front Matter
    const vitepressFrontMatter = convertToVitePressFrontMatter(frontMatter)
    
    // 更新图片链接
    let updatedContent = updateImageLinks(markdownContent, postTitle, vitepressCategory)
    
    // 生成VitePress格式内容
    const vitepressContent = generateVitePressContent(vitepressFrontMatter, updatedContent)
    
    // 确保目标目录存在
    const targetDir = path.join(config.vitepressPostsDir, vitepressCategory)
    ensureDir(targetDir)
    
    // 写入新文件
    const targetFilePath = path.join(targetDir, `${postTitle}.md`)
    fs.writeFileSync(targetFilePath, vitepressContent, 'utf8')
    
    // 复制图片资源
    copyImageResources(config.hexoPostsDir, postTitle, vitepressCategory)
    
    console.log(`✅ 迁移完成: ${postTitle} -> ${vitepressCategory}/${postTitle}.md`)
    
    return {
      original: filePath,
      new: targetFilePath,
      category: vitepressCategory,
      title: frontMatter.title
    }
  } catch (error) {
    console.error(`❌ 迁移失败: ${filePath}`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 开始迁移Hexo文章到VitePress...\n')
  
  // 确保目标目录存在
  ensureDir(config.vitepressPostsDir)
  ensureDir(config.vitepressImagesDir)
  
  // 读取Hexo文章目录
  if (!fs.existsSync(config.hexoPostsDir)) {
    console.error(`❌ Hexo文章目录不存在: ${config.hexoPostsDir}`)
    process.exit(1)
  }
  
  const files = fs.readdirSync(config.hexoPostsDir)
  const mdFiles = files.filter(file => file.endsWith('.md'))
  
  console.log(`📚 找到 ${mdFiles.length} 篇文章需要迁移\n`)
  
  const results = []
  
  for (const file of mdFiles) {
    const filePath = path.join(config.hexoPostsDir, file)
    const result = await migratePost(filePath)
    if (result) {
      results.push(result)
    }
  }
  
  // 生成统计信息
  console.log('\n📊 迁移统计:')
  const categoryStats = {}
  results.forEach(result => {
    categoryStats[result.category] = (categoryStats[result.category] || 0) + 1
  })
  
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} 篇`)
  })
  
  console.log(`\n🎉 迁移完成! 成功迁移 ${results.length}/${mdFiles.length} 篇文章`)
  
  // 生成分类索引文件
  generateCategoryIndexes(categoryStats)
}

function generateCategoryIndexes(categoryStats) {
  console.log('\n📁 生成分类索引文件...')
  
  Object.keys(categoryStats).forEach(category => {
    const categoryDir = path.join(config.vitepressPostsDir, category)
    const indexFile = path.join(categoryDir, '_index.md')
    
    const content = `---
layout: page
title: ${category}
---

# ${category} 分类

共 ${categoryStats[category]} 篇文章

<!-- 文章列表将通过脚本自动生成 -->
`
    
    fs.writeFileSync(indexFile, content, 'utf8')
    console.log(`✅ 生成分类索引: ${category}/_index.md`)
  })
}

// 执行迁移
main().catch(error => {
  console.error('❌ 迁移过程出错:', error)
  process.exit(1)
})