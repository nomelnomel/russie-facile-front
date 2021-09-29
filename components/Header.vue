<template>
<div class="header" :class="{scrolled: isScrolled}">
  <nuxt-link to="/" class="w-1/6 h-auto border border-black p-4">
    Logo
  </nuxt-link>
    <div class="flex justify-evenly w-5/6 capitalize group menu">
      <nuxt-link to="/voyages" class="group-hover:underline">Voyages</nuxt-link>
      <nuxt-link to="/visites">Visites</nuxt-link>
      <nuxt-link to="/a-propos">à propos</nuxt-link>
      <nuxt-link to="/contacts">contacts</nuxt-link>
    </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if(window.scrollY > 50) {
        this.isScrolled = true
      }
      else this.isScrolled = false
    }
  },
}
</script>

<style scoped lang="scss">

.header{
  @screen lg{
    @apply flex items-center container mx-auto px-32 py-4 border fixed top-0 z-10 bg-gray-200 shadow-xl;
    left: 50%;
    transform: translateX(-50%);
  }
}

.scrolled{
  @screen lg{
    @apply py-1
  }
}

.menu{
  a{
    cursor: pointer;
    //border: 1px solid black;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>
