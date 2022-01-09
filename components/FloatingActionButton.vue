<template>
  <FAB buttonColor="#555555" iconTextColor="white" v-if="isDarkTheme" />
  <FAB buttonColor="#AAAAAA" iconTextColor="black" v-else />
</template>

<script>
import FAB from "react-native-fab";
export default {
  name: "FloatingActionButton.vue",
  props:{
    isDarkTheme: Boolean
  },
  components:{
    FAB
  }
}
</script>

<style>

</style>