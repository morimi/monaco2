<template>
  <section class="container">
    <pre>{{ agentInfo }}</pre>

    <official></official>

    <tweet></tweet>

    <videos></videos>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import Official from '@/components/home/Official'
import Tweet from '@/components/home/Tweet'
import Videos from '@/components/home/Video'

export default {
  components: { Official, Tweet, Videos },

  computed: {
    ...mapState(['agentInfo'])
  },

  head() {
    return {
      meta: [
        { hid: 'og_type', property: 'og:type', content: 'website' },
      ]
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('home/fetchData', 'official')
    await store.dispatch('home/fetchData', 'tweet')
    await store.dispatch('home/fetchData', 'video')
    //await store.dispatch('cateogries');
  }
}
</script>
