<template>
  <view class="container">
    <Login :isDarkTheme="isDarkTheme" v-if="!isLoggedIn" @verifyLogin="verifyLogin($event)" />
    <MainPage v-if="isLoggedIn" @Logout="Logout" :newUsername="username" :customTheme="isDarkTheme"
    @redirectToLogin="Logout" :token="token"/>
  </view>
</template>


<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Settings from "./components/Settings";
export default {
  data(){
    return {
      isLoggedIn: true,
      username: "",
      token: "",
      isDarkTheme: true,
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
      this.username = newUsername.username;
      this.token = newUsername.token
    },
    Logout(isDarkTheme){
      this.isLoggedIn = false;
      this.isDarkTheme = isDarkTheme;
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
