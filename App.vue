<template>
<!--  <view class="container">-->
<!--    <Login :isDarkTheme="isDarkTheme" v-if="!isLoggedIn" @verifyLogin="verifyLogin($event)" />-->
<!--    <MainPage v-if="isLoggedIn" @Logout="Logout" :newUsername="username" :customTheme="isDarkTheme"-->
<!--    @redirectToLogin="Logout" :token="token"/>-->
<!--  </view>-->
  <app-navigator></app-navigator>
</template>


<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

const StackNavigator = createStackNavigator(
    {
      MainPage: MainPage,
      Login: Login,
    },
    {
      initialRouteName: 'MainPage',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  // data(){
  //   return {
  //     isLoggedIn: true,
  //     username: "",
  //     token: "",
  //     isDarkTheme: true,
  //   }
  // },
  // name: "App",
  // components:{
  //   MainPage,
  //   Login
  // },
  // methods:{
  //   verifyLogin(newUsername){
  //     this.isLoggedIn = true
  //     this.username = newUsername.username;
  //     this.token = newUsername.token
  //   },
  //   Logout(isDarkTheme){
  //     this.isLoggedIn = false;
  //     this.isDarkTheme = isDarkTheme;
  //   }
  // }
  components:{
    AppNavigator
  },
  name: "App",
}
</script>


<style>
.container {
  background-color: #252525;
  flex: 1;
  flex-direction: row;
}
</style>
