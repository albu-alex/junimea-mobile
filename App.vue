<template>
  <view class="container">
    <Login v-if="!isLoggedIn" @verifyLogin="isLoggedIn = true"/>
    <MainPage v-if="isLoggedIn" />
  </view>
</template>


<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
export default {
  data(){
    return {
      isLoggedIn: false,
    }
  },
  name: "App",
  components:{
    MainPage,
    Login
  }
}
</script>


<style>
.container {
  background-color: #252525;
  flex: 1;
}
</style>
