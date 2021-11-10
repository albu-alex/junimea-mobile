<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button, a register button and a welcome message-->
<template>
  <view v-if="isDarkTheme" class="userLoginDark">
    <Loading v-if="isLoading"/>
    <view v-if="waitingForSubmit" :style="{flex: 1, justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <text class="pageIntroDark" v-if="!isLoading&&!waitingForSubmit">Welcome to juni.</text>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&!registeredUser" name="user" :size=16 color="ghostwhite"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&!registeredUser" placeholderTextColor="ghostwhite"
                placeholder="Username" v-model="username" class="textInputDark" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30, zIndex: 1, position: 'absolute'}"
                keyboardAppearance="dark" autoComplete="username"></text-input>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&registeredUser" name="user" :size=16 color="ghostwhite"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&registeredUser"
                placeholderTextColor="ghostwhite" placeholder="Username or Email" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30, zIndex: 1}"
                v-model="username" class="textInputDark" keyboardAppearance="dark"></text-input>
    <Entypo v-if="!isLoading&&!waitingForSubmit&&!registeredUser" name="email" :size=16 color="ghostwhite"
            :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" keyboardType="email-address" keyboardAppearance="dark"
                v-if="!isLoading&&!waitingForSubmit&&!registeredUser" placeholderTextColor="ghostwhite"
                placeholder="Email Address" v-model="email" class="textInputDark" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30, zIndex: 1}"
                autoComplete="email"></text-input>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit" name="lock" :size=16 color="ghostwhite"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit" placeholderTextColor="ghostwhite"
                :secureTextEntry="!showPassword" placeholder="Password" v-model="password" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30, zIndex: 1}"
                class="textInputDark" keyboardAppearance="dark" autoComplete="password"></text-input>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit&&registeredUser" :style="{borderRadius: 10}" class="loginButtonDark" :on-press="verifyLogin">
      <text class="loginButtonTextDark">Login</text>
    </touchable-opacity>
    <touchable-opacity :style="{borderRadius: 10}" v-if="!isLoading&&!waitingForSubmit&&registeredUser" class="loginButtonDark" :on-press="loginAsGuest">
      <text class="loginButtonTextDark">Login as guest</text>
    </touchable-opacity>
    <text v-if="!isLoading&&!waitingForSubmit&&registeredUser" class="bugButtonTextDark">Or you can sign up</text>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :style="{borderRadius: 10}" class="loginButtonDark" :on-press="registerNewUser">
      <text class="loginButtonTextDark">Register</text>
    </touchable-opacity>
    <view class="loginWithServices">
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithFacebook">
<!--        <Image :source="require('../assets/login-button-facebook.png')"-->
<!--               :style="{width: 124, height: 50}" />-->
        <FontAwesome5 name="facebook" :size=60 color="blue" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithGoogle">
<!--        <Image :source="require('../assets/login-google-button.png')"-->
<!--               :style="{width: 124, height: 50, marginLeft: 2}" />-->
        <FontAwesome5 class="logoGoogle" name="google-plus-square" :size=60 color="red" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithApple">
