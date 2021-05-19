<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr v-if="datas">
            <th
              v-for="(key, i) in keys"
              :key="i"
              class="text-left font-bold text-xl text-h6"
            >{{key}}</th>
            <th class="text-left font-bold text-xl text-h6"></th>
          </tr>
        </thead>
        <tbody v-if="datas">
          <tr v-for="(item, index) in datas" :key="index">
            <td v-for="(key, i) in keys" :key="i" @click="updateTime(item)">{{ item[key] }}</td>
            <td class="w-96 text-left space-x-2">
              <v-btn small class="focus:outline-none" fab color>
                <v-icon color="blue">mdi-eye</v-icon>
              </v-btn>
              <v-btn small @click="updateTime(item)" class="focus:outline-none" fab color>
                <v-icon color="success">mdi-pencil</v-icon>
              </v-btn>
              <v-btn small @click="deleteTime(item._id)" class="focus:outline-none" fab color>
                <v-icon color="error">mdi-trash-can</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <h1 v-else class="text-center red--text text-2xl uppercase">No items</h1>
      </template>
    </v-simple-table>

    <overlay name="changeModalForUpdate" title>
      <template #body>
        <slot name="update" :data="onetime" :salom="'salom'"></slot>
      </template>
    </overlay>
  </v-container>
</template>

<script>
import overlay from "../overlay/overlay.vue";

export default {
  props: {
    keys: null,
    deleteNameSpace: null,
    updateNameSpace: null,
    getterNameSpace: null
  },
  data: () => ({
    datas: null,
    oneTime: ""
  }),
  updated() {
    this.created();
  },
  created() {
    this.created();
  },
  components: {
    overlay
  },
  mounted() {
    this.created();
  },
  methods: {
    created() {

      this.datas = this.$store.getters[this.getterNameSpace];
    },
    updateTime(item) {
      console.log(item);
      // this.oneTime = item;
      this.$store.state.changeModalForUpdate = true;
    },
    deleteTime(_id) {
      console.log(_id, this.$props);
      console.log(this.deleteNameSpace);
      if (this.deleteNameSpace) {
        console.log(this.deleteNameSpace);
        this.$store
          .dispatch(this.deleteNameSpace, _id)
          .then(() => {
            this.$store.dispatch(`${this.updateNameSpace}`).then(() => {
              this.datas = this.$store.getters[this.getterNameSpace];
            });
          })
          .catch(err => {
            console.log(err);
          });
            this.$router.push('loading')
      }
    }
  }
};
</script>