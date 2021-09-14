<template>
  <view class="mainPage">
    <StatusBar/>
    <Header @displaySettings="displaySettings"/>
    <text class="textColorPrimary">Junimea mobile</text>
  </view>
</template>

<script>
import StatusBar from "./StatusBar";
import Header from "./Header";
export default {
  name: "MainPage",
  components:{
    StatusBar,
    Header
  },
  methods:{
    displaySettings(){
      this.$emit("displaySettings")
    }
  }
}
</script>

<style>
.mainPage{
  background-color: #252525;
  flex: 1;
}
.textColorPrimary {
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 300;
}
</style>