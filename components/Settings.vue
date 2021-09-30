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
import UpdateProfileForm from "./UpdateProfileForm";
export default {
  name: "Settings",
  data(){
    return{
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