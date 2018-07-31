<template lang="html">
  <div class="news">
    <h2>{{post.title}}</h2>
    <div class="content" v-html="post.content">

    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app, params, env, error, store, redirect }) {

    if(store.state.news.length) {
      return {
        post: store.state.news.find(
          item => item.appname === params.app && item.date_params.year === params.year && item.date_params.month === params.month && item.date_params.day === params.day && item.date_params.time === params.time
        )
      };
    }

    let q = '&appname=' + params.app + '&year=' + params.year + '&month=' + params.month + '&day=' + params.day + '&time=' + params.time;

    return app.$axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed' + q)
    .then( res => {
      return { post: res.data.shift() }
    }).catch((e)=>{
      return error({ message: 'News not found', statusCode: 404 })
    })
  },

  //ルーター経由移動
  beforeRouteUpdate (to, from, next) {

    if(store.state.news.length) {
      return store.state.news.find(
        item => item.date_params.year === to.params.year && item.date_params.month === to.params.month && item.date_params.day === to.params.day && item.date_params.time === to.params.time
      );
    }

    let q = '&appname=' + to.params.app + '&year=' + to.params.year + '&month=' + to.params.month + '&day=' + to.params.day + '&time=' + to.params.time;

    return app.$axios.get('http://localhost:8888/wp-json/wp/v2/news/?_embed' + q)
    .then( res => {
      this.post = res.data.shift()
      next();
    }).catch((e)=>{
      next();
    })
  }
}
</script>
