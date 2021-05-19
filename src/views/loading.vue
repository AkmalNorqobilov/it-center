<template>
  <v-overlay :value="overlay">
    <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    overlay: true
  }),
  mounted(){
      this.ms100();
  
  },
  methods: {
    ms100() {
         setTimeout(() => {
      this.$router.back();
    }, 1000);
    }
  }
};
</script>