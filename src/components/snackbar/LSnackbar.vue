<template>
  <div name="snackbar">
    <v-snackbar
      v-model="show"
      :color="color"
      :timeout="timeout"
      bottom
      height="40"
      right
    >
      <v-icon size="40" class="pr-2 pl-1">{{ icon }}</v-icon>
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import LButton from '../button/LButton.vue'
  
export default {
  name: 'SnackbarPage',
  computed: {
    ...mapActions(['snackbar'])
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/SHOW_MESSAGE") {
        this.text = state.snackbar.text || 'Logged in successfully'
        this.color = state.snackbar.color || 'success'
        this.icon = state.snackbar.icon || 'mdi-check'
        this.timeout = state.snackbar.timeout || 1500
        this.show = true
      }
    })
  },
  data() {
    return {
      show: false,
      color: '',
      text: '',
      timeout: -1,
      icon: ''
    }
  }
}
</script>