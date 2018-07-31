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

  manifest: {
    name: site_name,
    "short_name": "AppsMate",
    description: site_description,
    theme_color: "#188269",
    "orientation": "portrait",
    "start_url": "http://localhost:4000/",
    "display": "standalone",
    "gcm_sender_id": "103953800507",
    "theme_color": "#ffffff",
    "background_color": "#ffffff"
  },

  env: {
    site_name: site_name,
    site_description: site_description
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: [
    '@nuxtjs/component-cache',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  plugins: [
    { src: '~/plugins/router-sync.js', ssr: true },
  ],

  vendor: [
    'vuex'
  ],

  axios: {
    progress: false,
    baseURL: 'http://localhost:8888/',
    //prefix: '/api',
  },

  serverMiddleware: ["~/common/apicache.js"],

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
  },

  render: {
    middleware: [ 'user-agent', 'agentInfo']
    ,static: {
      maxAge: "1w",
      setHeaders(res, path) {
        if (path.includes("sw.js")) {
          res.setHeader("Cache-Control", `public, max-age=${15 * 60}`)
        }
      }
    }
  }
}
