<template lang="html">
  <div class="news">
    <h2>記事</h2>
    <div class="posts" v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{post.title.rendered}}
          {{post.date}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app, params, env, error, store, redirect }) {
    let q = '';

    if(params.year && params.month) { //news/2018/10
      q = '?year=' + params.year + '&month=' + params.month;
    } else if(params.year && !params.month) { //news/2018
      q = '?year=' + params.year;
    } else if(!params.year && !params.month){ //news

    } else {
      return redirect(302, '/')
    }

    return app.$axios.get('http://localhost:8888/wp-json/wp/v2/article/' + q)
    .then( res => {
      return { posts: res.data }
    }).catch((e)=>{
      return error({ message: 'News not found', statusCode: 404 })
    })
  }
}
</script>
