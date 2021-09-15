<!--This component should only be used for iOS users-->
<!--Component changes the status bar color to black-->
<template>
  <view class="statusbar"></view>
</template>


<!--Did not separate the script in another file for obvious reasons-->
<script>
export default {
  name: "StatusBar"
}
</script>

<style>
.statusbar{
  height: 36px;
  background-color: black;
}
</style>