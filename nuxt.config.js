export default {
  target: 'static',
  head: {
    title: 'Gregory Colombe ~ Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: "<b>Gregory Colombe Portfolio</b> --- I'm front end developer based in Paris. Currently studying at Gobelins Paris." },
      { name: 'author', content: 'Gregory Colombe' },
      { property: 'og:title', content: 'Gregory Colombe ~ Portfolio' },
      { property: 'og:description', content: "<b>Gregory Colombe Portfolio</b> --- I'm front end developer based in Paris. Currently studying at Gobelins Paris." },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Gregory Colombe ~ Portfolio' },
      { name: 'keywords', content: 'Gregory, Colombe, Portfolio, developer, developpeur, web, creatif, creative' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/styles/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/styles/config/_variables.scss',
      '~/assets/styles/config/_fonts.scss',
      '~/assets/styles/config/_breakpoints.scss',
      '~/assets/styles/config/_mixins.scss'
    ]
  },
  stylelint: {
    files: ['**/*.scss'],
    failOnError: false
  },
  plugins: [
    // '~/plugins/contentful.js',
    '~/plugins/webgl.client.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/svg'
    // '@nuxtjs/prismic'
  ],

  // prismic: {
  //   endpoint: process.env.PRISMIC_URL,
  //   modern: true
  // },

  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' }
    ],
    lazy: true,
    langDir: 'i18n',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: {
      fallbackLocale: 'en',
      fallbackRoot: true,
      silentFallbackWarn: true
    }
  },

  build: {
    transpile: ['three'],
    postcss: false,
    extend (config) {
      /**
       * GLSL loader
       */
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      })
    }
  },

  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_TOKEN: process.env.CTF_TOKEN
  }
}
