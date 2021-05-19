<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
    color="blue"
  >
    <v-list-item color="white--text" class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>Admin Panel</v-list-item-title>

      <v-btn icon class="focus:outline-none" @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item v-for="(item, index) in items" :key="index" link :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content :title="item.title">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      selectItem: 1,
      items: [
        { title: "Home", icon: "mdi-home-city", route: '/' },
        { title: "My Account", icon: "mdi-account", route: '/users' },
        { title: "Teachers", icon: "mdi-teach", route: '/teachers' },
        { title: "Groups", icon: "mdi-account-group-outline", route: '/groups' },  
        { title: "Sciences", icon: "mdi-notebook", route: '/sciences' },
        { title: "Times", icon: "mdi-timetable", route: '/times' }
      ],
      mini: true
    };
  }
};
</script>