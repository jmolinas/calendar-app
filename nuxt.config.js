require('dotenv').config();
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/axios',
    '~plugins/api-query.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.CALENDAR_API + '/api/v1/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: process.env.CALENDAR_API + '/api/v1/auth/logout',
            method: 'post'
          },
          user: {
            url: process.env.CALENDAR_API + '/api/v1/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        globalToken: true,
        tokenName: 'Authorization',
        redirect: {
          login: '/login',
          home: 'false',
          logout: '/login'
        }
      }
    }
  },
  router: {
    middleware: ['auth'],
    linkActiveClass: 'active'
  }
}
