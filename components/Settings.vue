<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <view class="settings">
    <text class="textPrimary" v-if="newUsername !== '' ">Hello, {{newUsername}}!</text>
    <text class="textPrimary" v-else>Hey, guest!</text>
    <UpdateProfileForm v-if="visiblePrompts" />
    <view class="settingsTab">
      <touchable-opacity :on-press="logout">
        <text class="textSecondary">Logout</text>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode">
        <text class="textSecondary">Change view mode</text>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile">
        <text class="textSecondary">Update your profile</text>
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import axios from 'axios';
import UpdateProfileForm from "./UpdateProfileForm";
export default {
  name: "Settings",
  data(){
    return{
      firstName: "",
      lastName: "",
      emailAddress: "",
      //This variable keeps track of the visibility of the update profile prompts
      visiblePrompts: false
    }
  },
  props:{
    newUsername: String
  },
  components:{
    UpdateProfileForm
  },
  methods:{
    //This function emits a method in which the user is taken back to the login component
    logout(){
      this.$emit("Logout");
    },
    changeViewMode(){
      alert("New feature coming soon!");
    },
    async updateProfile(){
      if(!this.visiblePrompts){
        this.visiblePrompts = true;
        return;
      }
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
      .catch(function(response){
        alert(response)
      });
      this.visiblePrompts = false;
    }
  }
}
</script>

<style>
.settings{
  background-color: #252525;
}
.settingsTab{
  flex-direction: row;
  justify-content: space-between;
}
.textSecondary{
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 200;
}
.textPrimary {
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 500;
  align-self: center;
  margin-bottom: 10px;
}
</style>