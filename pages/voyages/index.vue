<template>
  <div v-if="!loading" class="default-layout">

    <div v-for="town in towns" :key="town.id" class="mb-24">

      <img :src="getStrapiMedia(town.toursContent.image.url)" alt="" class="w-full">

      <nuxt-link :to="`voyages/${town.slug}`">
        <h2>{{ town.name }}</h2>
      </nuxt-link>

      <p class="mb-8">
        {{ town.toursContent.description }}
      </p>

      <div v-if="town.tours.length !== 0">

        <div class="cards__grid">

          <ButtonCircle :path="`voyages/${town.slug}`">Voir tout les voyages à {{ town.name }}</ButtonCircle>

          <PreviewCard
            v-for="tour in town.tours.slice(0,3)"
            :key="tour.id"
            :data="tour"
            section-slug="voyages"
            :town-slug="town.slug"
          >
            <template #card-info>
              <div class="card__badge card__badge_left">{{tour.daysCount}} jours</div>
            </template>
          </PreviewCard>

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
      this.$store.commit('setLoading', true)

      this.towns = await this.$strapi.find('towns',{_sort: 'order'})
    } catch (e) {
      console.log(e)
    } finally {
     this.$store.commit('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    getStrapiMedia
  },
}
</script>

<style scoped lang="scss">

</style>
