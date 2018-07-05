const site_name = 'AppsMate[アップスメイト]'
const site_description = '「アプリの話題がわかる」情報メディア'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: site_name + ' - ' + site_description,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: site_description },
      { hid: 'og_locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og_site_name', property: 'og:site_name', content: 'AppsMate'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    site_name: site_name,
    site_description: site_description,
    api_url: 'http://localhost:8888'
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  router: {
    middleware: [ 'user-agent', 'agentInfo']
  },

  vendor: ['vuex', 'axios'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
