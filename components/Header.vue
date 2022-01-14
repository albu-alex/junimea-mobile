<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view :class="{ headerDark: (isDarkTheme), headerLight: (!isDarkTheme)}">
      <touchable-opacity v-if="operatingSystem ==='ios'" class="headerButton" :on-press="showTags">
        <Image v-if="isDarkTheme" class="junimeaLogo" :source="require('../assets/unicorn.png')"
               :style="{width: 25, height:25}" />
        <Image v-else class="junimeaLogo" :source="require('../assets/unicorn-negru-fara-scris.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
      <touchable-opacity v-else class="headerButtonAndroid" :on-press="showTags">
        <Image v-if="isDarkTheme" class="junimeaLogo" :source="require('../assets/unicorn.png')"
               :style="{width: 25, height:25}" />
        <Image v-else class="junimeaLogo" :source="require('../assets/unicorn-negru-fara-scris.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
      <touchable-opacity v-if="operatingSystem === 'ios'" class="headerButton" :on-press="searchPosts">
        <Ionicons v-if="isDarkTheme" name="ios-search-outline" :size=24 color="white" />
        <Ionicons v-else name="ios-search-outline" :size=24 color="black" />
      </touchable-opacity>
      <touchable-opacity v-else class="headerButtonAndroid" :on-press="searchPosts">
        <Ionicons v-if="isDarkTheme" name="ios-search-outline" :size=24 color="white" />
        <Ionicons v-else name="ios-search-outline" :size=24 color="black" />
      </touchable-opacity>
      <touchable-opacity v-if="operatingSystem === 'ios'" class="headerButton" :on-press="goToProfile">
        <Image v-if="profilePic === ''" class="profilePicture"
               :source="require('../assets/avatar.png')"
               :style="{width: 25, height:25, borderRadius: 50}" />
        <Image v-else class="profilePicture"
               :source="{uri: profilePic}"
               :style="{width: 25, height:25, borderRadius: 50}" />
      </touchable-opacity>
      <touchable-opacity v-else class="headerButtonAndroid" :on-press="goToProfile">
        <Image v-if="profilePic === ''" class="profilePicture"
               :source="require('../assets/avatar.png')"
               :style="{width: 25, height:25, borderRadius: 50}" />
        <Image v-else class="profilePicture"
               :source="{uri: profilePic}"
               :style="{width: 25, height:25, borderRadius: 50}" />
      </touchable-opacity>
      <touchable-opacity v-if="operatingSystem === 'ios'" class="headerButton" :on-press="displaySettings">
        <Ionicons v-if="isDarkTheme" name="settings-outline" :size=24 color="white" />
        <Ionicons v-else name="settings-outline" :size=24 color="black" />
      </touchable-opacity>
      <touchable-opacity v-else class="headerButtonAndroid" :on-press="displaySettings">
        <Ionicons v-if="isDarkTheme" name="settings-outline" :size=24 color="white" />
        <Ionicons v-else name="settings-outline" :size=24 color="black" />
      </touchable-opacity>
  </view>
</template>

<!--Did not separate the script in another file for obvious reasons-->
<script>
import { Ionicons } from '@expo/vector-icons';
import {Platform} from 'react-native';
export default {
  name: "Header",
  components:{
    Ionicons
  },
  data(){
    return {
      operatingSystem: ""
    };
  },
  beforeMount(){
    this.operatingSystem = Platform.OS
  },
  methods:{
    searchPosts(){
      this.$emit("searchDisplayed");
    },
    displaySettings(){
      this.$emit("displaySettings");
    },
    showTags(){
      this.$emit("showTags");
    },
    goToProfile(){
      this.$emit("goToProfile");
    },
    debug(e){
      alert(e);
    }
  },
  props:{
    profilePic: String,
    isDarkTheme: Boolean
  }
}
</script>

<style>
.headerButton{
  margin-top: 2%;
}
.headerButtonAndroid{
  margin-top: 1%;
}
.headerDark{
  height: 5%;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerLight{
  height: 5%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerTextDark{
  font-size: 20px;
  font-weight: 700;
  color: ghostwhite;
  margin-left: 5%;
}
.headerTextLight{
  font-size: 20px;
  font-weight: 700;
  color: #070700;
  margin-left: 5%;
}
.junimeaLogo{
  margin-right: 1%;
}
</style>