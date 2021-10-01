<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button, a register button and a welcome message-->
<template>
  <view class="userLogin">
    <Loading v-if="isLoading"/>
    <view v-if="waitingForSubmit" :style="{flex: 1, justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <text class="pageIntro" v-if="!isLoading&&!waitingForSubmit">Welcome to juni.</text>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit" placeholderTextColor="ghostwhite" placeholder="Username or Email" v-model="username" class="textInput"></text-input>
    <text-input :autoCorrect="false" keyboardType="email-address" v-if="!isLoading&&!waitingForSubmit&&!registeredUser" placeholderTextColor="ghostwhite" placeholder="Email Address" v-model="email" class="textInput"></text-input>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit" placeholderTextColor="ghostwhite" :secureTextEntry="!showPassword" placeholder="Password" v-model="password" class="textInput"></text-input>
    <view v-if="!isLoading&&!waitingForSubmit" class="loginButtons">
      <touchable-opacity class="loginButton" :on-press="verifyLogin">
        <text class="loginButtonText">Login</text>
      </touchable-opacity>
      <touchable-opacity class="loginButton" :on-press="registerNewUser">
        <text class="loginButtonText">Register</text>
      </touchable-opacity>
    </view>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit" class="loginButton" :on-press="loginAsGuest">
      <text class="loginButtonText">Login as guest</text>
    </touchable-opacity>
    <touchable-opacity :on-press="junimeaOnFacebook">
      <Image v-if="!isLoading&&!waitingForSubmit" :source="require('../assets/unicorn-colorat-cu-scris.gif')"
             :style="{width: pageWidth/2, height: (pageWidth/1335)*1335/2}" />
    </touchable-opacity>
  </view>
</template>


<!--TODO: To be moved into separate folder-->
<script>
import { Dimensions } from "react-native";
const win = Dimensions.get('window');
import Linking from "react-native";
import axios from "axios";
import Loading from "./Loading";
export default {
  name: "Login",
  components: {
    Loading
  },
  async mounted(){
    await this.sleep(1000)
    this.isLoading = false;
  },
  data(){
    return {
      waitingForSubmit: false,
      //This variable is responsible for displaying the loading component
      isLoading: true,
      //These variables are used to dynamically resize the photo on any device
      pageWidth: win.width,
      pageHeight: win.height,
      username: "",
      password: "",
      email: "",
      showPassword: false,
      //This variable keeps track of whether the user needs to register or not
      //Defaults to true
      registeredUser: true
    }
  },
  methods:{
    //This method redirects you to the junimea facebook page
    junimeaOnFacebook(){
      Linking.Linking.openURL("https://www.facebook.com/www.juni.ro/");
    },
    //This function sleeps the loading component, such that an actual loading is simulated
    sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // The verifyLogin method posts the username and the password to the API;
    // If the status of the request is 200, then the user is allowed to continue to the main page
    // Otherwise, an alert message is displayed
    // Also, the timeout case is handled
    async verifyLogin(){
      //This variable checks if the login operation was successful or not
      let loggedIn = false;
      let shownPassword = false;
      this.waitingForSubmit = true;
      await axios({
        method: 'post',
        url: 'http://52.57.118.176/Auth/Login',
        data:{
          "UserNameOrEmail" : this.username,
          "Password" : this.password,
          "RememberMe" : false
        },
        timeout: 4000
      })
      .then(function(response){
        if(response.data.statusCode === 200) {
          loggedIn = true;
        }
        else {
          shownPassword = true;
          alert(response.data.message + " Wrong username or password!");
        }
      })
      .catch(function (error){
        if(error.response){
          alert(Object.values(error.response.data.errors)[0]);
        }
      });
      this.showPassword = shownPassword;
      if(loggedIn)
        this.$emit('verifyLogin', this.username);
      //Data from the text-inputs is reset
      this.username = "";
      this.password = "";
      this.waitingForSubmit = false;
    },
    //The registerNewUser method registers the user if he cannot be found in the database;
    //If the user is not registered, a text-input with an email address placeholder will appear
    async registerNewUser(){
      if(this.registeredUser) {
        this.registeredUser = false;
        return;
      }
      this.waitingForSubmit = true;
      let isRegistered = false;
      await axios({
        method: 'post',
        url: 'http://52.57.118.176/Auth/Register',
        data:{
          "UserName": this.username,
          "Email": this.email,
          "Password": this.password
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.status === 200){
          isRegistered = true;
          alert("New user registered successfully!");
        }
      })
      .catch(function (error){
        if(error.response){
          alert(Object.values(error.response.data.errors)[0]);
        }
      });
      if(isRegistered)
        this.$emit('verifyLogin', "test");
      //Data from the text-inputs is reset
      this.username = "";
      this.email = "";
      this.password = "";
      this.waitingForSubmit = false;
    },
    // This function allow a new user to enter the feed of posts without making a new account
    // If user logs in as guest, he cannot make new post and cannot access his profile
    loginAsGuest(){
      alert("Beware that if you continue as a guest, your experience will be limited")
      this.$emit('verifyLogin', "");
    }
  }
}
</script>

<style>
.textInput{
  background-color: #505050;
  width: 90%;
  height: 5%;
  margin-bottom: 5%;
  color: ghostwhite;
}
.pageIntro{
  font-size: 32px;
  font-weight: 700;
  color: ghostwhite;
  margin-bottom: 15%;
}
.loginButton{
  background-color: #505050;
  margin: 5%;
}
.loginButtons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.loginButtonText{
  align-self: center;
  font-size: 20px;
  font-weight: 400;
  color: ghostwhite;
  margin-left: 1%;
  margin-right: 1%;
}
.userLogin{
  flex: 1;
  background-color: #212121;
  align-items: center;
  justify-content: center;
}
</style>