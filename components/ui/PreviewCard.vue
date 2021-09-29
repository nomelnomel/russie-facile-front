<template>
    <nuxt-link
      :to="`${sectionSlug}/${townSlug}/${data.slug}`"
      class="border flex flex-col gap-3 shadow-md"
    >
      <img :src="getStrapiMedia(data.preview_image.url)" alt="">
      <p class="ml-3">{{ data.title }}</p>
      <button class="mt-auto">Подробнее -></button>
    </nuxt-link>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'

export default {
name: "PreviewCard",
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    townSlug: {
      type: String,
      default: ''
    },
    sectionSlug:{
      type: String,
      default: ''
    }
  },
  methods: {
  getStrapiMedia
  },
}
</script>

<style scoped>

</style>
