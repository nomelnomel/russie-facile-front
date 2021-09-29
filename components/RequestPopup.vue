<template>
<div v-if="isPopup" class="popup fixed top-0 left-0 w-full h-full flex items-center justify-center" @click="$emit('close')">
  <form action="" class="p-4 rounded-2xl flex flex-col shadow-2xl bg-primary" @click.stop>
    <input type="text" placeholder="Votre Nom">
    <input type="email" placeholder="Votre email">
    <input type="text" :value="title">
  </form>
</div>
</template>

<script>
export default {
  name: 'RequestPopup',
  props: {
    isPopup: {
      type: Boolean,
      default: true
    },
    title:{
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped lang="scss">
.popup{
  background-color: #ccccccbd;
}

form{
  min-width: 300px;

  input{
    @apply mb-4 p-2 rounded
  }
}
</style>
