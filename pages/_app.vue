<template lang="html">
  <div class="app">
    <div class="app-info">
      <h2>{{post.title}}</h2>
    </div>
    <div class="content" v-html="post.content"></div>
    <div class="review" v-if="app_info">
      <h3>ユーザーレビュー</h3>
      <div class="review-item" v-for="(review, index) in app_info.review" :key="index">
        <p>{{review.title}} {{review.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  data() {
    return {
      post: null,
      app_info: null,
      app_type: null
    }
  },

  //直アクセス
  async asyncData({ params, env, error, store, redirect }) {
    let cat;
    console.log('app.asyncData', params)
    // params : { app: 'game', slug: 'onmyoji-game' }

    if(! params.slug) {
      return redirect(302, '/category/' + params.app)
    }

    try{
      let post;

      if(! params.hasOwnProperty('post')) {
        let wp_post = await axios.get('http://localhost:8888/wp-json/wp/v2/posts/?slug=' + params.slug )
        post = wp_post.data.shift();
      } else {
        post = params.post
      }

      let app_info = await axios.get('http://13.113.241.23/api/app-info?os=ios&appId=' + post.appstore_id )

      return { post: post, app_info: app_info.data, app_type: params.name}

    } catch(e) {
      return error({ message: 'Category not found', statusCode: 404 })
    }

    // return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?slug=' + params.slug )
    // .then( res => {
    //   return { post: res.data.shift(), app_type: params.name }
    // }).catch((e)=>{
    //   return error({ message: 'Category not found', statusCode: 404 })
    // })
  },

  //ルーター経由アクセス
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
    next();
  }

}
</script>
