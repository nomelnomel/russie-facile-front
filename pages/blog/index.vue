<template>
<div v-if="!loading" class="default-layout">
  blog
  <div v-for="article in articles" :key="article.id" class="article">
    {{article.title}}
  </div>
</div>
  <loading v-else/>
</template>

<script>
import {mapState} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'Index',
  components: {
    loading
  },
  data() {
    return {
      articles: null
    }
  },
  async fetch() {
    try{
      this.$store.commit('setLoading', true)
      // const number = 1
      // const count = 1
      this.articles = await this.$strapi.find('articles',{_start:0, _limit: 1})
    }catch (e) {
      console.log(e)
    }
    finally {
      this.$store.commit('setLoading', false)
    }
  },
  computed: {
    ...mapState(['loading'])
  },
  beforeMount() {
    this.$router.push('/blog/page/1')
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped>

</style>
