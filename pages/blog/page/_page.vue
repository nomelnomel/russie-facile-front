<template>
  <div v-if="!loading" class="default-layout">
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
  <loading v-else />
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'Index',
  components:{
    loading
  },
  data() {
    return {
      articles: [],
      start: 0
    }
  },
  async fetch() {
    this.$store.commit('setLoading', true)
    try{
      const count = 1
      this.start = +this.$route.params.page
      this.articles = await this.$strapi.$articles.find({_start:(this.start-1) * count, _limit: count})
      if(this.articles.length === 0){
        this.$router.push('/blog')
      }
    }catch (e) {
      console.log(e)
    }finally {
      this.$store.commit('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    getStrapiMedia
  },
}
</script>

<style scoped>

</style>
