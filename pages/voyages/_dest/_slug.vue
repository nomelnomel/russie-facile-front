<template>
  <div v-if="town">
        {{ town.name }}
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, et.</p>
        <h2 class="font-bold">Программы:</h2>
        <template v-if="town.tours.length != 0">
          <div v-for="tour in town.tours" :key="tour.id">
            <nuxt-link :to="`${town.slug}/${tour.slug}`" class="text-blue-600">{{tour.name}}</nuxt-link>
          </div>
        </template>
        <div v-else>
          Для данного направления програм нет
        </div>
  </div>
  <div v-else>
    грузим
  </div>
</template>

<script>
export default {
  name: "VoyagesEndpoints",
  data() {
    return {
      town: null
    }
  },
  async mounted(){
    try {
      const data = await (this.$strapi.find('towns', {slug: this.$route.params.slug}))
      this.town = data[0]
    }catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
