<template>
  <v-app>
    <v-app-bar dark app color="blue" dense flat>
      <v-toolbar-title>AdminPanel</v-toolbar-title>
      <v-spacer></v-spacer>
      <profile />
    </v-app-bar>
    <sidebar-drawer />
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import sidebarDrawer from "../../components/drawer/sidebarDrawer.vue";
import Profile from "../../components/Profile/profile.vue";
export default {
  name: "Home",
  components: {
    sidebarDrawer,
    Profile
  },
  mounted() {
    this.$store.dispatch("group/GET_GROUPS");
    this.$store.dispatch("science/GET_SCIENCES");
    this.$store.dispatch("time/GET_TIMES");
    this.$store.dispatch("auth/GET_USERS");
  }
};
</script>
