<template>
  <div>
    <l-app-layout v-if="isNotLoginRoute">
      <div id="app">
        <router-view/>
      </div>
    </l-app-layout>
    <div id="app" v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
import LAppLayout from '@/components/layout/LAppLayout.vue'


export default {
  name: 'app',
  components: {
    LAppLayout
  },
  data () {
    return {
      userToken: ''
    }
  },
  computed: {
    isNotLoginRoute() {
      return this.$route.name !== 'login'
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
