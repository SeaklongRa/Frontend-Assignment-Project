<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :prepend-inner-icon="left_icon"
    :label="label"
    :rules="rules"
    :outlined="outlined"
    :dense="dense"
  >
    <slot></slot>
  </v-text-field>
</template>

<script>
export default {
  props: {
    left_icon: {
      type: String,
    },
    label: {
      type: String,
      default: () => "Name",
    },
    rules: {
      type: Array,
    },
    outlined: {
      type: Boolean,
      default: () => true,
    },
    dense: {
      type: Boolean,
      default: () => true,
    }
  },
}
</script>