<template lang="html">
  <div class="category-list">
    <ul class="cat-list">
      <li v-for="cat in categories" :key="cat.id">
        {{cat.data.name}}
        <ul class="child">
          <li v-for="child in cat.child" :key="child.id">
            <nuxt-link :to="{ name: 'category-name-slug', params: {name: cat.data.slug, slug: child.slug} }">{{child.name}}</nuxt-link>
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
