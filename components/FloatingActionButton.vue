<template>
  <FAB buttonColor="#555555" iconTextColor="white" :onClickAction="goToAddPost" v-if="isDarkTheme" />
  <FAB buttonColor="#AAAAAA" iconTextColor="black" :onClickAction="goToAddPost" v-else />
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
  },
  methods:{
    goToAddPost(){
      this.$emit("goToAddPost")
    }
  }
}
</script>

<style>

</style>