<template>
  <view class="container">
    <StatusBar/>
    <Header/>
    <text class="textColorPrimary">Junimea mobile</text>
  </view>
</template>


<script>
import StatusBar from "./components/StatusBar";
import Header from "./components/Header";
export default {
  name: "App",
  components:{
    StatusBar,
    Header
  }
}
</script>


<style>
.container {
  background-color: #252525;
  flex: 1;
}
.textColorPrimary {
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 300;
}
</style>
