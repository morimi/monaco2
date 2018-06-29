<template lang="html">
  <div class="category">
    <h2>{{name}}</h2>
    <div class="posts" v-if="posts">
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{post.title.rendered}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  validate({ params, query, store }) {
    //true を返さないときは404 エラーページをロード
    return /^[\w\d\-]+/.test(query.slug) && store.state.categories[params.name].child.some((category) => category.slug === params.slug)
  },
  asyncData({ params, env, error, store }) {
    const cat = store.state.categories[params.name].child.find(cat => cat.slug === params.slug);
    console.log(cat)
    return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
    .then( res => {
      return Object.assign({ posts: res.data }, cat)
    }).catch((e)=>{
      return error({ message: 'Category not found', statusCode: 404 })
    })
  },

  // beforeRouteEnter (route, redirect, next) {
  //   console.log('beforeRouteEnter',route)
  //   next();
  // },

  beforeRouteUpdate (to, from, next) {
    const cat = this.$store.state.categories[to.params.name].child.find(cat => cat.slug === to.params.slug);

    axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
    .then( res => {
      this.posts = res.data;
      this.name = cat.name;
      this.slug = cat.slug;
      this.id = cat.id;
      next();
    }).catch((e)=>{
      next();
    })

  },

  head() {
    return {
      title: this.name
    }
  },

  methods: {
    fetchData(params) {
      const cat = this.$store.state.categories[params.name].child.find(cat => cat.slug === params.slug);
      console.log(cat)
      return axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
      .then( res => {
        return Object.assign({ posts: res.data }, cat)
      }).catch((e)=>{
        return error({ message: 'Category not found', statusCode: 404 })
      })
    }
  }
}
</script>

<style lang="css">
</style>
