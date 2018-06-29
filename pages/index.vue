<template>
  <section class="container">
    <pre>{{ agentInfo }}</pre>

    <section id="newest-official-info" class="timeline-content">
      <h2 class="h2">
        最新アプリ公式情報
      </h2>
      <transition name="slide-fade">
        <div class="content-inner">
          <official></official>
          <div class="icon-loading-dots"></div>
        </div>
      </transition>
    </section>

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

  async fetch({ store, params }) {
    await store.dispatch('home/getData', 'tweet')
    await store.dispatch('home/getData', 'video')
    //await store.dispatch('cateogries');
  }
}
</script>

<style>
</style>
