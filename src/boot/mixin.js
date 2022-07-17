// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app }) => {
  app.mixin({
    data () {
      return {
        controls: ['touch', 'keys', 'km']
      }
    },
    methods: {
      openLink (url, target = '_blank') {
        open(url, target)
      },
      GetIDFromYouTubeLink (url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        const match = url.match(regExp)
        return (match && match[7].length === 11) ? match[7] : false
      },
      getLevelColor (level) {
        const cls = []
        if (level <= 5) {
          cls.push({ 'text-yellow-8': true })
        } else if (level <= 10) {
          cls.push({ 'text-blue': true })
        } else {
          cls.push({ 'text-red-6': true })
        }
        return cls
      },
      getLevelFilter (level) {
        const cls = []
        if (level <= 5) {
          cls.push({ 'filter-nm': true })
        } else if (level <= 10) {
          cls.push({ 'filter-hd': true })
        } else {
          cls.push({ 'filter-mx': true })
        }
        return cls
      },
      getControlIcon (control, level) {
        let icon = ''
        switch (control) {
          case 0:
            icon = 'touch_app'
            break
          case 1:
            icon = 'keyboard'
            break
          case 2:
            icon = 'img:./assets/icons/KM.svg'
            break
        }
        return icon
      },
      updateLocale (value) {
        this.$i18n.locale = value
        this.$store.commit('user/setLocale', value)
      },
      getYouTubeThumbnail (ytid) {
        return `http://i3.ytimg.com/vi/${ytid}/hqdefault.jpg`
      }
    },
    computed: {
      user () {
        return this.$store.getters['user/getUserData']
      }
    },
    beforeEnter (to, from, next) {
      if (to.meta.login && this.user._id.length === 0) {
        next('/')
      } else {
        next()
      }
    },
    async mounted (to, from, next) {
      if (process.env.CLIENT) {
        await this.$recaptchaLoaded()
        if (this.$route?.meta?.recaptcha && this.user.isLogin) {
          this.$recaptchaInstance.showBadge()
        } else {
          this.$recaptchaInstance.hideBadge()
        }
      }
    }
  })
}
