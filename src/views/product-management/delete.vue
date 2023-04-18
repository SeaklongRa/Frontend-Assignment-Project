<template>
  <l-dialog
    v-model="openDialog"
    :width="340"
    title="Delete"
  >
    <template>
      <v-form>
        <v-row align="center" justify="center" class="ma-auto">
          <v-col cols="5" class="pt-0 text-end">
            <v-icon size="80" color="amber">mdi-alert</v-icon>
          </v-col>
          <v-col cols="7" class="pt-0">
            <span class="pr-0 text-subtitle-1 font-weight-bold">Are you sure?</span>
            <v-spacer></v-spacer>
            <span class="pr-0 text-caption">You won't be able to revet this!</span>
          </v-col>
        </v-row>
      </v-form>
    </template>
    <template #action>
      <l-button
        outlined
        @click="onCancel"
        class="px-8"
      >
        Cancel
      </l-button>
      <v-spacer></v-spacer>
      <l-button
        @click="deleteProduct"
        class="px-8"
      >
        Delete
      </l-button>
    </template>
  </l-dialog>
</template>

<script>
import LDialog from '@/components/dialog/LDialog.vue'
import LButton from '@/components/button/LButton.vue'

export default {
  name: 'DeleteProduct',
  components: {
    LDialog,
    LButton
  },
  props: {
    value: {
      type: Boolean,
      default: () => true
    },
    id: {
      type: Number,
      default: () => null
    }
  },
  watch: {
    value: function(val) {
      this.openDialog = val
    }
  },
  data() {
    return {
      openDialog: this.value
    }
  },
  methods: {
    onCancel() {
      this.$emit('input', false)
    },
    deleteProduct(){
      this.$store.dispatch('deleteProduct', {id: this.id})
      this.$emit('input', false)
    },
  }
}
</script>