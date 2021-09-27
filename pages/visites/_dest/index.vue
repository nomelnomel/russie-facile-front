<template>
  <div v-if="town">
    <h2>раздел экскурсий - страница направления</h2>
    <hr>
    {{ town.name }}
    <hr>
    <p v-if="town.excursionsContent"> {{ town.excursionsContent.description }} </p>
    <h2 class="font-bold">Экскурсии:</h2>
    <template v-if="town.excursions.length !== 0">
      <div v-for="excursion in town.excursions" :key="excursion.id">
        <nuxt-link :to="`${excursion.slug}`" class="text-blue-600">{{ excursion.name }}</nuxt-link>
      </div>
    </template>
    <div v-else>
      Для данного направления экскурсий нет
    </div>

  </div>
  <div v-else>
    грузим
  </div>
</template>

<script>
export default {
  name: 'VoyagesEndpoints',
  layout(context){
    return 'w_sidebar'
  },
  data() {
    return {
      town: null
    }
  },
  async fetch() {
    try {
      const data = await (this.$strapi.find('towns', {slug: this.$route.params.dest}))
      this.town = data[0]
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
