<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <animated:view v-if="isDarkTheme" class="settingsDark" :style="{opacity: viewOpacity}">
<!--    <UpdateProfileForm v-if="visiblePrompts" :isDarkTheme="isDarkTheme" class="updateForm"-->
<!--      @redirectToLogin="logout"/>-->
    <view class="settingsTab">
      <touchable-opacity :on-press="logout" class="buttonDark">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons name="log-out-outline" :size=24 color="#AAAAAA" />
          <text class="textSecondaryDark">Logout</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode" class="buttonDark">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons name="moon-sharp" :size=24 color="#AAAAAA" />
          <text class="textSecondaryDark">Dark mode</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile" class="buttonDark">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <AntDesign name="profile" :size=24 color="#AAAAAA" />
          <text class="textSecondaryDark">Update profile</text>
        </view>
      </touchable-opacity>
    </view>
  </animated:view>
  <animated:view v-else class="settingsLight" :style="{opacity: viewOpacity}">
<!--    <UpdateProfileForm :isDarkTheme="isDarkTheme" v-if="visiblePrompts" class="updateForm"-->
<!--       @redirectToLogin="logout"/>-->
    <view class="settingsTab">
      <touchable-opacity :on-press="logout" class="buttonLight">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons name="log-out-outline" :size=24 color="#555555" />
          <text class="textSecondaryLight">Logout</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode" class="buttonLight">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons name="sunny-sharp" :size=24 color="#555555" />
          <text class="textSecondaryLight">Light mode</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile" class="buttonLight">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <AntDesign name="profile" :size=24 color="#555555" />
          <text class="textSecondaryLight">Update profile</text>
        </view>
      </touchable-opacity>
    </view>
  </animated:view>
</template>

<script>
import UpdateProfileForm from "./UpdateProfileForm";
import {Animated, Easing} from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
export default {
  name: "Settings",
  data(){
    return{
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
    isDarkTheme: Boolean,
    //This variable keeps track of the visibility of the update profile prompts
    visiblePrompts: Boolean,
  },
  components:{
    UpdateProfileForm,
    Ionicons,
    AntDesign
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
      this.$emit("visiblePrompts")
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
  height: 100%;
}
.textSecondaryDark{
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 1%;
}
.textSecondaryLight{
  color: #555555;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 1%;
}
.buttonDark{
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: rgba(218,218,218,60);
  height: 33%;
  justify-content: center;
}
.buttonLight{
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: rgba(25,25,25,60);
  height: 33%;
  justify-content: center;
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