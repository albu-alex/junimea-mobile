<template>
<view :class="{ updateProfileDark: (isDarkTheme), updateProfileLight: (!isDarkTheme)}">
  <text-input v-if="isDarkTheme" :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              v-model="firstName" class="inputFormDark">
  </text-input>
  <text-input v-else :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="#070000" placeholder="First Name"
              v-model="firstName" class="inputFormLight">
  </text-input>
  <text-input v-if="isDarkTheme" :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Last Name"
              v-model="lastName" class="inputFormDark">
  </text-input>
  <text-input v-else :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="#070000" placeholder="Last Name"
              v-model="lastName" class="inputFormLight">
  </text-input>
  <text-input v-if="isDarkTheme" :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Email address"
              v-model="emailAddress" class="inputFormDark">
  </text-input>
  <text-input v-else :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="#070000" placeholder="Email address"
              v-model="emailAddress" class="inputFormLight">
  </text-input>
  <touchable-opacity :on-press="updateProfile">
    <text :class="{ sendButtonTextDark: (isDarkTheme), sendButtonTextLight: (!isDarkTheme)}">Send</text>
  </touchable-opacity>
</view>
</template>

<script>
import axios from 'axios'
import {Alert} from "react-native";
export default {
  name: "UpdateProfileForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
    }
  },
  props:{
    isDarkTheme: Boolean,
  },
  methods: {
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
  align-items: center;
  justify-content: center;
  flex: 1;
}
.updateProfileLight{
  background-color: #DADADA;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.inputFormDark{
  background-color: #505050;
  width: 90%;
  margin-bottom: 1%;
  color: ghostwhite;
  font-weight: 200;
}
.inputFormLight{
  background-color: #AFAFAF;
  width: 90%;
  margin-bottom: 1%;
  color: ghostwhite;
  font-weight: 200;
}
.sendButtonTextDark{
  color: #AAAAAA;
  font-weight: 200;
}
.sendButtonTextLight{
  color: #555555;
  font-weight: 200;
}
</style>