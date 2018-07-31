<template lang="html">
  <section id="newest-video" class="timeline-content">
    <h2 class="h2">
      最新の関連動画
    </h2>
    <transition name="slide-fade">
      <div class="content-inner">
        <div class="timeline">
          <pre class="" v-for="item in video" :key="item.id_str">
            {{item.snippet.title}}
          </pre>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('home')

export default {
  computed: {
    ...mapState([
      'video',
      'error'
    ])
  }
}
</script>

<style lang="css">
</style>
