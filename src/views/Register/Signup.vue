<template>
  <v-app>
    <v-row align="center" class="h-screen flex flex-col" justify="center">
      <v-card class="w-1/3 h-1/2" elevation max-width>
        <v-toolbar class="text-center" dark color="blue">
          <v-toolbar-title class="text-4xl font-extrabold">Signup</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form class="space-y-12 pt-8 w-full" v-model="valid" ref="form" lazy-validation>
            <VuePhoneNumberInput
              v-model="phone"
              :no-country-selector="true"
              :error-color="'red'"
              :required="true"
              :valid-color="'orangered'"
              :clearable="true"
              :no-flags="true"
            ></VuePhoneNumberInput>

            <v-text-field
              name="Password"
              label="Password"
              v-model="password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              counter="true"
              :type="show2 ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :rules="[required('Password'), minLength('Password', 6), maxLength('Password', 30)]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="flex justify-around">
          <v-btn
            block
            color="green white--text"
            :disabled="!valid"
            class="focus:outline-none"
            type="submit"
            @click="submit"
          >Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  data: () => ({
    valid: true,
    show2: false,
    phone: "883812848",
    password: "akmaljon",
    isPassword: true,
    required(name) {
      return v => (v && v.length > 0) || `${name} bo'sh bo'lmasligi kerak !!!`;
    },
    minLength(name, minLength) {
      return v =>
        (v && v.length >= minLength) ||
        `${name} kamida  ${minLength} ta belgidan iborat bo'lsin!!!`;
    },

    maxLength(name, maxLength) {
      return v =>
        (v && v.length <= maxLength) ||
        `${name} ko'pi bilan  ${maxLength} ta belgidan iborat bo'lsin!!!`;
    },
    emailRules: v =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail ushbu ko'rinishda bo'lsin something@something.com"
  }),
  components: {
    VuePhoneNumberInput
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log("ishladimi");
        this.$store
          .dispatch("auth/AUTH_SIGNIN", {
            phone: this.phone,
            password: this.password
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    },
    reset() {
      console.log("ishladi");
      this.$refs.form.reset();
    }
  }
};
</script>
