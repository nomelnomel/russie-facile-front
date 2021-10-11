<template>
  <nuxt-link :to="getLink" class="card">
    <div>
      <slot v-if="data.price_from" name="card-price">
        <div class="card__badge card__badge_right" v-html="getPrice"></div>
      </slot>
      <slot name="card-info"/>
      <img :src="getStrapiMedia(data.preview_image.url)" alt="" class="card__image">
    </div>
    <div class="card__bottom">
      <h3>{{ data.title }}</h3>
      <button class="cta">EN SAVOIR PLUS</button>
    </div>
  </nuxt-link>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'PreviewCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    townSlug: {
      type: String,
      default: ''
    },
    sectionSlug: {
      type: String,
      default: ''
    }
  },
  computed: {
    getPrice() {
      return this.data.price_to
        ?
        `de <span>${this.data.price_from}</span> à <span>${this.data.price_to}€</span>`
        :
        `de <span>${this.data.price_from}€</span>`
    },
    getLink() {
      return this.sectionSlug
        ?
        `${this.sectionSlug}/${this.townSlug}/${this.data.slug}`
        :
        `${this.townSlug}/${this.data.slug}`
    }
  },
  methods: {
    getStrapiMedia
  },
}
</script>

<style scoped lang="scss">

</style>
