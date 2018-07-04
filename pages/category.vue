<template lang="html">
  <div class="page page-category" data-temp="category">

    <h2>「{{category.name}}」のアプリ一覧</h2>

    <div class="list-container" v-if="posts">
      <article v-for="post in posts" :key="post.id" :data-id="post.id">
        <nuxt-link :to="{ name: 'app-slug', params: {app: app_type, slug: post.slug, post: post}}">{{post.title}}</nuxt-link>
      </article>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('archive', ['posts', 'app_type', 'category', 'error'])
  },
  // asyncData({ params, env, error, store, redirect }) {
  //   let cat;
  //
  //   //game/onmyoji-game
  //   if(params.name && params.slug) {
  //      cat = store.state.categories[params.name].child.find(cat => cat.slug === params.slug);
  //
  //   //game
  //   } else if(/^(game|app)$/.test(params.name) && !params.slug) {
  //      cat = store.state.categories[params.name];
  //   }
  //
  //   //カテゴリ情報がない
  //   if(!cat) {
  //     return redirect(302, '/')
  //   }
  //
  //   return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
  //   .then( res => {
  //     return Object.assign({ posts: res.data, app_type: params.name }, cat)
  //   }).catch((e)=>{
  //     return error({ message: 'Category not found', statusCode: 404 })
  //   })
  // },
  async fetch ({ store, params, error }) {

    await store.dispatch('archive/fetchArchive', params)

    if(error) {
      error(store.state.archive.error)
    }
  },

  //ルーター経由移動
  async beforeRouteUpdate (to, from, next) {

    await this.$store.dispatch('archive/fetchArchive', to.params)
    next();

  },

  head() {
    return {
      title: '「' + this.category.name + '」のアプリ一覧',
      meta: [
        { hid: 'og_type', property: 'og:type', content: 'object' },
        { hid: 'og_title', property: 'og:title', content: '「' + this.category.name + '」のアプリ一覧'},
      ]
    }
  },
}
</script>
