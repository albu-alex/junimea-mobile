<template>
<view v-if="isDarkTheme" class="updateProfileDark">
  <text-input :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              v-model="firstName" class="inputFormDark">
  </text-input>
  <text-input :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Last Name"
              v-model="lastName" class="inputFormDark">
  </text-input>
  <text-input :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Email address"
              v-model="emailAddress" class="inputFormDark">
  </text-input>
  <touchable-opacity :on-press="updateProfile">
    <text class="sendButtonTextDark">Send</text>
  </touchable-opacity>
</view>
<view v-else class="updateProfileLight">
  <text-input :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              v-model="firstName" class="inputFormLight">
  </text-input>
  <text-input :autoCorrect="false" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Last Name"
              v-model="lastName" class="inputFormLight">
  </text-input>
  <text-input :autoCorrect="false" keyboardType="email-address" :style="{borderRadius: 10, paddingHorizontal: 2}"
              placeholderTextColor="ghostwhite" placeholder="Email address"
              v-model="emailAddress" class="inputFormLight">
  </text-input>
  <touchable-opacity :on-press="updateProfile">
    <text class="sendButtonTextLight">Send</text>
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
  methods:{
    async updateProfile(){
      await axios({
        method: 'post',
        url: `http://52.57.118.176/User/Update`,
        data:{
          "FirstName" : this.firstName,
          "LastName" : this.lastName,
          "Email" : this.emailAddress
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.status === 200){
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
      .catch(function (error){
        if(error.response){
          Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
              [
                {
                  text: "Try again",
                  style: "cancel",
                }
              ],
              {
                cancelable: true,
              }
          );
        }
      });
      this.firstName = '';
      this.lastName = '';
      this.emailAddress = '';
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