<template lang="html">
  <section id="newest-official-tweet" class="timeline-content">
    <h2 class="h2">
      公式ツイート
    </h2>
    <transition name="slide-fade">
      <div class="content-inner">
        <div class="timeline" :class="{'is-loaded': official.length || error.official }">
          <pre class="" v-for="item in official" :key="item.id_str">
            {{item.user.name}}
          </pre>
        </div>
        <div class="icon-loading-dots"></div>
      </div>
    </transition>
  </section>

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('app', [
      'official',
      'error'
    ])
  }
}
</script>

<style lang="css">
</style>
