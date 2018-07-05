<template lang="html">
  <div class="page page-category" data-temp="category">

    <h2 class="page-title">「{{category.title}}」のアプリ一覧</h2>

    <div class="list-container" v-if="entries && entries.length">
      <article v-for="entry in entries" :key="entry.id" :data-id="entry.id" class="entry">
        <nuxt-link :to="{ name: 'app-slug', params: {app: app_type, slug: entry.slug, entry: entry}}">{{entry.title}}</nuxt-link>
      </article>
    </div>
    <div class="error-info" v-else>
      <p>登録がありません</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('archive', {
      entries: 'category_entries'
    }),
    ...mapState('archive', ['app_type', 'category', 'error'])
  },

  //ロード
  async fetch ({ store, params, error }) {

    await store.dispatch('archive/fetchCategoryArchive', params)

    if(error) {
      error(store.state.archive.error)
    }
  },

  //ルーター経由移動
  async beforeRouteUpdate (to, from, next) {

    await this.$store.dispatch('archive/fetchCategoryArchive', to.params)
    next();

  },

  head() {
    return {
      title: '「' + this.category.title + '」のアプリ一覧',
      meta: [
        { hid: 'og_type', property: 'og:type', content: 'object' },
        { hid: 'og_title', property: 'og:title', content: '「' + this.category.title + '」のアプリ一覧'},
      ]
    }
  },
}
</script>
