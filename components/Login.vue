<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button, a register button and a welcome message-->
<template>
  <view class="userLogin">
    <text class="pageIntro">Welcome to juni.</text>
    <text-input placeholder="Username or Email" v-model="username" class="textInput"></text-input>
    <text-input placeholder="Password" v-model="password" class="textInput"></text-input>
    <view class="loginButtons">
      <touchable-opacity class="loginButton" :on-press="verifyLogin">
        <text class="loginButtonText">Login</text>
      </touchable-opacity>
      <touchable-opacity class="loginButton" :on-press="registerNewUser">
        <text class="loginButtonText">Register</text>
      </touchable-opacity>
    </view>
  </view>
</template>


<!--TODO: To be moved-->
<script>
import axios from "axios";
export default {
  name: "Login",
  data(){
    return {
      username: "",
      password: "",
      loggedIn: false
    }
  },
  methods:{
    async verifyLogin(){
      await axios({
        method: 'post',
        url: 'http://52.57.118.176/Auth/Login',
        data:{
          UserNameOrEmail: this.username,
          Password: this.password,
          RememberME: true
        }
      })
      .then(function(response){
        // if(response.data.succeeded)
        //   this.$emit("changeComponent")
        // else
        //   alert(response.data.message + " Wrong username or password!")
        alert(response.data.succeeded);
        this.$emit("changeComponent");
      })
      .catch(function (response){
        alert("Timeout!")
      });
    },
    registerNewUser(){
      // TODO: Redirect user to register page
      alert("New feature coming soon!");
    },
  }
}
</script>

<style>
.textInput{
  background-color: #505050;
  width: 100%;
  height: 5%;
  margin-bottom: 5%;
  color: ghostwhite;
}
.pageIntro{
  font-size: 32px;
  font-weight: 700;
  color: ghostwhite;
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