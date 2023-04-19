<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :max-width="width"
    :value="value"
    persistent
  >
    <v-card rounded="lg">
      <v-card-title class="primary px-8 py-2">
        <span class="text-md-body-1 white--text">{{ title }}</span>
      </v-card-title>
      <v-card-text class="pa-5 pb-0">
        <v-container>
          <slot></slot>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-8 pt-1 pb-7">
        <slot name="action"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: Number,
      required: true
    }
  },
  name: 'CreateProduct',
  
  data() {
    return {
      
    }
  },
}
</script>