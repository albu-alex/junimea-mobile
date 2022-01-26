<!--This component is used to validate the user name and password-->
<!--It consists of two text inputs, a login button, a register button and a welcome message-->
<template>
<touchable-opacity :on-press="keyboardDismiss" :active-opacity="1" :style="{flex: 1}">
  <view :class="{ userLoginDark: (isDarkTheme), userLoginLight: (!isDarkTheme)}">
    <Loading v-if="isLoading"/>
    <view v-if="waitingForSubmit" :style="{flex: 1, justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <text :class="{ pageIntroDark: (isDarkTheme), pageIntroLight: (!isDarkTheme)}" v-if="!isLoading&&!waitingForSubmit&&operatingSystem === 'ios' ">Welcome to juni.</text>
    <text :class="{ pageIntroDarkAndroid: (isDarkTheme), pageIntroLightAndroid: (!isDarkTheme)}" v-if="!isLoading&&!waitingForSubmit&&operatingSystem === 'android' ">Welcome to juni.</text>
    <view :style="{flexDirection: 'row'}">
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&isDarkTheme" name="user" :size=16 color="ghostwhite"
                    class="logo"/>
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&!isDarkTheme" name="user" :size=16 color="#070000"
                    class="logo"/>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&isDarkTheme" placeholderTextColor="ghostwhite"
                  placeholder="Username" :default-value="username" class="textInputDark" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  keyboardAppearance="dark" autoComplete="username" :on-change-text="onChangeUsername"></text-input>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&!isDarkTheme" placeholderTextColor="#070700"
                  placeholder="Username" :default-value="username" class="textInputLight" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  keyboardAppearance="light" autoComplete="username" :on-change-text="onChangeUsername"></text-input>
    </view>
    <view :style="{flexDirection: 'row'}">
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&registeredUser&&isDarkTheme" name="user" :size=16 color="ghostwhite"
                    class="logo"/>
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&registeredUser&&!isDarkTheme" name="user" :size=16 color="#070000"
                    class="logo"/>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&registeredUser&&isDarkTheme"
                  placeholderTextColor="ghostwhite" placeholder="Username or Email" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  :default-value="username" class="textInputDark" keyboardAppearance="dark" :on-change-text="onChangeUsername"></text-input>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&registeredUser&&!isDarkTheme"
                  placeholderTextColor="#070700" placeholder="Username or Email" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  :default-value="username" class="textInputLight" keyboardAppearance="light" :on-change-text="onChangeUsername"></text-input>
    </view>
    <view :style="{flexDirection: 'row'}">
      <Entypo v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&isDarkTheme" name="email" :size=16 color="ghostwhite"
              class="logo"/>
      <Entypo v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&!isDarkTheme" name="email" :size=16 color="#070000"
              class="logo"/>
      <text-input :autoCorrect="false" keyboardType="email-address" keyboardAppearance="dark"
                  v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&isDarkTheme" placeholderTextColor="ghostwhite"
                  placeholder="Email Address" :default-value="email" class="textInputDark" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  autoComplete="email" :on-change-text="onChangeEmail"></text-input>
      <text-input :autoCorrect="false" keyboardType="email-address" keyboardAppearance="light"
                  v-if="!isLoading&&!waitingForSubmit&&!registeredUser&&!isDarkTheme" placeholderTextColor="#070700"
                  placeholder="Email Address" :default-value="email" class="textInputLight" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  autoComplete="email" :on-change-text="onChangeEmail"></text-input>
    </view>
    <view :style="{flexDirection: 'row'}">
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&isDarkTheme" name="lock" :size=16 color="ghostwhite"
                    class="logo"/>
      <FontAwesome5 v-if="!isLoading&&!waitingForSubmit&&!isDarkTheme" name="lock" :size=16 color="#070000"
                    class="logo"/>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&isDarkTheme" placeholderTextColor="ghostwhite"
                  :secureTextEntry="!showPassword" placeholder="Password" :default-value="password" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  class="textInputDark" keyboardAppearance="dark" autoComplete="password" :on-change-text="onChangePassword"></text-input>
      <text-input :autoCorrect="false" v-if="!isLoading&&!waitingForSubmit&&!isDarkTheme" placeholderTextColor="#070700"
                  :secureTextEntry="!showPassword" placeholder="Password" :default-value="password" :style="{borderRadius: 15, paddingHorizontal: 25}"
                  class="textInputLight" keyboardAppearance="light" autoComplete="password" :on-change-text="onChangePassword"></text-input>
    </view>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit&&registeredUser" :style="{borderRadius: 10}" :class="{ loginButtonDark: (isDarkTheme), loginButtonLight: (!isDarkTheme)}" :on-press="verifyLogin">
      <text :class="{ loginButtonTextDark: (isDarkTheme), loginButtonTextLight: (!isDarkTheme)}">Login</text>
    </touchable-opacity>
    <touchable-opacity :style="{borderRadius: 10}" v-if="!isLoading&&!waitingForSubmit&&registeredUser" :class="{ loginButtonDark: (isDarkTheme), loginButtonLight: (!isDarkTheme)}" :on-press="loginAsGuest">
      <text :class="{ loginButtonTextDark: (isDarkTheme), loginButtonTextLight: (!isDarkTheme)}">Login as guest</text>
    </touchable-opacity>
    <text v-if="!isLoading&&!waitingForSubmit&&registeredUser" :class="{ bugButtonTextDark: (isDarkTheme), bugButtonTextLight: (!isDarkTheme)}">Or you can sign up</text>
    <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :style="{borderRadius: 10}" :class="{ loginButtonDark: (isDarkTheme), loginButtonLight: (!isDarkTheme)}" :on-press="registerNewUser">
      <text :class="{ loginButtonTextDark: (isDarkTheme), loginButtonTextLight: (!isDarkTheme)}">Register</text>
    </touchable-opacity>
    <view class="loginWithServices">
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithFacebook">
        <FontAwesome5 name="facebook" :size=60 color="#0044FF" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithGoogle">
        <FontAwesome5 class="logoGoogle" name="google-plus-square" :size=60 color="red" />
      </touchable-opacity>
      <touchable-opacity v-if="!isLoading&&!waitingForSubmit" :on-press="loginWithApple">
        <FontAwesome5 name="apple" :size=60 color="ghostwhite" />
      </touchable-opacity>
    </view>
    <touchable-opacity :on-press="junimeaOnFacebook">
      <Image v-if="!isLoading&&!waitingForSubmit&&operatingSystem === 'ios'" :source="require('../assets/unicorn-alb-cu-scris-preview.png')"
             :style="{width: pageWidth/2, height: (pageWidth/1335)*1335/2}" />
    </touchable-opacity>
    <touchable-opacity v-if="!waitingForSubmit&&operatingSystem === 'ios'" :on-press="reportBugs">
      <text :class="{ bugButtonTextDark: (isDarkTheme), bugButtonTextLight: (!isDarkTheme)}">Found any bugs? Report them!</text>
    </touchable-opacity>
    <touchable-opacity v-if="!waitingForSubmit&&operatingSystem === 'android'" :on-press="reportBugs">
      <text :class="{ bugButtonTextDarkAndroid: (isDarkTheme), bugButtonTextLightAndroid: (!isDarkTheme)}">Found any bugs? Report them!</text>
    </touchable-opacity>
  </view>
