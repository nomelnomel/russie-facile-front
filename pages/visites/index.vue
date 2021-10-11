<template>
  <div v-if="!loading" class="default-layout">

    <div v-for="town in towns" :key="town.id" class="mb-24">

      <img :src="getStrapiMedia(town.excursionsContent.image.url)" alt="" class="w-full">

      <nuxt-link :to="`visites/${town.slug}`">
        <h2>{{ town.name }}</h2>
      </nuxt-link>

      <p class="mb-8">
        {{ town.excursionsContent.description }}
      </p>

      <div v-if="town.excursions.length !== 0">

        <div class="cards__grid">

          <ButtonCircle :path="`visites/${town.slug}`">Voir tout les visits à<br>{{ town.name }}</ButtonCircle>

          <PreviewCard
            v-for="excursion in town.excursions.slice(0,3)"
            :key="excursion.id"
            :data="excursion"
            section-slug="visites"
            :town-slug="town.slug"
          />

        </div>

      </div>

    </div>

  </div>
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import PreviewCard from '~/components/ui/PreviewCard'
import ButtonCircle from '~/components/ui/ButtonCircle'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'Index',
  components: {
    PreviewCard,
    ButtonCircle,
    loading
  },
  data() {
    return {
      towns: null
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('setLoading', true)
      this.towns = await this.$strapi.$towns.find({_sort: 'order'})
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    } finally {
      await this.$store.dispatch('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">
</style>
