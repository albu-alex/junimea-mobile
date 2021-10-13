<!--This component should only be used for iOS users-->
<!--Component changes the status bar color to black-->
<template>
  <view v-if="isDarkTheme" class="statusbarDark"></view>
  <view v-else class="statusbarLight"></view>
</template>


<!--Did not separate the script in another file for obvious reasons-->
<script>
export default {
  name: "OwnStatusBar",
  props:{
    isDarkTheme: Boolean
  }
}
</script>

<style>
.statusbarDark{
  height: 36px;
  background-color: black;
  color: ghostwhite;
}
.statusbarLight{
  height: 36px;
  background-color: ghostwhite;
  color: #070700;
}
</style>