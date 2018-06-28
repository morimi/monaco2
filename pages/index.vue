<template>
  <section class="container">
    <pre>{{ agentInfo }}</pre>
    <official></official>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Official from '@/components/home/Official'

export default {
  components: { Official },
  computed: {
    ...mapState(['agentInfo'])
  },
  asyncData({ store, route }) {
    return {
    }
  }
}
</script>

<style>
</style>
