<template>
  <div v-if="!loading" class="default-layout">
    <h2>Blog</h2>
    <h3 v-if="articles.length > 10" class="mb-4">Page {{ start }}</h3>
    <div class="grid grid-cols-2 gap-10">
      <nuxt-link v-for="article in articles" :key="article.id" :to="`/blog/${article.slug}`" class="flex gap-4 border">
        <div>
          <img :src="getStrapiMedia(article.preview_image.url)" alt="" class="image">
        </div>
        <div class="flex flex-col gap-6 p-4">
          <h3>{{article.title}}</h3>
          <p>{{article.preview_description}}</p>
          <div class="flex justify-center mt-auto">
            <span class="pr-4 mr-4 border-r border-black">тэг?</span>
            <span>{{getTime(article.published_at)}}</span>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div v-if="articles.length > 10" class="navigation">
      <nuxt-link v-if="start > 1" :to="`/blog/page/${start-1}`">пред страница</nuxt-link>
      <nuxt-link v-if="start < 2" :to="`/blog/page/${start+1}`">след страница</nuxt-link>
    </div>
  </div>
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'Index',
  components: {
    loading
  },
  data() {
    return {
      articles: [],
      start: 0
    }
  },
  async fetch() {
    try {
      this.$store.commit('setLoading', true)

      const count = 10
      this.start = +this.$route.params.page
      this.articles = await this.$strapi.find('articles',{_start: (this.start - 1) * count, _limit: count})
      if (this.articles.length === 0) {
       await this.$router.push('/blog')
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.commit('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading']),
  },
  methods: {
    getStrapiMedia,
    getTime(time){
      const date = new Date(time)
      return date.toLocaleDateString()
    }
  },
}
</script>

<style scoped>

</style>
