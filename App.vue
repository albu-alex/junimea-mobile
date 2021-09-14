<template>
  <view class="container">
    <Login v-if="!isLoggedIn" @verifyLogin="isLoggedIn = true"/>
    <MainPage v-if="isLoggedIn" />
    <Settings v-if="settingsDisplayed && isLoggedIn" @displaySettings="settingsDisplayed = !settingsDisplayed"/>
  </view>
</template>


<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Settings from "./components/Settings";
export default {
  data(){
    return {
      isLoggedIn: false,
      settingsDisplayed: true
    }
  },
  name: "App",
  components:{
    Settings,
    MainPage,
    Login
  }
}
</script>


<style>
.container {
  background-color: #252525;
  flex: 1;
  flex-direction: row;
}
</style>
