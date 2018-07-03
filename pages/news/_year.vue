<template lang="html">
  <div class="news">
    <h2>{{year}}年<span v-if="month">{{month}}月</span>のニュース</h2>
    <div class="posts" v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <nuxt-link :to="{ name: 'news-app-year-month-day-time', params: { app: post.appname.slug, year: post.date_params.year, month: post.date_params.month, day: post.date_params.day, time: post.date_params.time }}">
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
    let q = '';

console.log(params)
    if(params.year && params.month) { //news/2018/10
      q = '&year=' + params.year + '&month=' + params.month;
    } else if(params.year && !params.month) { //news/2018
      q = '&year=' + params.year;
    } else if(!params.year && !params.month){ //news
      //http://localhost:8888/news/knivesout/2018/05/30/213516/
    } else {
      return redirect(302, '/')
    }

    return axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed' + q)
    .then( res => {
      return { posts: res.data, month: params.month, year: params.year }
    }).catch((e)=>{
      return error({ message: 'News not found', statusCode: 404 })
    })
  },

  //ルーター経由移動
  beforeRouteUpdate (to, from, next) {
    let q = '';

    if(to.params.year && to.params.month) { //news/2018/10
      q = '&year=' + to.params.year + '&month=' + to.params.month;
    } else if(to.params.year && !to.params.month) { //news/2018
      q = '&year=' + params.year;
    } else if(!to.params.year && !to.params.month){ //news
      //http://localhost:8888/news/knivesout/2018/05/30/213516/
    } else {
      return redirect(302, '/')
    }

    return axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed' + q)
    .then( res => {
      this.posts = res.data;
      this.month = to.params.month;
      this.year = to.params.year;
      next();
    }).catch((e)=>{
      next();
    })
  }
}
</script>
