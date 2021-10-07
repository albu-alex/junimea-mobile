<!--This component should only be used for iOS users-->
<!--Component changes the status bar color to black-->
<template>
  <view v-if="isDarkTheme" class="statusbarDark"></view>
  <view v-else class="statusbarLight"></view>
</template>


<!--Did not separate the script in another file for obvious reasons-->
<script>
export default {
  name: "StatusBar",
  props:{
    isDarkTheme: Boolean
  }
}
</script>

<style>
.statusbarDark{
  height: 36px;
  background-color: black;
}
.statusbarLight{
  height: 36px;
  background-color: #555555;
}
</style>