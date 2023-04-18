import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#145593',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        cancel: '#BCC0C5'
      },
    },
  },
  
  icons: {
    iconfont: 'mdiSvg', // 'mdi'  'mdiSvg'  'md'  'fa'  'fa4' || 'faSvg'
  },
  
});
