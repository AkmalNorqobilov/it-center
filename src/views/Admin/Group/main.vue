<template>
  <div>
    <v-btn
      color="success"
      class="mt-12 focus:outline-none"
      @click="createGroupOverlay = !createGroupOverlay"
    >Create New Group</v-btn>
    <data-table
      deleteNameSpace="science/DELETE_SCIENCE"
      updateNameSpace="science/GET_SCIENCES"
      getterNameSpace="science/getAll"
      :keys="['name', 'slug']"
    >
      <template #update>
        <create-group title="Update this Time">
          <template #submit>
            <v-btn block color="success" class="focus:outline-none" @click="submitGroup">Submit</v-btn>
          </template>
          <template #close>
            <v-btn
              block
              color="gray lighten-5"
              class="focus:outline-none"
              @click="$store.state.changeModal = !$store.state.changeModal"
            >Close</v-btn>
          </template>
        </create-group>
      </template>
    </data-table>
    <v-overlay light :value="createGroupOverlay">
      <v-btn
        fab
        class="absolute z-50 right-7 top-7 focus:outline-none"
        @click="createGroupOverlay=false"
        small
        color="green"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>

      <create-group>
        <template #submit>
          <v-btn block color="success" class="focus:outline-none" @click="submitGroup">Submit</v-btn>
        </template>
        <template #close>
          <v-btn block  color="gray lighten-5" class="focus:outline-none"   @click="createGroupOverlay = !createGroupOverlay">Close</v-btn>
        </template>
      </create-group>
    </v-overlay>
  </div>
</template>


<script>
import dataTable from "../../../components/dataTables/dataTable.vue";
import createGroup from "./create.vue";
export default {
  data: () => ({
    createGroupOverlay: false
  }),
  components: {
    dataTable,
    createGroup
  },
  computed: {
    groups() {
      return this.$store.state["group/groups"];
    }
  }
};
</script>