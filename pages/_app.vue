<template lang="html">
  <div class="app">
    <h2>{{post.title}}</h2>
    <div class="content" v-html="post.content">

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  //直アクセス
  asyncData({ params, env, error, store, redirect }) {
    let cat;
    console.log('app.asyncData', params)
    // params : { app: 'game', slug: 'onmyoji-game' }

    if(! params.slug) {
      return redirect(302, '/category/' + params.app)
    }

    if(params.hasOwnProperty('post')) {
      return { post: params.post, app_type: params.name}
    }

    return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?slug=' + params.slug )
    .then( res => {
      return { post: res.data.shift(), app_type: params.name }
    }).catch((e)=>{
      return error({ message: 'Category not found', statusCode: 404 })
    })
  },

  //ルーター経由アクセス
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to, from)
  //   next();
  // }

}
</script>
