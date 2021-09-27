<template>
  <div v-if="towns" class="default-layout">
    <div v-for="town in towns" :key="town.id" class="mb-24">
      <img :src="getStrapiMedia(town.excursionsContent.image.url)" alt="">
      <nuxt-link :to="`visites/${town.slug}`"><h2>{{ town.name }}</h2></nuxt-link>
      <p class="mb-8">{{ town.excursionsContent.description }}</p>
      <div v-if="town.excursions.length !== 0">
<!--        <p class="mb-8">лучшие экскурсии в {{ town.name }}:</p>-->
        <div class="flex gap-4">
          <nuxt-link
            v-for="excursion in town.excursions"
            :key="excursion.id"
            :to="`visites/${town.slug}/${excursion.slug}`"
            class="border flex flex-col gap-3 shadow-md"
          >
            <img :src="getStrapiMedia(excursion.preview_image.url)" alt="">
            <p class="ml-3 px-3">{{ excursion.title }}</p>
            <button class="mt-auto">Подробнее -></button>
          </nuxt-link>
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

export default {
  name: 'Index',
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
