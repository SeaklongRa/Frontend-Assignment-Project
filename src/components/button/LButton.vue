<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="color"
    :outlined="outlined"
    dark
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'LButton',
  props: {
    color: {
      type: String,
      default: () => 'primary'
    },
    outlined: {
      type: Boolean,
    },
    minWidth: {
      type: Number,
    },
  }
}
</script>