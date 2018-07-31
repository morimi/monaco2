<template lang="html">
  <div class="app">
    <div class="app-info">
      <h2>{{entry.title}}</h2>
    </div>
    <div class="content" v-html="entry.content"></div>
    <div class="review" v-if="app_info">
      <h3>ユーザーレビュー</h3>
      <div class="review-item" v-for="(review, index) in app_info.review" :key="index">
        <p>{{review.title}} {{review.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      entry: null,
      app_info: null,
      app_type: null
    }
  },

  //直アクセス
  // params : { app: 'game', slug: 'onmyoji-game' }
  async asyncData({ app, params, env, error, store, redirect }) {
    let cat;
    console.log('app.asyncData', params)

    //ゲームのslugがない→カテゴリーに飛ばす
    if(! params.slug) {
      return redirect(302, '/category/' + params.app)
    }

    try{
      let entry;

      //記事データがstoreにない→リクエスト
      if(! params.hasOwnProperty('entry')) {
        let wp_entry = await app.$axios.get('http://localhost:8888/wp-json/wp/v2/posts/?slug=' + params.slug )
        entry = wp_entry.data.shift();
      } else {
        entry = params.entry
      }

      //アプリ情報を得る
      let app_info = await app.$axios.get('http://13.113.241.23/api/app-info?os=ios&appId=' + entry.appstore_id )

      return { entry: entry, app_info: app_info.data, app_type: params.name}

    } catch(e) {
      return error({ message: '404 not found', statusCode: 404 })
    }

  },

  //ルーター経由アクセス
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
    next();
  }

}
</script>
