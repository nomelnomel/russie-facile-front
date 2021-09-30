<template>
  <div>
    <Header/>
   <div class="default-layout-w-sidebar">
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
