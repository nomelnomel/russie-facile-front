<template>
  <div v-if="articles.length > 0" class="default-layout">
    страница {{start}}
    {{articles}}
    <div v-for="article in articles" :key="article.id" class="article">
      {{article.title}}
    </div>

    <div class="navigation">
      <nuxt-link v-if="start > 1" :to="`/blog/page/${start-1}`">пред страница</nuxt-link>
      <nuxt-link v-if="start < 2" :to="`/blog/page/${start+1}`">след страница</nuxt-link>
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
      articles: [],
      start: 0
    }
  },
  async fetch() {
    const count = 1
    this.start = +this.$route.params.page
    this.articles = await this.$strapi.$articles.find({_start:(this.start-1) * count, _limit: count})
    if(this.articles.length === 0){
      this.$router.push('/blog')
    }
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped>

</style>
