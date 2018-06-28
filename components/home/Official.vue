<template lang="html">
  <div class="timeline">
    home/official.vue
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('home/getData', 'official')
  }
}
</script>

<style lang="css">
</style>
