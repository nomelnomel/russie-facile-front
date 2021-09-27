<template>
  <div v-if="excursion">
    <h2>страница экскурсии</h2>
    {{excursion.title}}
  </div>
  <div v-else>
    грузим
  </div>
</template>

<script>
export default {
  name: "ExcursionEndpoints",
  layout(context){
    return 'w_sidebar'
  },
  data() {
    return {
      excursion: null
    }
  },
  async fetch(){
    try {
      const data = await this.$strapi.find('excursions', {slug: this.$route.params.slug})
      this.$store.commit('setSidebar', data[0])
      console.log(data)
      this.excursion = data[0]
    }catch (e) {
      console.log(e)
    }
  },
  computed: {
    slug() {
      return this.$route.params
    }
  }
}
</script>

<style scoped>

</style>
