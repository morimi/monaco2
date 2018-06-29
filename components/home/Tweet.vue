<template lang="html">
  <section id="newest-user-tweet" class="timeline-content">
    <h2 class="h2">
      最新ユーザーツイート
    </h2>
    <transition name="slide-fade">
      <div class="content-inner">
        <div class="timeline" :class="{'is-loaded': tweet.length || error.tweet }">
          <pre class="" v-for="item in tweet" :key="item.id_str">
            {{item.user.name}}
          </pre>
        </div>
        <div class="icon-loading-dots"></div>
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
      'tweet',
      'error'
    ])
  }
}
</script>

<style lang="css">
</style>