<!--        <Image :source="require('../assets/login-button-apple.png')"-->
<!--               :style="{width: 124, height: 50, marginLeft: 2}" />-->
        <FontAwesome5 name="apple" :size=60 color="ghostwhite" />
      </touchable-opacity>
    </view>
    <touchable-opacity :on-press="junimeaOnFacebook">
      <Image v-if="!isLoading&&!waitingForSubmit" :source="require('../assets/unicorn-alb-cu-scris.png')"
             :style="{width: pageWidth/2, height: (pageWidth/1335)*1335/2}" />
    </touchable-opacity>
    <touchable-opacity v-if="!waitingForSubmit" :on-press="reportBugs">
      <text class="bugButtonTextDark">Found any bugs? Report them!</text>
    </touchable-opacity>
  </view>
  <view v-else class="userLoginLight">
    <Loading v-if="isLoading"/>
    <view v-if="waitingForSubmit" :style="{flex: 1, justifyContent: 'center'}">
      <activity-indicator size="large" color="black" />
    </view>
    <text class="pageIntroLight" v-if="!isLoading&&!waitingForSubmit">Welcome to juni.</text>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&!registeredUser" name="user" :size=16 color="#070700"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&!registeredUser" placeholderTextColor="#070700"
                placeholder="Username" v-model="username" class="textInputLight" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30}"
                keyboardAppearance="light" autoComplete="username"></text-input>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&registeredUser" name="user" :size=16 color="#070700"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&registeredUser"
                placeholderTextColor="#070700" placeholder="Username or Email" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30}"
                v-model="username" class="textInputLight" keyboardAppearance="light"></text-input>
    <Entypo v-if="!isLoading&&!waitingForSubmit&&!registeredUser" name="email" :size=16 color="#070700"
            :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" keyboardType="email-address" keyboardAppearance="light"
                v-if="!isLoading&&!waitingForSubmit&&!registeredUser" placeholderTextColor="#070700"
                placeholder="Email Address" v-model="email" class="textInputLight" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30}"
                autoComplete="email"></text-input>
    <FontAwesome5 v-if="!isLoading&&!waitingForSubmit" name="lock" :size=16 color="#070700"
                  :style="{zIndex: 2, paddingTop: 30, paddingRight: 320}"/>
    <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit" placeholderTextColor="#070700"
                :secureTextEntry="!showPassword" placeholder="Password" v-model="password" :style="{borderRadius: 15, paddingHorizontal: 25, marginTop: -30}"
                class="textInputLight" keyboardAppearance="light" autoComplete="password"></text-input>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit&&registeredUser" :style="{borderRadius: 10}" class="loginButtonLight" :on-press="verifyLogin">
      <text class="loginButtonTextLight">Login</text>
    </touchable-opacity>
    <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 7}" v-if="!isLoading&&!waitingForSubmit&&registeredUser" class="loginButtonLight" :on-press="loginAsGuest">
      <text class="loginButtonTextLight">Login as guest</text>
    </touchable-opacity>
    <text v-if="!isLoading&&!waitingForSubmit&&registeredUser" class="bugButtonTextLight">Or you can sign up</text>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :style="{borderRadius: 10}" class="loginButtonLight" :on-press="registerNewUser">
      <text class="loginButtonTextLight">Register</text>
    </touchable-opacity>
    <view class="loginWithServices">
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithFacebook">
<!--        <Image :source="require('../assets/login-button-facebook.png')"-->
<!--               :style="{width: 124, height: 50}" />-->
        <FontAwesome5 name="facebook" :size=60 color="blue" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithGoogle">
<!--        <Image :source="require('../assets/login-google-button.png')"-->
<!--               :style="{width: 124, height: 50, marginLeft: 2}" />-->
        <FontAwesome5 class="logoGoogle"  name="google-plus-square" :size=60 color="red" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithApple">
<!--        <Image :source="require('../assets/login-button-apple.png')"-->
<!--               :style="{width: 124, height: 50, marginLeft: 2}" />-->
        <FontAwesome5 name="apple" :size=60 color="#070700" />
      </touchable-opacity>
    </view>
    <touchable-opacity :on-press="junimeaOnFacebook">
      <Image v-if="!isLoading&&!waitingForSubmit" :source="require('../assets/unicorn-negru-cu-scris.png')"
             :style="{width: pageWidth/2, height: (pageWidth/1335)*1335/2}" />
    </touchable-opacity>
    <touchable-opacity v-if="!waitingForSubmit" :on-press="reportBugs">
      <text class="bugButtonTextLight">Found any bugs? Report them!</text>
    </touchable-opacity>
  </view>
</template>


