<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view v-if="isDarkTheme" class="headerDark">
      <touchable-opacity :on-press="showTags">
        <text class="headerTextDark">juni.</text>
      </touchable-opacity>
      <touchable-opacity class="headerButton" :on-press="displaySettings">
        <Image class="junimeaLogo" :source="require('../assets/unicorn.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
      <touchable-opacity class="headerButton" :on-press="searchPosts">
<!--        <Image class="searchIcon" :source="require('../assets/search-icon.png')"-->
<!--               :style="{width: 25, height:25}" />-->
        <Ionicons name="ios-search-outline" :size=24 color="white" />
      </touchable-opacity>
      <touchable-opacity class="headerButton" :on-press="goToProfile">
        <Image v-if="profilePic === ''" class="profilePicture"
               :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
               :style="{width: 25, height:25, borderRadius: 50}" />
        <Image v-else class="profilePicture"
               :source="{uri: profilePic}"
               :style="{width: 25, height:25, borderRadius: 50}" />
      </touchable-opacity>
  </view>
  <view v-else class="headerLight">
    <touchable-opacity :on-press="showTags">
      <text class="headerTextLight">juni.</text>
    </touchable-opacity>
    <touchable-opacity class="headerButton" :on-press="displaySettings">
      <Image class="junimeaLogo" :source="require('../assets/unicorn-negru-fara-scris.png')"
             :style="{width: 25, height:25}" />
    </touchable-opacity>
    <touchable-opacity class="headerButton" :on-press="searchPosts">
<!--      <Image class="searchIcon" :source="require('../assets/search-icon.png')"-->
<!--             :style="{width: 25, height:25}" />-->
      <Ionicons name="ios-search-outline" :size=24 color="black" />
    </touchable-opacity>
    <touchable-opacity class="headerButton" :on-press="goToProfile">
      <Image v-if="profilePic === ''" class="profilePicture"
             :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
             :style="{width: 25, height:25, borderRadius: 50}" />
      <Image v-else class="profilePicture"
             :source="{uri: profilePic}"
             :style="{width: 25, height:25, borderRadius: 50}" />
    </touchable-opacity>
  </view>
</template>

<!--Did not separate the script in another file for obvious reasons-->
<script>
import { Ionicons } from '@expo/vector-icons';
export default {
  name: "Header",
  components:{
    Ionicons
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
  margin-top: 15%;
  margin-left: 5%;
}
.headerTextLight{
  font-size: 20px;
  font-weight: 700;
  color: #070700;
  margin-top: 15%;
  margin-left: 5%;
}
.junimeaLogo{
  margin-right: 1%;
}
.searchIcon{
  margin-right: 8%;
}
</style>