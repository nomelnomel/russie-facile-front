<template>
<div class="flex items-center container mx-auto px-32 py-8 border">
  <nuxt-link to="/" class="w-1/6 h-auto border border-black p-8">
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
  name: 'Header'
}
</script>

<style scoped lang="scss">

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
