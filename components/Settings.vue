<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <animated:view v-if="isDarkTheme" class="settingsDark" :style="{opacity: viewOpacity}">
    <text class="textPrimaryDark" v-if="newUsername !== '' ">Hello, {{newUsername}}!</text>
    <text class="textPrimaryDark" v-else>Hey, guest!</text>
    <UpdateProfileForm v-if="visiblePrompts" :isDarkTheme="isDarkTheme" class="updateForm"
      @redirectToLogin="logout"/>
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
  </animated:view>
  <animated:view v-else class="settingsLight" :style="{opacity: viewOpacity}">
    <text class="textPrimaryLight" v-if="newUsername !== '' ">Hello, {{newUsername}}!</text>
    <text class="textPrimaryLight" v-else>Hey, guest!</text>
    <UpdateProfileForm :isDarkTheme="isDarkTheme" v-if="visiblePrompts" class="updateForm"
       @redirectToLogin="logout"/>
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
  </animated:view>
</template>

<script>
import UpdateProfileForm from "./UpdateProfileForm";
import {Animated, Easing} from "react-native";
export default {
  name: "Settings",
  data(){
    return{
      //This variable keeps track of the visibility of the update profile prompts
      visiblePrompts: false,
      viewOpacity: 0
    }
  },
  created(){
    this.viewOpacity = new Animated.Value(0)
  },
  mounted(){
    this.animateView();
  },
  props:{
    newUsername: String,
    isDarkTheme: Boolean
  },
  components:{
    UpdateProfileForm
  },
  methods:{
    animateView(){
      this.viewOpacity.setValue(0);

      Animated.timing(this.viewOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => {

      });
    },
    //This function emits a method in which the user is taken back to the login component
    logout(){
      this.$emit("Logout");
    },
    changeViewMode(){
      this.$emit("changeViewMode")
    },
    updateProfile(){
      this.visiblePrompts = !this.visiblePrompts;
    }
  }
}
</script>

<style>
.updateForm{
  margin-bottom: 6%;
}
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