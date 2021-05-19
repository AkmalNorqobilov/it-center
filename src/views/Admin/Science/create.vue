<template>
  <div>
    <v-card v-if="data" class="w-96" color="primary" elevation>
      <v-card-text>
        <v-toolbar app color="transparent">Update Group Salom</v-toolbar>
        <div class="text--primary">
          <v-form v-model="valid" class="py-8" ref="form" lazy-validation>
            <v-row justify="space-between">
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  label="Start Time"
                  v-model="startTime"
                  type="time"
                  class="focus:outline-none"
                  :rules="[required('Start Time')]"
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  label="Finish Time"
                  v-model="finishTime"
                  type="time"
                  class="focus:outline-none"
                  :rules="[required('Finish Time')]"
                ></v-text-field>
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
            >Submit</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-card v-else class="w-96" color="primary" elevation>
      <v-card-text>
        <v-toolbar app color="transparent">Create New Group</v-toolbar>
        <div class="text--primary">
          <v-form v-model="valid" class="py-8" @submit.prevent.stop="submit" ref="form" lazy-validation>
            <v-row justify="center">
              <v-col lg="6" md="6" sm="12">
                <v-text-field
                  label="Name of Science"
                  v-model="name"
                  class="focus:outline-none w-96"
                  :rules="[required('Name')]"
                ></v-text-field>
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
            >Submit</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data: () => ({
    valid: true,
    name: "",
    required(name) {
      return v => (v && v.length > 0) || `${name} bo'sh bo'lmasligi kerak !!!`;
    }
  }),
  created() {
    console.log(this.data);
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("science/CREATE_SCIENCE", {
            name: this.name
          })
          .then(() => {
            this.$store.dispatch("science/GET_SCIENCES");

            this.$store.state.changeModal = false;
            this.$router.push("/loading");
          })
          .catch(err => {
            return {
              submitted: false,
              error: err
            };
          });
      }
    }
  }
};
</script>