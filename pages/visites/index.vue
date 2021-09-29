<template>
  <div v-if="towns" class="default-layout">
    <div v-for="town in towns" :key="town.id" class="mb-24">
      <img :src="getStrapiMedia(town.excursionsContent.image.url)" alt="" class="w-full">
      <nuxt-link :to="`visites/${town.slug}`"><h2>{{ town.name }}</h2></nuxt-link>
      <p class="mb-8">{{ town.excursionsContent.description }}</p>
      <div v-if="town.excursions.length !== 0">
      <div class="cards-grid grid-cols-4">
        <nuxt-link :to="`visites/${town.slug}`" class="flex items-center">
          Посмотреть все экскурсии
        </nuxt-link>
          <PreviewCard
            v-for="excursion in town.excursions.slice(0,3)"
            :key="excursion.id"
            :data="excursion"
            section-slug="visites"
            :town-slug="town.slug"
          />
      </div>
      </div>
      <div v-else>
        Для данного направления экскурсий нет
      </div>
    </div>
  </div>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'
import PreviewCard from '~/components/ui/PreviewCard'

export default {
  name: 'Index',
  components:{
    PreviewCard
  },
  data() {
    return {
      towns: null
    }
  },
  async fetch() {
    this.towns = await this.$strapi.$towns.find({_sort: 'order'})
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">
</style>
