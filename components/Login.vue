<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button and a welcome message-->
<template>
  <view class="userLogin" v-if="!loggedIn">
    <text class="pageIntro">Welcome to juni.</text>
    <text-input placeholder="Username or Email" v-model="username" class="textInput"></text-input>
    <text-input placeholder="Password" v-model="password" class="textInput"></text-input>
    <touchable-opacity class="loginButton" :on-press="verifyLogin">
      <text class="loginButtonText">Login</text>
    </touchable-opacity>
  </view>
</template>


<!--TODO: To be moved-->
<script>
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
    verifyLogin(){
      if(this.username === "owner" && this.password === "owner")
        this.loggedIn = true;
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
}
.loginButtonText{
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