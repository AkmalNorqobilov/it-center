<template>
  <div class="text-center">
    <v-card class="w-5/6 text-center mx-auto" color="primary" elevation>
      <v-card-text>
        <v-toolbar flat floating class="text-h6" color="transparent">{{
          title
        }}</v-toolbar>
        <div class="text--primary">
          <v-form
            v-model="valid"
            class="py-8"
            ref="form"
            @submit="submit($event)"
            lazy-validation
          >
            <v-row justify="space-between">
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="firstName"
                  name="FirstName"
                  label="FirstName"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="lastName"
                  label="LastName"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  v-model="fatherName"
                  label="Father name"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  name="Password"
                  label="Password"
                  v-model="password"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  counter="true"
                  :type="show2 ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  :rules="[
                    required('Password'),
                    minLength('Password', 6),
                    maxLength('Password', 30),
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="space-between">
              <v-col lg="6" md="6" sm="12" class="text-center">
                <v-date-picker
                  v-model="birthday"
                  class="focus:outline-none"
                  color="blue"
                  header-color="red lighten-3"
                ></v-date-picker>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-row justify="space-between">
                  <v-col class="mx-auto" lg="5" md="5" sm="12">
                    <v-text-field
                      v-model="contactNumber"
                      label="Contact Number"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mx-auto" cols="12" md="5" lg="5">
                    <v-autocomplete
                      v-model="lastName"
                      :items="roles"
                      color="white"
                      label="Roles"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="value"
                      :items="sciences"
                      chips
                      dense
                      label="Science"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Passport" v-model="passport"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="groupsId"
                      :items="groups"
                      color="white"
                      multiple
                      label="Groups"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-row justify="space-between">
          <v-col>
            <v-btn
              block
              color="success"
              class="focus:outline-none"
              :disabled="!valid"
              @click="submit"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    model: null,
    show2: false,
    phone: "883812848",
    password: "akmaljon",
    sciences: null,
    firstName: "",
    lastName: "",
    contactNumber: "",
    birthday: "",
    passport: "",
    groupsId: "",
    fatherName: "",
    isPassword: true,
    required(name) {
      return (v) =>
        (v && v.length > 0) || `${name} bo'sh bo'lmasligi kerak !!!`;
    },
    minLength(name, minLength) {
      return (v) =>
        (v && v.length >= minLength) ||
        `${name} kamida  ${minLength} ta belgidan iborat bo'lsin!!!`;
    },

    maxLength(name, maxLength) {
      return (v) =>
        (v && v.length <= maxLength) ||
        `${name} ko'pi bilan  ${maxLength} ta belgidan iborat bo'lsin!!!`;
    },
    emailRules: (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail ushbu ko'rinishda bo'lsin something@something.com",
    roles: ["teacher", "pupil", "admin", "owner"],
  }),
  created() {
    this.created();
    this.loadingData();
  },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  methods: {
    created() {
      this.teachers = this.$store.getter["auth/teachers"];
    },
    loadingData() {
      this.sciences = this.$store.getter["science/getAll"];
      console.log(this.sciences);
    },
    submit(e) {
      e.preventDefault();
      console.log("ishladi shu yergacha");
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/AUTH_SIGNUP", {
            firstName: this.firstName,
            lastName: this.lastName,
            fatherName: this.fatherName,
            password: this.password,
            passport: this.passport,
            birthday: this.birthday,
            contactNumber: this.contactNumber,
          })
          .then(() => {
            this.$store.dispatch("time/GET_TIMES");

            this.$store.state.changeModal = false;
            this.$router.push("/loading");
          })
          .catch((err) => {
            return {
              submitted: false,
              error: err,
            };
          });
      }
    },
    customFilter(item, queryText, itemText) {
      console.log(item, queryText, itemText);
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      console.log(
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
};
</script>