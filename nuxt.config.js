export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  server: {
    port: 5000
  },
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,400&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap',
      },
    ]
  },
  loading: '@/components/svg-icons/loading',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/globals.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-awesome-swiper',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/strapi',
    ['vue-scrollto/nuxt', { duration: 1000 }],
    ['nuxt-lazy-load', {defaultImage: '/default-image.jpg',}],
    '@nuxtjs/redirect-module'
  ],
  redirect: [
    // { from: '/blog', to: '/blog/page/1' }
  ],
  strapi: {
    url: process.env.API_URL || "http://localhost:1337",
    entities: [
      'towns',
      'tours',
      'excursions',
      'articles'
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
