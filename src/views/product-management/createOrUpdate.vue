<template>
  <div>
    <l-dialog
      v-model="openDialog"
      :width="800"
      :title="isEdit ? 'Update Product' : 'Create Product'"
    >
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <l-text-field
              label="Name"
              v-model="form.name"
              :rules="[
                  (v) => !!v || 'Name is required'
                ]"
              >
            </l-text-field>
          </v-col>
          <v-col cols="6">
            <l-text-field
              type="number"
              label="Price"
              v-model="form.price"
              prefix="$"
              hide-spin-buttons
              :rules="[
                (v) => !!v || 'Price is required'
              ]"
            >
            </l-text-field>
          </v-col>
          <v-col cols="6">
            <l-text-field
              type="number"
              label="Quantity"
              v-model="form.quantity"
              hide-spin-buttons
              :rules="[
                (v) => !!v || 'Quantity is required'
              ]"
            >
            </l-text-field>
          </v-col>
          <v-col cols="6">
            <v-file-input
              label="File input"
              type="file"
              accept="image/*"
              prepend-icon
              ref="fileInput"
              v-model="form.image"
              @change="onFileSelected"
              outlined
              dense
              :rules="[
                (v) => !!v || 'Image is required'
              ]"
            ></v-file-input>
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-textarea
              outlined
              label="Description"
              v-model="form.description"
              counter
              :rules="[
                (v) => !!v || 'Description is required'
              ]"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
      <template #action>
        <v-spacer></v-spacer>
        <l-button
          outlined
          @click="onCancel"
        >
          Cancel
        </l-button>
        <l-button
          elevation=1
          @click="saveProduct"
        >
          {{ isEdit ? 'Update' : 'Create' }}
        </l-button>
      </template>
    </l-dialog>
    <l-snackbar />
  </div>
</template>

<script>
import LDialog from '@/components/dialog/LDialog.vue'
import LTextField from '@/components/form/LTextField.vue'
import LButton from '@/components/button/LButton.vue'
import { mapActions } from 'vuex'
import LSnackbar from '@/components/snackbar/LSnackbar.vue'

export default {
  name: 'CreateOrUpdate',
  components: {
    LDialog,
    LTextField,
    LButton,
    LSnackbar
  },
  props: {
    value: {
      type: Boolean,
      default: () => true
    },
    items: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      openDialog: false,
      form: {
        id: null,
        name: '',
        description: '',
        price: null,
        quantity: null,
        image: null
      },
      nameImage: null,
    }
  },
  watch: {
    value: function(val) {
      this.openDialog = val
      if(val){
        this.form = {
          id: this.items.id,
          name: this.items.name,
          description: this.items.description,
          price: this.items.price,
          quantity: this.items.quantity
        }
        if (this.items.image){
          this.form.image = new File(["file"], `${this.items.image}`, {type: "text/plain",})
          this.nameImage = this.items.image
        }
      }
      if(this.$refs['form']){
        this.$refs.form.resetValidation()
      }
    }
  },
  methods: {
    onFileSelected() {
      if(event.target && event.target.files) {
        this.nameImage = event.target.files[0]?.name
      } else {
        this.nameImage = null
      }
    },
    onCancel() {
      this.form.image = null
      this.$emit('input', false)
    },
    saveProduct() {
      if (this.isEdit) {
        if (this.$refs.form.validate()) {
          const formData = {
            id: this.form.id,
            name: this.form.name,
            description: this.form.description,
            price: parseInt(this.form.price),
            quantity: parseInt(this.form.quantity),
            image: this.nameImage
          }
          this.$store.dispatch('updateProduct', formData)
          this.$emit('input', false)
        }
        else {
          this.saveDetails('Updated fail, please try again...', 'error', 'mdi-alert')
        }
      }
      else {
        if(this.$refs.form.validate()) {
          const formData = {
            name: this.form.name,
            description: this.form.description,
            price: parseInt(this.form.price),
            quantity: parseInt(this.form.quantity),
            image: this.nameImage
          }
          this.$store.dispatch('insertProduct', formData)
          this.form.image = null

          this.saveDetails('Created successfully')
          this.$emit('input', false)
        }
        else {
          this.saveDetails('Created fail, please try again...', 'error', 'mdi-alert')
        }
      }
    },
    ...mapActions("snackbar", ["showSnack"]),
    saveDetails(text, color, icon, timeout) {
      this.showSnack({
        text: text,
        color: color,
        icon: icon,
        timeout: timeout
      })
    }
  }
}
</script>