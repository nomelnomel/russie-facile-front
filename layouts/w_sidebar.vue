<template>
  <div>
    <Header/>
   <div class="relative content-w-sidebar-container mx-auto flex justify-between 2xl:px-44 md:px-4">
     <Nuxt />
     <Sidebar/>
   </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'

export default {
  name: 'WSidebar',
  components: {
    Header,
    Footer,
    Sidebar
  }
}
</script>

<style scoped lang="scss">
.content-w-sidebar-container{
}
</style>
