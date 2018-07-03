<template lang="html">
  <div class="" data-temp="category">
    <h2>「{{name}}」のアプリ一覧</h2>
    <div class="posts" v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id" :data-id="post.id">
          <nuxt-link :to="{ name: 'app-slug', params: {app: app_type, slug: post.slug}}">{{post.title}}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  asyncData({ params, env, error, store, redirect }) {
    let cat;

    //game/onmyoji-game
    if(params.name && params.slug) {
       cat = store.state.categories[params.name].child.find(cat => cat.slug === params.slug);

    //game
    } else if(/^(game|app)$/.test(params.name) && !params.slug) {
       cat = store.state.categories[params.name];
    }

    //カテゴリ情報がない
    if(!cat) {
      return redirect(302, '/')
    }

    return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
    .then( res => {
      return Object.assign({ posts: res.data, app_type: params.name }, cat)
    }).catch((e)=>{
      return error({ message: 'Category not found', statusCode: 404 })
    })
  },

  //ルーター経由移動
  beforeRouteUpdate (to, from, next) {
    let cat;

    if(to.name.indexOf('category') !== -1) {
      if(to.params.name && to.params.slug) {
         cat = this.$store.state.categories[to.params.name].child.find(cat => cat.slug === to.params.slug);

      } else if(/^(game|app)$/.test(to.params.name) && !to.params.slug) {
         cat = this.$store.state.categories[to.params.name];
      }

      axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
      .then( res => {
        this.app_type = to.params.name; //app|game
        this.posts = res.data;
        this.name = cat.name;
        this.slug = cat.slug;
        this.id = cat.id;
        next();
      }).catch((e)=>{
        next();
      })
    }
  },

  head() {
    return {
      title: this.name,
      meta: [
        { hid: 'og_type', property: 'og:type', content: 'object' },
        { hid: 'og_title', property: 'og:title', content: '「' + this.name + '」のアプリ一覧'},
      ]
    }
  },
}
</script>
