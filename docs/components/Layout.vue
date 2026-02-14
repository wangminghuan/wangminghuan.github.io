<template>
  <Layout>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from "vitepress/theme";
import NotFound from "./NotFound.vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();

const { Layout } = DefaultTheme;

</script>
