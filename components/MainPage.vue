<template>
  <view class="mainPage">
    <StatusBar/>
    <Settings :newUsername="newUsername" v-if="settingsDisplayed" class="settings" />
    <Header @displaySettings="settingsDisplayed = !settingsDisplayed" />
  </view>
</template>

<script>
import StatusBar from "./StatusBar";
import Header from "./Header";
import Settings from "./Settings";
export default {
  name: "MainPage",
  data(){
    return{
      settingsDisplayed: false
    }
  },
  components:{
    StatusBar,
    Header,
    Settings
  },
  props:{
    newUsername: String
  }
}
</script>

<style>
.settings{
  height: 10%;
}
.mainPage{
  background-color: #252525;
  flex: 1;
}
</style>