<!--TODO: To be moved into separate folder-->
<script>
import { Dimensions, Alert} from "react-native";
const win = Dimensions.get('window');
import Linking from "react-native";
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import axios from "axios";
import Loading from "./Loading";
export default {
  name: "Login",
  components: {
    Loading,
    FontAwesome5,
    Entypo
  },
  props:{
    isDarkTheme: Boolean,
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
    loginWithApple(){
      alert("Apple register not available yet!")
    },
    loginWithGoogle(){
      alert("Google register not available yet!")
    },
    loginWithFacebook(){
      alert("Facebook register not available yet!")
    },
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
      let userToken;
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
          userToken = response.data.token
        }
        else {
          shownPassword = true;
          Alert.alert(response.data.message, "Wrong username or password",
              [
                {
                  text: "Try again",
                  style: "cancel",
                },
                {
                  text: "Register",
                  style: "register",
                  onPress: () => this.registeredUser = false,
                }
              ],
              {
                cancelable: true,
              }
          );
        }
      })
      .catch(function (error){
        if(error.response){
          Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
              [
                {
                  text: "Try again",
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              }
          );
        }
      });
      this.showPassword = shownPassword;
      if(loggedIn) {
        this.$emit('verifyLogin', {username: this.username, token: userToken});
      }
      //Data from the text-inputs is reset
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
      let userToken;
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
          userToken = response.data.token
        }
      })
      .catch(function (error){
        if(error.response)
          Alert.alert("Wait", "This account has already been registered",
              [
                {
                  text: "Login",
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              }
          );
        else
          Alert.alert("Error", "Undefined behaviour",
              [
                {
                  text: "Try again",
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              }
          );
      });
      if(isRegistered)
        this.$emit('verifyLogin', {username: this.username, token: userToken});
      this.waitingForSubmit = false;
    },
    // This function allow a new user to enter the feed of posts without making a new account
    // If user logs in as guest, he cannot make new post and cannot access his profile
    loginAsGuest(){
      alert("Beware that if you continue as a guest, your experience will be limited");
      this.$emit('verifyLogin', {username: "guest", token: ""});
    },
    //This function will consist in an email prompt in order to contact us regarding any bugs
    reportBugs(){
      alert("New feature coming soon!");
    }
  }
}
</script>

<style>
.loginWithServices{
  margin-top: 4%;
  margin-bottom: 1%;
  flex-direction: row;
}
.logoGoogle{
  margin-left: 25%;
  margin-right: 25%;
  align-self: center;
}
.textInputDark{
  background-color: #505050;
  width: 90%;
  height: 5%;
  margin-bottom: 5%;
  color: ghostwhite;
}
.textInputLight{
  background-color: #AFAFAF;
  width: 90%;
  height: 5%;
  margin-bottom: 5%;
  color: #070700;
}
.pageIntroDark{
  font-size: 32px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 10%;
  margin-bottom: 5%;
}
.pageIntroLight{
  font-size: 32px;
  font-weight: 700;
  color: #070700;
  margin-top: 10%;
  margin-bottom: 5%;
}
.loginButtonDark{
  background-color: #505050;
  margin: 5%;
  width: 90%;
}
.loginButtonLight{
  background-color: #AFAFAF;
  margin: 5%;
  width: 90%;
}
.loginButtons{
  display: flex;
  justify-content: space-between;
}
.loginButtonTextDark{
  align-self: center;
  font-size: 20px;
  font-weight: 400;
  color: ghostwhite;
  margin-top: 1%;
  margin-bottom: 1%;
}
.loginButtonTextLight{
  align-self: center;
  font-size: 20px;
  font-weight: 400;
  color: #070700;
  margin-top: 1%;
  margin-bottom: 1%;
}
.bugButtonTextDark{
  align-self: center;
  font-size: 16px;
  font-weight: 300;
  color: #AAAAAA;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 5%;
}
.bugButtonTextLight{
  align-self: center;
  font-size: 16px;
  font-weight: 300;
  color: #555555;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 5%;
}
.userLoginDark{
  flex: 1;
  background-color: #212121;
  align-items: center;
  justify-content: center;
}
.userLoginLight{
  flex: 1;
  background-color: #DEDEDE;
  align-items: center;
  justify-content: center;
}
</style>