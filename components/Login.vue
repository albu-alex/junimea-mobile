<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button, a register button and a welcome message-->
<template>
  <view class="userLogin">
    <text class="pageIntro">Welcome to juni.</text>
    <text-input placeholder="Username or Email" v-model="username" class="textInput"></text-input>
    <text-input placeholder="Email Address" v-model="email" class="textInput" v-if="!registeredUser"></text-input>
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


<!--TODO: To be moved into separate folder-->
<script>
import axios from "axios";
export default {
  name: "Login",
  data(){
    return {
      username: "",
      password: "",
      email: "",
      //This variable keeps track of whether the user needs to register or not
      //Defaults to true
      registeredUser: true
    }
  },
  methods:{
    // The verifyLogin method posts the username and the password to the API;
    // If the status of the request is 200, then the user is allowed to continue to the main page
    // Otherwise, an alert message is displayed
    // Also, the timeout case is handled
    async verifyLogin(){
      //This variable checks if the login operation was successful or not
      let loggedIn = false;
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
        if(response.status === 200) {
          loggedIn = true;
        }
        else
          alert(response.data.message + " Wrong username or password!");
      })
      .catch(function (response){
        //Debugging purposes only
        // loggedIn = true;
        alert(response + " You must not leave the fields empty!");
      });
      if(loggedIn)
        this.$emit('verifyLogin', this.username);
      //Data from the text-inputs is reset
      this.username = "";
      this.password = "";
      //Debugging purposes only
      // this.$emit('verifyLogin', "test");
    },
    //The registerNewUser method registers the user if he cannot be found in the database;
    //If the user is not registered, a text-input with an email address placeholder will appear
    //TODO: finalise implementing function
    async registerNewUser(){
      if(this.registeredUser)
        this.registeredUser = false;
      else{
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
        .catch(function (response){
          if(response.status === 500){
            alert("This account has already been registered!");
          }
          else
            alert(response);
        });
        if(isRegistered)
          this.$emit('verifyLogin', "test");
      }
      //Data from the text-inputs is reset
      this.username = "";
      this.email = "";
      this.password = "";
      // Debugging purposes only
      // this.$emit('verifyLogin', "test");
    }
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