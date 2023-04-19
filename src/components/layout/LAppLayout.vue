<template>
  <v-app>
    <v-app-bar
      elevation="1"
      dense
      dark
      class="primary pa-0"
      clipped-left
      app
    >
      <v-col cols="3" class="pa-0 pl-2">
        <v-row align="center">
          <l-button color="white" small icon @click.stop="drawer = !drawer">
            <v-icon color="white">{{IconEnum.TUNE}}</v-icon>
          </l-button >
          <v-app-bar-title>
            <v-img src="../../assets/logoWH.png"
              max-width="80"
              contain
              class="ml-1"
            ></v-img>
          </v-app-bar-title>
        </v-row>
      </v-col>
      <v-col cols="6" class="text-center font-weight-medium pa-0">
        <v-toolbar-title>Product Management</v-toolbar-title>
      </v-col>
      <v-col cols="3" class="pa-0 pr-1">
        <v-row class="justify-end">
          <v-menu
            v-model="menu"
            :close-on-click="false"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <l-button
                elevation=0
                class="pa-1"
                rounded
                v-bind="attrs"
                v-on="on" >
                <v-avatar size="30" color="white">
                  <v-img src="../../assets/profile.png" contain height="28"></v-img>
                </v-avatar>
                <h4 class="white--text justify-center pl-2 font-weight-medium text-none">{{ username }}</h4>
                <v-icon>mdi-menu-down</v-icon>
              </l-button>
            </template>
            <v-card
              rounded="lg"
              class="d-flex justify-center pa-2"
            >
              <v-list class="pb-0 pt-2">
                <v-list-item>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-avatar size="100">
                        <img
                          src="../../assets/profile.png"
                          alt="Username"
                        >
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item dense>
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <v-list-item-title class="text-center text-md-body-1 primary--text font-weight-medium">
                        {{ username }}
                      </v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-card-actions class="px-3 pt-0">
                  <v-list-item class="px-0">
                    <v-row class="px-0">
                      <v-col cols="12" class="pa-0 pt-3">
                        <l-button
                          @click="logout"
                          block
                          elevation="0"
                          class="px-1"
                        >
                          Log Out
                        </l-button>
                      </v-col>
                      <v-col cols="12" class="pa-0 py-1">
                        <l-button
                          @click="menu = false"
                          outlined
                          block
                          elevation="0"
                          class="px-1"
                        >
                          Cancel
                        </l-button>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-list>
            </v-card>
          </v-menu>
        </v-row>
      </v-col>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer" class="pa-4">
      <v-card outlined>
        <v-subheader class="primary--text font-weight-medium mt-2">Filter Price</v-subheader>
        <v-divider class="mx-4"></v-divider>
        <v-range-slider
        v-model="rangePrice"
          :max="maxPrice"
          :min="minPrice"
          hide-details
          @change="filterPrice"
          class="align-center mx-2 mt-2"
        >
        </v-range-slider>
        <v-row class="ma-0">
          <v-subheader class="font-weight-medium mt-n3 pr-0">Min:</v-subheader>
          <v-subheader
            :value="rangePrice[0]"
            @change="$set(rangePrice, 0, $event)"
            class="primary--text font-weight-medium mt-n3 pa-0 pl-1"
          >
            {{ '$' + rangePrice[0] }}
          </v-subheader>
          <v-spacer></v-spacer>
          <v-subheader class="font-weight-medium mt-n3 pr-0">Max:</v-subheader>
          <v-subheader
            :value="rangePrice[1]"
            @change="$set(rangePrice, 1, $event)"
            class="primary--text font-weight-medium mt-n3 mr-4 pa-0 pl-1"
          >
            {{ '$' + rangePrice[1] }}
          </v-subheader>
        </v-row>
        <v-subheader class="primary--text font-weight-medium mt-2">Filter Quantity</v-subheader>
        <v-divider class="mx-4"></v-divider>
        <v-range-slider
        v-model="rangeQuantity"
          :max="maxQuantity"
          :min="minQuantity"
          hide-details
          @change="filterQuantity"
          class="align-center mx-2 mt-2"
        >
        </v-range-slider>
        <v-row class="ma-0">
          <v-subheader class="font-weight-medium mt-n3 pr-0">Min:</v-subheader>
          <v-subheader
            :value="rangeQuantity[0]"
            @change="$set(rangeQuantity, 0, $event)"
            class="primary--text font-weight-medium mt-n3 pa-0 pl-1"
          >
            {{ rangeQuantity[0] }}
          </v-subheader>
          <v-spacer></v-spacer>
          <v-subheader class="font-weight-medium mt-n3 pr-0">Max:</v-subheader>
          <v-subheader
            :value="rangeQuantity[1]"
            @change="$set(rangeQuantity, 1, $event)"
            class="primary--text font-weight-medium mt-n3 mr-4 pa-0 pl-1"
          >
            {{ rangeQuantity[1] }}
          </v-subheader>
        </v-row>
      </v-card>
    </v-navigation-drawer>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
import LButton from '@/components/button/LButton.vue'
import { IconEnum } from '@/constants/enums'

export default {
  data() {
    return {
      username: 'Admin',
      minPrice: 100,
      maxPrice: 3000,
      minQuantity: 0,
      maxQuantity: 1000,
      rangePrice: [100, 3000],
      rangeQuantity: [0, 1000],
      IconEnum,
      drawer: false,
      menu: false,
      message: false,
      hints: true,
    }
  },
  components: {
    LButton,
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$router.push({name: 'login'})
    },
    filterPrice(){
      this.$store.dispatch('filterPrice',{minPrice: this.rangePrice[0], maxPrice: this.rangePrice[1]})
    },
    filterQuantity(){
      this.$store.dispatch('filterQuantity',{minQuantity: this.rangeQuantity[0], maxQuantity: this.rangeQuantity[1]})
    },
  }
}
</script>