<template>
<div class="footer border-t flex flex-col items-center justify-center mt-16 pt-8">
  <div class="logo p-4 border border-black mb-8">Logo</div>
  <div class="links flex flex-col gap-8 items-center">
    <nuxt-link to="/voyages">Voyages</nuxt-link>
    <nuxt-link to="/visites">Visites</nuxt-link>
    <nuxt-link to="/blog">Blog</nuxt-link>
    <nuxt-link to="/a-propos">À Propos</nuxt-link>
    <nuxt-link to="/contacts">Contacts</nuxt-link>
  </div>
  <div class="socials border-t border-primary mt-4 pt-4 flex items-center gap-8">
    <a href="#">IG</a>
    <a href="#">FB</a>
  </div>
  <div class="copy w-full border-t py-4 mt-4 flex items-center justify-center">
    <span>&copy; Russie Facile 2021</span>
  </div>
</div>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>

</style>
