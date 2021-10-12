<template>
<div v-if="!loading" class="default-layout">
  <h2>{{article.title}}</h2>
  <div v-html="article.main">

  </div>
</div>
  <loading v-else/>
</template>

<script>
import {mapState} from 'vuex'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'Article',
  components: {
    loading
  },
  data() {
    return {
      article: null
    }
  },
  async fetch() {
    try {
      this.$store.commit('setLoading', true)

      const data = await this.$strapi.find('articles', {slug: this.$route.params.slug})
      this.article = data[0]
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.commit('setLoading', false)
    }
  },
  computed: {
    ...mapState(['loading'])
  },
}
</script>

<style scoped>

</style>
