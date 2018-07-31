<template lang="html">
  <div class="page page-category" data-temp="category">

    <h2 class="page-title" v-if="category">「{{category.title}}」のアプリ一覧</h2>

    <lazy-wrapper :loading="loading">

      <div class="list-container" v-if="entries.length">
        <article v-for="entry in entries" :key="entry.id" :data-id="entry.id" class="entry">
          <nuxt-link :to="{ name: 'app-slug', params: {app: parent, slug: entry.slug, entry: entry}}">{{entry.title}}</nuxt-link>
        </article>
      </div>

      <div class="error-info" v-if="error">
        {{ error.message }}
      </div>

      <pagenation
        v-if="entries.length"
        :page="this.page"
        :router_name="'category' + ($route.params.parent ? '-parent' : ($route.params.slug ? '-slug' : '' ))"
        :router_params="{ parent: $route.params.parent, slug: $route.params.slug }"
        :totalPage="category.totalPage"></pagenation>

    </lazy-wrapper>

    <category-list v-if="!category"></category-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex'
import LazyWrapper from "~/components/LazyWrapper"
import CategoryList from '@/components/CategoryList'
import Pagenation from '@/components/Pagenation'

export default {
  components: {
    CategoryList,
    Pagenation,
    LazyWrapper
  },
  computed: {
    ...mapState('category', [ 'error', 'loading']),
    ...mapGetters('category', ['category']),

    parent() {
      return this.$route.params.parent
    },

    slug() {
      return this.$route.params.slug || 'all';
    },

    page() {
      return this.$route.params.page || 1;
    },

    entries() {
      return (this.parent && this.slug) ? this.$store.state.category[this.parent][this.slug][this.page] : []
    }
  },

  //ロード
  async fetch ({ store, error, params:{ parent, slug, page = 1} }) {

  console.log('fetch', parent, slug, page)

   await store.dispatch('category/fetchCategories', { parent, slug, page })

  },


  //ルーター経由移動
   async beforeRouteUpdate (to, from, next) {
     let params = to.params,
         parent = params.parent,
         slug = params.slug,
         page = params.page || 1;
     console.log('beforeRouteUpdate', parent, slug, page)

    await this.$store.dispatch('category/fetchCategories', { parent, slug, page })
    return next();

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
