<template lang="html">
  <nav class="widget widget-category-list">
    <h2 class="widget-title">カテゴリー一覧</h2>

    <ul class="category-list">
      <li v-for="cat in categories" :key="cat.id" class="category-nav">
        <nuxt-link :to="{ name: 'category-name', params: {name: cat.slug, slug:null} }" v-if="cat.type === 'post'">{{cat.name}}</nuxt-link>
        <nuxt-link :to="{ name: cat.type , params: {name: cat.slug, slug:null} }" v-else>{{cat.name}}</nuxt-link>

        <ul class="list list--child" v-if="cat.type === 'post'">
          <li v-for="child in cat.child" :key="child.id" class="list__item">
            <nuxt-link :to="{ name: 'category-name-slug', params: {name: cat.slug, slug: child.slug} }">{{child.name}}</nuxt-link>
          </li>
        </ul>
        <ul class="list list--child"  v-else>
          <li v-for="child in cat.child" :key="child.id" class="list__item">
            <nuxt-link :to="{ name: cat.type + '-year-month', params: {year: child.year, month: child.month} }">{{child.name}}</nuxt-link>
          </li>
        </ul>

        <p class="btn-arrow-link">
          <nuxt-link :to="{ name: 'category-name', params: {name: cat.slug, slug:null} }" v-if="cat.type === 'post'">すべて見る<span class="icon icom-arrow"></span></nuxt-link>
          <nuxt-link :to="{ name: cat.type , params: {name: cat.slug, slug:null} }" v-else>すべて見る<span class="icon icom-arrow"></span></nuxt-link>
        </p>
      </li>
    </ul>

  </nav>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['categories'])
  },

  mounted() {

  }
}
</script>

<style lang="css">
</style>
