<template>
<view class="updateProfile">
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              v-model="firstName" class="inputForm">
  </text-input>
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="Last Name"
              v-model="lastName" class="inputForm">
  </text-input>
  <text-input :autoCorrect="false" keyboardType="email-address"
              placeholderTextColor="ghostwhite" placeholder="Email address"
              v-model="emailAddress" class="inputForm">
  </text-input>
  <touchable-opacity :on-press="updateProfile">
    <text class="sendButtonText">Send</text>
  </touchable-opacity>
</view>
</template>

<script>
import axios from 'axios'
export default {
  name: "UpdateProfileForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
    }
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
          alert("Your profile details have been updated successfully!")
        }
      })
      .catch(function (error){
        if(error.response){
          alert(Object.values(error.response.data.errors)[0]);
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
.updateProfile{
  background-color: #252525;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.inputForm{
  background-color: #505050;
  width: 90%;
  margin-bottom: 1%;
  color: ghostwhite;
  font-weight: 200;
}
.sendButtonText{
  color: #AAAAAA;
  font-weight: 200;
}
</style>