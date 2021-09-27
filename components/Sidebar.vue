<template>
  <div v-if="sidebar"
       class="border fixed bottom-0 left-0 h-24 w-full flex z-10 bg-white lg:sticky lg:block lg:w-1/5 lg:h-full lg:mt-8 lg:top-8 lg:right-0">
    <div v-if="sidebar.page === 'program'" class="flex px-16 items-center justify-between w-full lg:flex-col lg:p-4">
        <div class="flex items-center flex-col">
          <h3>Prix</h3>
          <span>de <span class="text-primary">{{ sidebar.price_from }}</span> à {{ sidebar.price_to }} €</span>
          <span class="text-xs">par persone</span>
        </div>
        <div class="flex-col hidden lg:flex">
          <h3 class="text-center">Плюшки</h3>
          <span>Плюшка 1</span>
          <span>Плюшка 2</span>
          <span>Плюшка 3</span>
        </div>
        <div class="flex-col items-center lg:flex">
          <h3>Закажите сейчас</h3>
          <button class="bg-primary">Commander</button>
        </div>
    </div>
    <div v-if="sidebar.page === 'destination'">
      я сайдбар направления
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['sidebar']),
  }
}
</script>

<style scoped>
/*.sidebar{*/
/*  max-width: 20%;*/
/*}*/
</style>
