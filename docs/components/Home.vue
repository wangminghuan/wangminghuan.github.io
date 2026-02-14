<template>
  <VPHero name="XaviDocs" text="个人技术文档" :image="image" :actions="actions" />
  <VPFeatures v-if="pages.length > 0" :features="pages" />
  <div v-else class="no-content">
    <h2>暂无文章</h2>
    <p>请在 posts 目录中添加 Markdown 文章</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'

// 使用动态导入避免构建时错误
const pages = ref([])

onMounted(async () => {
  try {
    const { data } = await import('../.vitepress/create.data.js')
    pages.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to load data:', error)
    pages.value = []
  }
})

const tagline = `累计更新${pages.value.length}篇文章`
const image = { light: '/pic1.svg', dark: '/pic2.svg' }
const actions = [
  {
    text: '随便逛逛',
    link: randomPage(),
  },
]

function randomPage(){
  if (pages.value.length === 0) return '/'
  const length = pages.value.length
  const randomIndex = Math.floor(Math.random() * length)
  const page = pages.value[randomIndex]
  return page?.link || '/'
}
</script>

<style>
.no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.details {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.vp-doc h2 {
  margin: 0;
  border: none;
  padding: 0;
}
</style>

<style>
.details {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.vp-doc h2 {
  margin: 0;
  border: none;
  padding: 0;
}
</style>