<template>
    <nuxt-link
      :to="`${sectionSlug}/${townSlug}/${data.slug}`"
      class="border flex flex-col gap-3 shadow-md"
    >
      <img :src="getStrapiMedia(data.preview_image.url)" alt="" class="image">
      <div class="flex flex-col pt-2 pb-4 justify-between h-full px-4">
        <p>{{ data.title }}</p>
        <button class="cta">Подробнее</button>
      </div>
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
.image{
  aspect-ratio: 4/3;
  object-fit: cover;
}
</style>
