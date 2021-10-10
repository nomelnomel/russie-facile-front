<template>
  <div v-if="sidebar" class="sidebar">
    <div v-if="sidebar.page === 'program'" class="sidebar-program">
      <div class="flex items-center flex-col">
        <h3 class="mb-2 hidden lg:inline-block">Prix</h3>
        <div>
          de
          <span class="text-primary font-bold text-lg">{{ sidebar.price_from }}</span>
          à
          <span class="text-primary font-bold text-lg">{{ sidebar.price_to }} €</span>
        </div>
        <span class="text-xs">par persone</span>
        <button v-scroll-to="{el: '#prices', offset: -500}" class="bg-primary py-2 px-4 rounded-sm text-white font-bold mt-2">Смотреть</button>
      </div>
      <div class="flex-col hidden mb-2 lg:flex">
        <h3 class="text-center my-2 ">Плюшки</h3>
        <div class="flex"><check/><span>Плюшка 1</span></div>
        <div class="flex"><check/><span>Плюшка 2</span></div>
        <div class="flex"><check/><span>Плюшка 3</span></div>
      </div>
      <div class="flex flex-col items-center gap-2">
<!--        <h3>Закажите сейчас</h3>-->
        <button class="bg-primary py-2 px-4 rounded-sm text-white font-bold" @click="isPopup = true">Commander</button>
      </div>
    </div>
    <div v-if="sidebar.page === 'voyages'" class="text-center p-2">
      Voir aussi à
      <h3>{{sidebar.name}}</h3>
      <nuxt-link :to="`/visites/${sidebar.slug}`" class="mt-8 py-8 px-4 border border-black flex items-center justify-center">Visites</nuxt-link>
    </div>
    <div v-if="sidebar.page === 'visites'">
      Voir aussi à
      <h3>{{sidebar.name}}</h3>
      <nuxt-link :to="`/voyages/${sidebar.slug}`" class="mt-8 py-8 px-4 border border-black flex items-center justify-center">Voyages</nuxt-link>
    </div>
    <RequestPopup :is-popup="isPopup" :title="sidebar.title" @close="isPopup = false"/>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import RequestPopup from '~/components/RequestPopup'
import check from '~/components/svg-icons/check'

export default {
  name: 'Sidebar',
  components:{
    RequestPopup,
    check
  },
  data() {
    return {
      isPopup: false
    }
  },
  computed: {
    ...mapState('sidebar', ['sidebar']),
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  @apply border fixed bottom-0 left-0 h-24 w-full flex z-10 bg-white;

  @screen lg{
    @apply sticky block w-1/5 h-full mt-8 top-64 right-0;
  }

  &-program {
    @apply flex items-center justify-between w-full px-4;

    @screen md{
      @apply px-16
    }

    @screen lg{
      @apply flex-col p-4
    }
  }
}
</style>
