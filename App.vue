<template>
  <view class="container">
    <Login v-if="!isLoggedIn" @verifyLogin="verifyLogin($event)" />
    <MainPage v-if="isLoggedIn" :newUsername="username" />
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
      username: "",
    }
  },
  name: "App",
  components:{
    Settings,
    MainPage,
    Login
  },
  methods:{
    verifyLogin(newUsername){
      this.isLoggedIn = true
      this.username = newUsername;
    }
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