</touchable-opacity>
</template>


<script>
import * as GoogleSignIn from 'expo-google-sign-in';
const win = Dimensions.get('window');
import {Linking, Platform, Keyboard, Dimensions, Alert} from "react-native";
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import axios from "axios";
import Loading from "./Loading";
import { CommonActions } from '@react-navigation/native';
export default {
  name: "Login",
  components: {
    Loading,
    FontAwesome5,
    Entypo
  },
  props:{
    navigation: {
      type: Object
    }
  },
  beforeMount(){
    this.operatingSystem = Platform.OS;
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
      registeredUser: true,
      operatingSystem: "",
      isDarkTheme: this.navigation.getParam('theme')
    }
  },
  methods:{
    keyboardDismiss(){
      Keyboard.dismiss();
    },
    onChangeUsername(newText){
      this.username = newText;
    },
    onChangeEmail(newText){
      this.email = newText;
    },
    onChangePassword(newText){
      this.password = newText
    },
    loginWithApple(){
      alert("Apple register not available yet!")
    },
    async loginWithGoogle(){
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === 'success') {
          alert("Logged in!")
        }
      } catch ({ message }) {
        alert('login: Error:' + message);
      }
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
      //Data from the text-inputs is reset
      this.username = "";
      this.password = "";
      if(loggedIn) {
        this.navigation.navigate('MainPage', {theme: this.isDarkTheme})
      }
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
        this.navigation.navigate('MainPage', {theme: this.isDarkTheme})
    },
    // This function allow a new user to enter the feed of posts without making a new account
    // If user logs in as guest, he cannot make new post and cannot access his profile
    loginAsGuest(){
      alert("Beware that if you continue as a guest, your experience will be limited");
      this.navigation.navigate('MainPage', {theme: this.isDarkTheme})
    },
    //This function will consist in an email prompt in order to contact us regarding any bugs
    reportBugs(){
      alert("New feature coming soon!");
    }
  }
}
</script>

<style>
.logo{
  z-index: 2;
  margin-top: 3%;
}
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
  height: 40px;
  margin-bottom: 5%;
  color: ghostwhite;
  margin-left: -5%;
}
.textInputLight{
  background-color: #AFAFAF;
  width: 90%;
  height: 40px;
  margin-bottom: 5%;
  color: #070700;
  margin-left: -5%;
}
.pageIntroDark{
  font-size: 32px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 10%;
  margin-bottom: 5%;
}
.pageIntroDarkAndroid{
  font-size: 32px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 40%;
  margin-bottom: 5%;
}
.pageIntroLight{
  font-size: 32px;
  font-weight: 700;
  color: #070700;
  margin-top: 10%;
  margin-bottom: 5%;
}
.pageIntroLightAndroid{
  font-size: 32px;
  font-weight: 700;
  color: #070700;
  margin-top: 40%;
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
.bugButtonTextDarkAndroid{
  align-self: center;
  font-size: 16px;
  font-weight: 300;
  color: #AAAAAA;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 10%;
  margin-bottom: 45%;
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
.bugButtonTextLightAndroid{
  align-self: center;
  font-size: 16px;
  font-weight: 300;
  color: #555555;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 10%;
  margin-bottom: 45%;
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