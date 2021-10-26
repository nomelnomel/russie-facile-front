<template>
  <div v-if="!loading" class="w-full mt-24 px-4 lg:w-2/3 lg:mt-32 lg:pr-0 xl:w-3/4 xl:pr-16 2xl:pr-0">
    <img :src="getStrapiMedia(excursion.image[0].url)" alt="" class="image">
    <div class="mb-4 pb-4 border-b border-dashed border-gray-300">
      <h2>{{ excursion.title }}</h2>
      <div class="program-header flex gap-4 md:gap-8">
        <div class="flex items-center gap-1">
          <clock/>
          {{ excursion.hours }}h
        </div>
        <div class="flex items-center gap-1">
          <transport/>
          {{ getTransport }}
        </div>
        <div class="flex items-center gap-1 lowercase">
          <geo/>
          {{ excursion.start }}
        </div>
      </div>
    </div>
    <div>
      <p v-for="text in excursion.description.split('\n\n')" :key="text" class="mb-4">
        {{ text }}
      </p>
    </div>
    <div id="prices" class="prices">
      <div class="prices-line prices-header">
        <div class="prices-item">
          Personnes
        </div>
        <div class="prices-item">
          Prix
        </div>
      </div>
      <div v-for="price in excursion.prices" :key="price.id" class="prices-line">
        <div class="prices-item">
          {{ price.count }}
        </div>
        <div class="prices-item">
          {{ price.price }}€
          <span>par persone</span>
        </div>
      </div>
    </div>
  </div>
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'
import geo from '~/components/svg-icons/geo'
import clock from '~/components/svg-icons/clock'
import transport from '~/components/svg-icons/transport'

export default {
  name: 'ExcursionEndpoints',
  components: {
    loading,
    geo,
    clock,
    transport
  },
  layout: 'w_sidebar',
  data() {
    return {
      excursion: null
    }
  },
  async fetch() {
    try {
      this.$store.commit('setLoading', true)
      const data = await this.$strapi.find('excursions', {slug: this.$route.params.slug})
      this.excursion = data[0]
      // console.log(data[0])

      const sidebar = {
        page: 'excursion',
        price_from: data[0].price_from,
        title: data[0].title
      }
      this.$store.commit('sidebar/setSidebar', sidebar)
    } catch (e) {
      console.log(e)
    } finally {
      this.$store.commit('setLoading', false)
    }
  },
  head() {
    return{
      title: this.metaTitle || 'Russie Facile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        }
      ],
    }
  },
  computed: {
    ...mapGetters(['loading']),
    getTransport() {
      if (this.excursion.transport === 'legs') return 'à pied'
      else if (this.excursion.transport === 'car') return 'en voiture'
      else return 'en hydroglisseur'
    }
  },
  methods: {
    getStrapiMedia
  },
}
</script>

<style scoped lang="scss">
.image {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.prices {
  @apply flex flex-col mt-4;

  @screen md {
    @apply mt-8
  }

  &-line {
    @apply flex;

    &:nth-child(even) {
      @apply bg-green-50
    }
  }

  &-header {
    @apply text-sm;

    @screen md {
      @apply text-xl;
    }
  }

  &-item {
    @apply flex-1 py-4 flex items-center text-center justify-center flex-col font-bold border border-black;

    @screen md {
      @apply text-xl
    }

    &:first-child {
      max-width: 90px;
      @screen md {
        max-width: unset;
      }
    }

    span {
      @apply text-sm font-normal
    }
  }
}
</style>
