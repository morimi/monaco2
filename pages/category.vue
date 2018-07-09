<template lang="html">
  <div class="page page-category" data-temp="category">

    <h2 class="page-title" v-if="category">「{{category.title}}」のアプリ一覧</h2>
    <div class="list-container" v-if="entries.length">
      <article v-for="entry in entries" :key="entry.id" :data-id="entry.id" class="entry">
        <nuxt-link :to="{ name: 'app-slug', params: {app: app_type, slug: entry.slug, entry: entry}}">{{entry.title}}</nuxt-link>
      </article>
    </div>
    <div class="error-info" v-else>
      <p>登録がありません</p>
    </div>
    <pagenation
      v-if="entries.length"
      :page="$route.query.page"
      :router_name="'category' + ($route.params.parent ? '-parent' : ($route.params.slug ? '-slug' : '' ))"
      :router_params="{ parent: $route.params.parent, slug: $route.params.slug }"
      :totalPage="totalPage"></pagenation>

    <category-list v-if="!category"></category-list>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
import CategoryList from '@/components/CategoryList'
import Pagenation from '@/components/Pagenation'

export default {
  components: {
    CategoryList,
    Pagenation
  },

  computed: {
    ...mapState('archive', {
      entries: 'category_entries'
    }),
    ...mapState('archive', ['app_type', 'category', 'error', 'totalPage']),

  },

  //ロード
  async fetch ({ store, params, error, query }) {
    let page = query.page || 1;

    await store.dispatch('archive/fetchCategoryArchive', { params, page })

    if(error) {
      error(store.state.archive.error)
    }
  },

  //ルーター経由移動
  async beforeRouteUpdate (to, from, next) {
    let params = to.params, page = to.query.page || 1;

    await this.$store.dispatch('archive/fetchCategoryArchive', { params, page })
    next();

  },


  head() {
    let title = this.category ? '「' + this.category.title + '」のアプリ一覧' : 'カテゴリー一覧';
    return {
      title: title,
      meta: [
        { hid: 'og_type', property: 'og:type', content: 'object' },
        { hid: 'og_title', property: 'og:title', content: title },
      ]
    }
  },
}
</script>
