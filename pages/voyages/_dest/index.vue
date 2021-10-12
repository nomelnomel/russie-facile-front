<template>
  <div v-if="!loading" class="w-full mt-24 px-4 lg:w-2/3 lg:mt-32 lg:pr-0 xl:w-3/4 xl:pr-16 2xl:pr-0">
    <h2>Voyages à {{ town.name }}</h2>
    <p v-if="town.toursContent"> {{ town.toursContent.description }} </p>
    <h2 class="font-bold">Программы:</h2>
    <template v-if="town.tours.length !== 0">
      <div class="cards__grid cards__grid_withsidebar">
        <PreviewCard v-for="tour in town.tours" :key="tour.id" :town-slug="town.slug" :data="tour">
          <template #card-info>
            <div class="card__badge card__badge_left">{{ tour.daysCount }} jours</div>
          </template>
        </PreviewCard>
      </div>
    </template>
    <div v-else>
      Для данного направления програм нет
    </div>
  </div>
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'
import PreviewCard from '~/components/ui/PreviewCard'

export default {
  name: 'VoyagesEndpoints',
  components: {
    loading,
    PreviewCard
  },
  layout: 'w_sidebar',
  data() {
    return {
      town: null,
    }
  },
  async fetch() {
    try {
      this.$store.commit('setLoading', true)

      const data = await this.$strapi.find('towns', {slug: this.$route.params.dest})
      this.town = data[0]
      // console.log(data[0])

      const sidebar = {...data[0], page: 'voyages'}
      this.$store.commit('sidebar/setSidebar', sidebar)
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
