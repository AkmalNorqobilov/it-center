<template>
  <v-menu class="text-right" :rounded="rounded" offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        :color="colors[index]"
        class="white--text ma-5 focus:outline-none transparent"
        flat
        elevation="0"
        v-bind="attrs"
        v-on="on"
      >Your Profile</v-btn>
    </template>

    <v-list>
      <v-list-item link>
        <v-list-item-title>{{user.fullName}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>{{user.contactNumber}}</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
    
  </v-menu>
</template>

<script>
import {} from "vuex";
export default {
  data: () => ({
    btns: [["Large", "lg"]],
    colors: ["deep-purple accent-4"],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
    user: null
  }),
  created() {
    this.user = { ...this.$store.getters["auth/user"] };
    console.log(this.user);  
  },
  methods: {
      logout(){
          this.$store.dispatch('auth/AUTH_LOGOUT').then(()=>{
              this.$router.push('/signup')
          });
      }
  }
};
</script>