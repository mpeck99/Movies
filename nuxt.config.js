const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Peck Movies',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet'},
      { rel: 'stylesheet', href: href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Staatliches&display=swap" rel="stylesheet' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff6b6b' },

  /*
  ** Global CSS
  */
  css: ['vuetify/src/stylus/main.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
 
  publicRuntimeConfig: {
  },
  privateRuntimeConfig: {
    apiKey: process.env.API_KEY
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }, 

  styleResources: {
    scss: []
  },

}
