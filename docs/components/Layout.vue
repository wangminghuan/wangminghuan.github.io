<template>
  <Layout>
    <template #not-found>
      <NotFound />
    </template>
    <template #doc-after>
      <BackTop />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import NotFound from "./NotFound.vue";
import BackTop from "./BackTop.vue";
const { Layout } = DefaultTheme;
</script>
