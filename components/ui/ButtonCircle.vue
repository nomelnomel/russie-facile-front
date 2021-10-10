<template>
  <nuxt-link :to="path"
             class="btn-round">
    <slot/>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ButtonCircle',
  props: {
    path: {
      type: String,
      default: '#'
    },
  },
}
</script>

<style scoped lang="scss">
.btn-round {
  @apply flex items-center justify-center text-center rounded-full shadow-xl self-center justify-self-center font-bold;
  width: 220px;
  height: 220px;
  background-color: #31aabbab;
  position: relative;
  overflow: hidden;

  &:after{
    content: "";
    background: #31aabb;
    position: absolute;
    z-index: -1;
    display: block;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.5s ease;
    transform: scale(0, 0);
    height: auto;
    width: auto;
  }

  &:hover::after {
    transition: all .5s ease-out;
    transform: scale(1.5, 1.5);
    left: 0;
    width: auto;
  }
}
</style>
