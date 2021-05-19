<template>
  <div style="width: 100%; background-color: red;">
    <v-card class="w-full" color="primary" elevation>
      <v-card-text>
        <v-toolbar app color="transparent">{{title}}</v-toolbar>
        <div class="text--primary">
          <v-form class="py-8">
            <v-row justify="space-between">
              <v-col lg="6" md="6" sm="12">
                <v-text-field label="Group Name"></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-select :items="items" label="Standard"></v-select>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-select v-model="value" :items="items" chips dense label="Teacher"></v-select>
              </v-col>
              <v-col lg="6" md="6" sm="12">
                <v-select v-model="value" :items="items" chips dense label="Science" multiple></v-select>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-row justify="space-between">
          <v-col>
            <slot name="submit"></slot>
          </v-col>
          <v-col>
            <slot name="close"></slot>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>