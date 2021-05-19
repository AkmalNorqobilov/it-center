<template>
  <div>
    <overlay name="changeModal" title="Create New Time">
      <template #body>
        <create-group title="Create New Time">
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
    </overlay>
    <data-table
      deleteNameSpace="time/DELETE_TIME"
      updateNameSpace = "time/GET_TIMES"
      getterNameSpace = "time/getAll"
      :keys="['startTime', 'finishTime']"
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
  </div>
</template>


<script>
import dataTable from "../../../components/dataTables/dataTable.vue";
import createGroup from "./create.vue";
import overlay from "../../../components/overlay/overlay.vue";
export default {
  data: () => ({
    times: []
  }),
  created() {
    this.times = this.$store.getters["time/getAll"];
  },
  components: {
    dataTable,
    createGroup,
    overlay
  }
};
</script>