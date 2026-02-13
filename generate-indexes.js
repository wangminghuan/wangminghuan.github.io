#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDir = path.join(__dirname, 'docs', 'posts')
const categoriesDir = path.join(__dirname, 'docs', 'categories')
const archivesDir = path.join(__dirname, 'docs', 'archives')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function parseFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (!match) return null
  
  const frontMatterText = match[1]
  const frontMatter = {}
  
  frontMatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim()
      
      // 处理数组格式
      if (value.startsWith('-')) {
        value = value.split('\n').map(item => item.replace(/^\s*-\s*/, '').trim())
      }
      
      frontMatter[key.trim()] = value
    }
  })
  
  return frontMatter
}

function getAllPosts() {
  const posts = []
  
  function walkDir(dir, category = '') {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        walkDir(filePath, file)
      } else if (file.endsWith('.md') && file !== '_index.md') {
        const frontMatter = parseFrontMatter(filePath)
        if (frontMatter && frontMatter.title) {
          posts.push({
            title: frontMatter.title,
            date: frontMatter.date,
            categories: frontMatter.categories || [category],
            path: filePath.replace(postsDir, '/posts').replace(/\\.md$/, ''),
            category: category
          })
        }
      }
    })
  }
  
  walkDir(postsDir)
  
  // 按日期排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function generateCategoryPages(posts) {
  console.log('📁 生成分类页面...')
  
  const categories = {}
  
  posts.forEach(post => {
    const postCategories = Array.isArray(post.categories) ? post.categories : [post.categories]
    
    postCategories.forEach(category => {
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(post)
    })
  })
  
  // 生成主分类页面
  let categoriesContent = `---
layout: page
title: 分类
---

# 文章分类

`
  
  Object.keys(categories).sort().forEach(category => {
    categoriesContent += `## ${category}\n\n`
    categoriesContent += `- [${category}](/categories/${category}/) - ${categories[category].length} 篇文章\n\n`
  })
  
  fs.writeFileSync(path.join(categoriesDir, 'index.md'), categoriesContent, 'utf8')
  console.log('✅ 生成主分类页面')
  
  // 生成每个分类的子页面
  Object.entries(categories).forEach(([category, categoryPosts]) => {
    const categoryContent = `---
layout: page
title: ${category}
---

# ${category} 分类

共 ${categoryPosts.length} 篇文章\n\n`
    
    categoryPosts.forEach(post => {
      categoryContent += `- [${post.title}](${post.path}) - ${post.date}\n`
    })
    
    const categoryPageDir = path.join(categoriesDir, category)
    ensureDir(categoryPageDir)
    
    fs.writeFileSync(path.join(categoryPageDir, 'index.md'), categoryContent, 'utf8')
    console.log(`✅ 生成分类页面: ${category}`)
  })
}

function generateArchivePage(posts) {
  console.log('📅 生成归档页面...')
  
  const postsByYear = {}
  
  posts.forEach(post => {
    const year = post.date ? post.date.substring(0, 4) : '未知年份'
    if (!postsByYear[year]) {
      postsByYear[year] = []
    }
    postsByYear[year].push(post)
  })
  
  let archiveContent = `---
layout: page
title: 归档
---

# 文章归档

`
  
  Object.keys(postsByYear).sort((a, b) => b.localeCompare(a)).forEach(year => {
    archiveContent += `## ${year}年\n\n`
    
    const postsByMonth = {}
    postsByYear[year].forEach(post => {
      const month = post.date ? post.date.substring(5, 7) : '未知月份'
      if (!postsByMonth[month]) {
        postsByMonth[month] = []
      }
      postsByMonth[month].push(post)
    })
    
    Object.keys(postsByMonth).sort((a, b) => b.localeCompare(a)).forEach(month => {
      const monthName = getMonthName(month)
      archiveContent += `### ${monthName}\n\n`
      
      postsByMonth[month].forEach(post => {
        archiveContent += `- [${post.title}](${post.path}) - ${post.date}\n`
      })
      
      archiveContent += '\n'
    })
  })
  
  fs.writeFileSync(path.join(archivesDir, 'index.md'), archiveContent, 'utf8')
  console.log('✅ 生成归档页面')
}

function getMonthName(month) {
  const months = {
    '01': '一月', '02': '二月', '03': '三月', '04': '四月',
    '05': '五月', '06': '六月', '07': '七月', '08': '八月',
    '09': '九月', '10': '十月', '11': '十一月', '12': '十二月'
  }
  return months[month] || month
}

function generateHomePageList(posts) {
  console.log('🏠 更新首页最新文章列表...')
  
  const latestPosts = posts.slice(0, 10) // 最新10篇文章
  
  let homeContent = fs.readFileSync(path.join(__dirname, 'docs', 'index.md'), 'utf8')
  
  // 替换最新文章部分
  const latestPostsSection = `## 最新文章\n\n${latestPosts.map(post => `- [${post.title}](${post.path}) - ${post.date}`).join('\n')}\n\n`
  
  homeContent = homeContent.replace(/## 最新文章[\s\S]*?(?=##|$)/, latestPostsSection)
  
  fs.writeFileSync(path.join(__dirname, 'docs', 'index.md'), homeContent, 'utf8')
  console.log('✅ 更新首页最新文章列表')
}

async function main() {
  console.log('🚀 开始生成文章索引...\n')
  
  ensureDir(categoriesDir)
  ensureDir(archivesDir)
  
  const posts = getAllPosts()
  console.log(`📚 找到 ${posts.length} 篇文章\n`)
  
  generateCategoryPages(posts)
  generateArchivePage(posts)
  generateHomePageList(posts)
  
  console.log('\n🎉 索引生成完成!')
}

main().catch(error => {
  console.error('❌ 生成过程出错:', error)
  process.exit(1)
})