<template>
  <div class="pa-4">
    <v-card outlined class="rounded-lg pa-2">
      <v-card-title>
        <v-row class="fill-height" align="center">
          <v-col cols="auto" class="pa-0">
            <span class="primary--text">{{title}}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="pa-0">
            <!-- <v-btn color="primary">Create</v-btn> -->
            <slot name="action"></slot>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    <div class="mb-4"></div>
    <v-card outlined class="rounded-lg pa-2">
      <slot></slot>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>