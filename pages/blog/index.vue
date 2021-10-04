<template>
<div v-if="articles" class="default-layout">
  blog
  <div v-for="article in articles" :key="article.id" class="article">
    {{article.title}}
  </div>
</div>
  <div v-else>
    грузим
  </div>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'Index',
  data() {
    return {
      articles: null
    }
  },
  async fetch() {
    // const number = 1
    // const count = 1
    this.articles = await this.$strapi.$articles.find({_start:0, _limit: 1})
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped>

</style>
