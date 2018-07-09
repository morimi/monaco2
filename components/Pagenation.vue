<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <ul class="uk-pagination uk-flex-center" uk-margin>

      <li v-if="showFirstLast && page > (pageRange + 1)">
        <router-link :to="{ name: router_name, query: { page: 1 }, params: router_params}">
          <span uk-pagination-last>First</span>
        </router-link>
      </li>

      <li v-if="showPrevNext">
         <router-link v-if="page > 1" :to="{ name: router_name, query: { page: page - 1 }, params: router_params}">
           <span uk-pagination-previous>Prev</span>
         </router-link>
         <a v-else class="disabled"><span uk-pagination-prev>Prev</span></a>
      </li>

      <li v-for="(num, i) in pages" :key="i" :class="{'active': num === page}">
        <span v-if="0 > num">&hellip;</span>
        <nuxt-link v-if="0 < num && num != page" :to="{ name: router_name, query: { page: num }, params: router_params }" v-html="num"></nuxt-link>
        <span v-if="0 < num && num == page" aria-current="page">{{num}}</span>
      </li>

      <li v-if="showPrevNext">
        <router-link v-if="hasNext" :to="{ name: router_name, query: { page: page + 1 }, params: router_params}">
          <span uk-pagination-next>Next</span>
        </router-link>
        <a v-else class="disabled"><span uk-pagination-next>Next</span></a>
      </li>

      <li v-if="showFirstLast && (page < totalPage - pageRange)">
        <router-link :to="{ name: router_name, query: { page: totalPage }, params: router_params}">
          <span uk-pagination-last>Last</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

  props: {

    //現在のページ $route.query.page
    page: {
      type: [Number,String],
      default: 1
    },
    //最大ページ数
    totalPage: {
      type: Number,
      rquired: true
    },

    //nuxt-link :to="{name: router_name}"
    router_name: {
      type: String,
      required: true
    },
    //nuxt-link :to="{params: router_params}"
    router_params: {
      type: Object,
       default: () => {
         return {}
       }
    },

    //pageから前後何件表示するか
    pageRange: {
      type: Number,
      default: 2
    },

    showPrevNext: {
      type: Boolean,
      default: false
    },

    showFirstLast: {
      type: Boolean,
      default: true
    },

  },

  computed: {
    hasNext() {
      return this.page < this.totalPage
    },
    pages () {
      let nums = [];
      let page = parseInt(this.page);
      let start = page - this.pageRange,
          end = page + this.pageRange

      if(end > this.totalPage) {
        end = this.totalPage;
        start = this.totalPage - this.pageRange * 2
        start = start < 1 ? 1 : start
      }

      if(start <= 1) {
        start = 1
        end = Math.min(this.pageRange * 2 + 1, this.totalPage)
      }

      for (let i = start; i <= end; i++) {
        nums.push(i)
      }

      return nums
    }
  }
}
</script>
