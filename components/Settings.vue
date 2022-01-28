<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <animated:view :class="{ settingsDark: (isDarkTheme), settingsLight: (!isDarkTheme)}" :style="{opacity: viewOpacity}">
    <view class="settingsTab">
      <touchable-opacity :on-press="logout" :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons v-if="isDarkTheme" name="log-out-outline" :size=24 color="#AAAAAA" />
          <Ionicons v-else name="log-out-outline" :size=24 color="#555555" />
          <text :class="{ textSecondaryDark: (isDarkTheme), textSecondaryLight: (!isDarkTheme)}">Logout</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode" :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons v-if="isDarkTheme" name="moon-sharp" :size=24 color="#AAAAAA" />
          <Ionicons v-else name="sunny-sharp" :size=24 color="#555555" />
          <text v-if="isDarkTheme" class="textSecondaryDark">Dark mode</text>
          <text v-else class="textSecondaryLight">Light mode</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="updateProfile" :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <AntDesign v-if="isDarkTheme" name="profile" :size=24 color="#AAAAAA" />
          <AntDesign v-else name="profile" :size=24 color="#555555" />
          <text :class="{ textSecondaryDark: (isDarkTheme), textSecondaryLight: (!isDarkTheme)}">Update profile</text>
        </view>
      </touchable-opacity>
      <touchable-opacity :on-press="closeSettings" :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons v-if="isDarkTheme" name="exit" :size=24 color="#AAAAAA" />
          <Ionicons v-else name="exit" :size=24 color="#555555" />
          <text :class="{ textSecondaryDark: (isDarkTheme), textSecondaryLight: (!isDarkTheme)}">Close settings</text>
        </view>
      </touchable-opacity>
    </view>
  </animated:view>
</template>

<script>
import UpdateProfile from "./UpdateProfile";
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
    isDarkTheme: Boolean
  },
  components:{
    UpdateProfile,
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
      this.$emit("updateProfile")
    },
    closeSettings(){
      this.$emit("closeSettings")
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