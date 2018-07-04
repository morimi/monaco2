<template>
  <div class="site">
    <site-header></site-header>
    <main class="site-main" role="main">
      <nuxt/>
    </main>
    <category-list></category-list>
  </div>
</template>
<script>
import SiteHeader from '~/components/SiteHeader.vue'
import CategoryList from '@/components/CategoryList'

export default {
  components: {
    SiteHeader,
    CategoryList
  }
}
</script>
<style>

</style>
