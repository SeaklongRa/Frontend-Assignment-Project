<template>
  <l-page-layout title="Product List">
    <template #action>
      <l-button
        elevation=1
        @click="onCreateProduct"
      >
        Create
      </l-button>
    </template>
    <v-row>
      <v-col cols="12" class="pa-4">
        <v-data-table
          :headers="headers"
          :items="products"
          :items-per-page="10"
        >
          <template v-slot:top>
            <v-row class="pa-0 ma-0">
              <v-col cols="3" class="pb-0 pr-6">
                <l-text-field
                  type="search"
                  label="Search"
                  :left_icon="'mdi-magnify'"
                  v-model="filter.q"
                >
                </l-text-field>
              </v-col>
              <v-col cols="1" class="pl-0">
                <l-button
                  elevation=1
                  @click="searchProduct"
                >Search
              </l-button>
              </v-col>
            </v-row>
          </template>

          <template #[`item`]="{item}">
            <tr :style="highlightLowQty(item.quantity)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-layout justify-end>
                  {{ item.price }}
                </v-layout>
              </td>
              <td>
                <v-layout justify-end>
                  <span v-if="item.quantity === 0" class="red--text">
                    Out of stock
                  </span>
                  <span v-else>{{ item.quantity }}</span>
                </v-layout>
              </td>
              <td>
                <v-layout justify-center>
                  <l-button icon @click="onEditProduct(item)">
                    <v-icon>{{ icon.edit }}</v-icon>
                  </l-button>
                  <l-button icon @click="deleteProduct(item.id)">
                    <v-icon>{{ icon.delete }}</v-icon>
                  </l-button>
                </v-layout>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <create-or-update 
      v-model="openDialog"
      :isEdit="isEdit"
      :items="editItem"
    >
    </create-or-update>
    <delete v-model="openDelete" :id="deleteItem"></delete>
    <l-snackbar />
  </l-page-layout>
</template>

<script>
import LPageLayout from '@/components/layout/LPageLayout.vue'
import LButton from '@/components/button/LButton.vue'
import { IconEnum } from '@/constants/enums'
import LTextField from '@/components/form/LTextField.vue'
import createOrUpdate from './createOrUpdate.vue'
import Delete from './delete.vue'
import { mapActions } from 'vuex'
import LSnackbar from '@/components/snackbar/LSnackbar.vue'

export default {
  name: 'HomePage',
  components: {
    LPageLayout,
    LButton,
    LTextField,
    createOrUpdate,
    Delete,
    LSnackbar
  },
  data() {
    return {
      icon: {
        edit: IconEnum.EDIT,
        delete: IconEnum.DELETE
      },
      isEdit: false,
      editItem: {},
      openDialog: false,
      openDelete: false,
      deleteItem: null,
      filter: {
        q: '',
        filterPrice: [],
        filterQty: []
      },
      headers: [
        {
          text: 'ID',
          value: 'id',
          class: "primary--text subtitle-1 font-weight-medium"
        },
        { 
          text: 'Name',
          sortable: false,
          value: 'name',
          class: "primary--text subtitle-1 font-weight-medium"
        },
        {
          text: 'Description',
          sortable: false,
          value: 'description',
          class: "primary--text subtitle-1 font-weight-medium"
        },
        { 
          text: 'Price',
          align: 'end',
          value: 'price',
          class: "primary--text subtitle-1 font-weight-medium"
        },
        { 
          text: 'Quantity',
          align: 'end',
          value: 'quantity',
          class: "primary--text subtitle-1 font-weight-medium"
        },
        { 
          text: 'Action',
          sortable: false,
          align: 'center',
          value: 'action',
          class: "primary--text subtitle-1 font-weight-medium"
        }
      ]
    }
  },
  mounted() {
    if(this.$store.state.isSnackbar.login) {
      this.saveDetails()
    }
    if(this.$store.state.isSnackbar.update) {
      this.saveDetails('Updated successfully')
      this.$store.state.isSnackbar.update = false
    }
    if(this.$store.state.isSnackbar.delete) {
      this.saveDetails('Deleted successfully')
      this.$store.state.isSnackbar.delete = false
    }
    
    let user = localStorage.getItem('fake-token')
    if(!user) {
      this.$router.push({name: 'login'})
    }
    else {
      this.$store.dispatch('getProduct')
      this.$store.state.isSnackbar.login = true
    }
  },
  computed: {
    products() {
      return this.$store.getters.ProductList
    }
  },
  methods: {
    highlightLowQty(val){
      return val < 10 ? 'background-color: #FFCDD2; color: black' : ''
    },
    onEditProduct(item){
      this.openDialog = true
      this.isEdit = true
      this.editItem = item
    },
    onCreateProduct() {
      this.openDialog = true
      this.isEdit = false
      this.editItem = {}
    },
    deleteProduct(item) {
      this.openDelete = true
      this.deleteItem = item
    },
    searchProduct() {
      this.$store.dispatch('searchProduct', {search: this.filter.q})
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