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
    this.$store.commit('setLoading', true)
    try{
      // const number = 1
      // const count = 1
      this.articles = await this.$strapi.$articles.find({_start:0, _limit: 1})
    }catch (e) {
      console.log(e)
    }
    finally {
      this.$store.commit('setLoading', false)
    }
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped>

</style>
