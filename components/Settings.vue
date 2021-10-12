<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <view v-if="isDarkTheme" class="settingsDark">
    <text class="textPrimaryDark" v-if="newUsername !== '' ">Hello, {{newUsername}}!</text>
    <text class="textPrimaryDark" v-else>Hey, guest!</text>
    <UpdateProfileForm :isDarkTheme="isDarkTheme" v-if="visiblePrompts" />
    <view class="settingsTab">
      <touchable-opacity :on-press="logout">
        <text class="textSecondaryDark">Logout</text>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode">
        <text class="textSecondaryDark">Change view mode</text>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile">
        <text class="textSecondaryDark">Update your profile</text>
      </touchable-opacity>
    </view>
  </view>
  <view v-else class="settingsLight">
    <text class="textPrimaryLight" v-if="newUsername !== '' ">Hello, {{newUsername}}!</text>
    <text class="textPrimaryLight" v-else>Hey, guest!</text>
    <UpdateProfileForm :isDarkTheme="isDarkTheme" v-if="visiblePrompts" />
    <view class="settingsTab">
      <touchable-opacity :on-press="logout">
        <text class="textSecondaryLight">Logout</text>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode">
        <text class="textSecondaryLight">Change view mode</text>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile">
        <text class="textSecondaryLight">Update your profile</text>
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
    newUsername: String,
    isDarkTheme: Boolean
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
      this.$emit("changeViewMode")
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
.settingsDark{
  background-color: #252525;
}
.settingsLight{
  background-color: #DADADA;
}
.settingsTab{
  flex-direction: row;
  justify-content: space-between;
}
.textSecondaryDark{
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 200;
}
.textSecondaryLight{
  color: #555555;
  font-size: 14px;
  font-weight: 200;
}
.textPrimaryDark {
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 500;
  align-self: center;
  margin-bottom: 10px;
}
.textPrimaryLight {
  color: #555555;
  font-size: 14px;
  font-weight: 500;
  align-self: center;
  margin-bottom: 10px;
}
</style>