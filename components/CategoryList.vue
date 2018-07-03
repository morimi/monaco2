<template lang="html">
  <div class="category-list">
    <ul class="cat-list">
      <li v-for="cat in categories" :key="cat.id">
        <nuxt-link :to="{ name: 'category-name', params: {name: cat.slug, slug:null} }" v-if="cat.type === 'post'">{{cat.name}}</nuxt-link>
        <nuxt-link :to="{ name: cat.type , params: {name: cat.slug, slug:null} }" v-else>{{cat.name}}</nuxt-link>

        <ul class="child" v-if="cat.type === 'post'">
          <li v-for="child in cat.child" :key="child.id">
            <nuxt-link :to="{ name: 'category-name-slug', params: {name: cat.slug, slug: child.slug} }">{{child.name}}</nuxt-link>
          </li>
        </ul>
        <ul class="child"  v-else>
          <li v-for="child in cat.child" :key="child.id">
            <nuxt-link :to="{ name: cat.type + '-year-month', params: {year: child.year, month: child.month} }">{{child.name}}</nuxt-link>
          </li>
        </ul>
      </li>

    </ul>
  </div>
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
