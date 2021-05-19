<template>
  <div>
    <v-btn
      v-if="title"
      color="success"
      class="mt-12 focus:outline-none"
      @click="$store.state[name] = !$store.state[name]"
    >{{title}}</v-btn>
    <v-overlay class="z-50" style="z-index:1000" light :value="$store.state[name]">
     <div style="    overflow: hidden;">
        <v-btn
        fab
        class="absolute z-50 right-7 top-7 focus:outline-none"
        @click="$store.state[name]=false"
        small
        color="green"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>

      <slot name="body" style="overflow:auto;" :data="data"></slot>
     </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    title:{
        type: String,
        default: null
    },
    name: {
        type: Boolean,
        default: false
    },
    data: {
      type: Object,
    },
    salom: {
      type: String,
      default: "Akmal"
    }

  },
  data: () => ({})
};
</script>