<template>
  <div v-if="!loading" class="w-full mt-24 px-4 lg:w-2/3 lg:mt-32 lg:pr-0 xl:w-3/4 xl:pr-16 2xl:pr-0">
    <h2>Visites à {{ town.name }}</h2>
    <p v-if="town.excursionsContent"> {{ town.excursionsContent.description }} </p>
    <template v-if="town.excursions.length !== 0">
      <div class="cards__grid cards__grid_withsidebar">
        <PreviewCard
          v-for="excursion in town.excursions"
          :key="excursion.id"
          :data="excursion"
          :town-slug="town.slug"
        />
      </div>
    </template>
    <div v-else>
      Для данного направления экскурсий нет
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

      const sidebar = {...data[0], page: 'visites'}
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

.card {
  @apply border shadow-md hover:shadow-lg rounded-md overflow-hidden flex flex-col h-full;

  &:hover {
    .cta {
      background-color: #14cfe9;
    }
  }

  &__image {
    @apply object-cover w-full xl:max-h-52 sm:max-h-48;
    max-width: unset;
  }

  &__badge {
    @apply absolute top-2 right-2 bg-blue-100 p-2
  }

}
</style>
