<template>
  <v-app class="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="5" xl="4">
          <v-card class="elevation-8 rounded-xl">
            <v-row>
              <v-col cols="5" class="primary rounded-xl rounded-r-0">
                <v-container class="fill-height" fluid>
                  <v-row align="center" justify="center">
                    <v-img src="../../assets/logoWF.png" max-width="150"></v-img>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="7" class="pl-0">
                <div class="text-center pt-6">
                  <v-avatar color="#145593" size="70">
                    <v-icon size="40" dark>mdi-account</v-icon>
                  </v-avatar>
                  <h3 class="primary--text font-weight-bold pt-1">
                    User Login
                  </h3>
                </div>
                <v-form ref="form">
                  <v-card-text>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="11" md="11" class="mt-4">
                        <l-text-field
                          label="E-mail"
                          v-model="email"
                          :left_icon="'mdi-account'"
                          :rules="[
                            (v) => !!v || 'E-mail is required',
                            (v) => /.+@.+/.test(v) || 'E-mail must be valid',
                          ]"
                        ></l-text-field>
                      </v-col>
                      <v-col cols="12" sm="11" md="11" class="mt-n4">
                        <l-text-field
                          :label="'Password'"
                          :left_icon="'mdi-lock'"
                          v-model="password"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[
                            (v) => !!v || 'Password is required',
                            (v) =>
                              v.length >= 8 ||
                              'Password must be 8 characters or more',
                          ]"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          hint="At least 8 characters"
                          counter
                        >
                        </l-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="px-4 pt-4 pb-6">
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="11" md="11">
                        <l-button block @click="login"> LOG IN </l-button>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <l-snackbar />
  </v-app>
</template>

<script>
import LButton from "@/components/button/LButton.vue"
import LTextField from "@/components/form/LTextField.vue"
import { mapActions } from 'vuex'
import LSnackbar from '@/components/snackbar/LSnackbar.vue'

export default {
  name: "LoginPage",
  components: {
    LButton,
    LTextField,
    LSnackbar
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    saveDetails(text, color, icon, timeout) {
      this.showSnack({
        text: text,
        color: color,
        icon: icon,
        timeout: timeout
      })
    },
    login() {
      if (this.$refs.form.validate()) {
        this.$http.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
        .then(response => {
          if (response.status === 200 && response.data.length > 0){
            localStorage.setItem("fake-token", JSON.stringify(response.data[0].fake_token))
            this.$router.push({ name: "home" })
            this.$store.state.isSnackbar.login = true
          }else {
            this.saveDetails(
              'Invalid Email or Password',
              'error',
              'mdi-alert'
            )
          }
        })
        .catch(error=>console.log(error))
      }
      else{
        this.saveDetails(
          'Logged in fail, please try again...',
          'error',
          'mdi-alert'
        )
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("fake-token")
    if (user) {
      this.$router.push({ name: "home" })
    }
    if(this.$store.state.isSnackbar.login) {
      this.saveDetails('Logged out successfully')
      this.$store.state.isSnackbar.login = false
    }
  },
};
</script>