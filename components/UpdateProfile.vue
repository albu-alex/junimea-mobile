<template>
<view :class="{ updateProfileDark: (isDarkTheme), updateProfileLight: (!isDarkTheme)}">
  <OwnStatusBar :isDarkTheme="isDarkTheme" :style="{zIndex: 2}"/>
  <touchable-opacity :on-press="goToMainPage" :style="{marginTop: '3%', marginLeft: '1%'}">
    <Ionicons v-if="isDarkTheme" name="ios-arrow-back" :size=30 color="#AFAFAF"/>
    <Ionicons v-else name="ios-arrow-back" :size=30 color="#505050"/>
  </touchable-opacity>
  <view :style="{alignSelf: 'center', marginTop: '45%', flex: 1}">
    <text-input v-if="isDarkTheme" :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="ghostwhite" placeholder="First Name"
                v-model="firstName" class="inputFormDark">
    </text-input>
    <text-input v-else :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="#070000" placeholder="First Name"
                v-model="firstName" class="inputFormLight">
    </text-input>
    <text-input v-if="isDarkTheme" :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="ghostwhite" placeholder="Last Name"
                v-model="lastName" class="inputFormDark">
    </text-input>
    <text-input v-else :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="#070000" placeholder="Last Name"
                v-model="lastName" class="inputFormLight">
    </text-input>
    <text-input v-if="isDarkTheme" :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="ghostwhite" placeholder="Email address"
                v-model="emailAddress" class="inputFormDark">
    </text-input>
    <text-input v-else :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 5}"
                placeholderTextColor="#070000" placeholder="Email address"
                v-model="emailAddress" class="inputFormLight">
    </text-input>
    <touchable-opacity :on-press="updateProfile" :style="{marginTop: '25%'}">
      <text :class="{ sendButtonTextDark: (isDarkTheme), sendButtonTextLight: (!isDarkTheme)}">Send</text>
    </touchable-opacity>
  </view>
</view>
</template>

<script>
import OwnStatusBar from "./StatusBar";
import axios from 'axios';
import {Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default {
  name: "UpdateProfile",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      isDarkTheme: this.navigation.getParam('theme')
    }
  },
  props:{
    navigation:{
      type: Object
    }
  },
  components:{
    OwnStatusBar,
    Ionicons
  },
  methods: {
    goToMainPage(){
      this.navigation.goBack();
    },
    async updateProfile() {
      let showLogin = false;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/User/Update`,
        data: {
          "FirstName": this.firstName,
          "LastName": this.lastName,
          "Email": this.emailAddress
        },
        timeout: 4000
      })
      .then(function (response) {
        if (response.status === 200) {
          Alert.alert("Success", "Profile updated",
              [
                {
                  text: "Great",
                  style: "cancel",
                },
              ],
              {
                cancelable: true,
              }
          );
        }
      })
      .catch(function () {
        showLogin = true;
      });
      if(!showLogin){
        this.firstName = '';
        this.lastName = '';
        this.emailAddress = '';
        return;
      }
      Alert.alert("Error", "You are not logged in",
          [
            {
              text: "Login",
              style: "cancel",
              onPress: () => this.$emit("redirectToLogin")
            },
            {
              text: "Continue as guest",
              style: "destructive",
              onPress: () => alert(":(")
            }
          ],
          {
            cancelable: true,
            onDismiss: () => alert(":(")
          }
      );
    }
  }
}
</script>

<style>
.updateProfileDark{
  background-color: #252525;
  flex: 1;
}
.updateProfileLight{
  background-color: #DADADA;
  flex: 1;
}
.inputFormDark{
  background-color: #505050;
  width: 325px;
  height: 50px;
  margin-bottom: 3%;
  color: ghostwhite;
  font-weight: 300;
}
.inputFormLight{
  background-color: #AFAFAF;
  width: 325px;
  height: 50px;
  margin-bottom: 3%;
  color: #070000;
  font-weight: 300;
}
.sendButtonTextDark{
  color: #4191e1;
  font-weight: 600;
  font-size: 20px;
  align-self: center;
}
.sendButtonTextLight{
  color: #415ce1;
  font-weight: 600;
  font-size: 20px;
  align-self: center;
}
</style>