<template lang="html">
  <div class="news">
    <h2>ニュース</h2>
    <div class="posts" v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <nuxt-link
            :to="{
              name: 'news-app-year-month-day-time',
              params: {
                app: post.appname.slug,
                year: post.date_params.year,
                month: post.date_params.month,
                day: post.date_params.day,
                time: post.date_params.time }
              }
            "
          >
            <p>{{post.title}}</p>
            <p>{{post.appname.name}}</p>
            <p>{{post.date}}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  asyncData({ params, env, error, store, redirect }) {
  console.log(params)

    return axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed')
    .then( res => {
      store.commit('setNews', res.data);
      return { posts: res.data }
    }).catch((e)=>{
      return error({ message: 'News not found', statusCode: 404 })
    })
  },

  //ルーター経由移動
  beforeRouteUpdate (to, from, next) {

    return axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed')
    .then( res => {
      this.posts = res.data;
      next();
    }).catch((e)=>{
      next();
    })
  }
}
</script>
