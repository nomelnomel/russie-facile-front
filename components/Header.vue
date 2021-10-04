<template>
  <div class="header" :class="{scrolled: isScrolled}">
    <nuxt-link to="/" class="w-1/4 h-auto border border-black p-4">
      Logo
    </nuxt-link>
    <div class="menu">
      <nuxt-link to="/voyages" class="group-hover:underline">Voyages</nuxt-link>
      <nuxt-link to="/visites">Visites</nuxt-link>
      <nuxt-link to="/blog">Blog</nuxt-link>
      <nuxt-link to="/a-propos">à propos</nuxt-link>
      <nuxt-link to="/contacts">contacts</nuxt-link>
    </div>
    <span class="cursor-pointer md:hidden" @click="open">
      <burger/>
    </span>
    <div v-if="showDrawer" class="drawer absolute top-0 right-0 z-20 w-full" @click="showDrawer = false">
      <div
        class="drawer-container w-1/2 bg-gray-400 flex flex-col gap-10 items-center p-8 absolute right-0 top-0 h-full"
        @click.stop
      >
        <span class="absolute top-4 right-4 cursor-pointer" @click="showDrawer=false">
          <close/>
        </span>
        <nuxt-link to="/voyages">Voyages</nuxt-link>
        <nuxt-link to="/visites">Visites</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <nuxt-link to="/a-propos">à propos</nuxt-link>
        <nuxt-link to="/contacts">contacts</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import burger from '~/components/svg-icons/burger'
import close from '~/components/svg-icons/close'

export default {
  name: 'Header',
  components: {
    burger,
    close
  },
  data() {
    return {
      isScrolled: false,
      showDrawer: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (window.scrollY > 50) {
        this.isScrolled = true
      } else this.isScrolled = false
    },
    open() {
      this.showDrawer = true
      console.log('11')
    }
  },
}
</script>

<style scoped lang="scss">

.header {
  @apply flex items-center fixed top-0 left-0 w-full z-10 bg-gray-200 shadow-xl justify-between px-10;

  @screen md {
    @apply container left-1/2;
    transform: translateX(-50%);
  }

  @screen lg {
    @apply mx-auto px-32 py-4 border;

  }

  .menu {
    @apply hidden;

    @screen md {
      @apply flex justify-evenly w-5/6 capitalize;
    }
  }

  .drawer {
    height: 200vw;
    background-color: #ccccccbd;
  }

  a {
    cursor: pointer;
    text-transform: capitalize;
    //border: 1px solid black;
    &:hover {
      text-decoration: underline;
    }
  }
}

.scrolled {
  @screen lg {
    @apply py-1
  }
}


</style>
