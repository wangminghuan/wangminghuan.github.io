<template>
  <VPHero name="WMH's Blog" text="个人技术博客" :image="image" :actions="actions" />
  <VPFeatures :features="featureConfig" />
</template>

<script setup>
import VPHero from 'vitepress/dist/client/theme-default/components/VPHero.vue'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import featureConfig from '../.vitepress/theme/feature.js'
const image = { light: '/pic1.svg', dark: '/pic2.svg' }
const actions = [
  {
    theme: 'brand',
    text: '随便逛逛',
    link: randomPage(),
  },
  {
    theme: "alt",
    text: '访问GitHub',
    link: 'https://github.com/wangminghuan',
  },
]

function randomPage(){
  const length = featureConfig.length - 1
  const item = featureConfig[Math.floor(Math.random() * length)]
  return item?.link || '/'
}
</script>

<style>
.VPFeatures a.VPFeature{
  text-decoration: none;
}
.vp-doc .actions .action a.VPButton{
 text-decoration: none;
}
.vp-doc h2 {
  margin: 0;
  border: none;
  padding: 0;
}
</style>
