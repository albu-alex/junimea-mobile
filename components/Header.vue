<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view v-if="isDarkTheme" class="headerDark">
      <touchable-opacity :on-press="goToTop">
        <text class="headerTextDark">juni.</text>
      </touchable-opacity>
      <touchable-opacity :on-press="displaySettings">
        <Image class="junimeaLogo" :source="require('../assets/unicorn.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
      <touchable-opacity :on-press="searchPosts">
        <Image class="searchIcon" :source="require('../assets/search-icon.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
      <touchable-opacity :on-press="goToProfile">
        <Image v-if="profilePic === ''" class="profilePicture"
               :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
               :style="{width: 25, height:25, borderRadius: 50}" />
        <Image v-else class="profilePicture"
               :source="{uri: profilePic}"
               :style="{width: 25, height:25, borderRadius: 50}" />
      </touchable-opacity>
  </view>
  <view v-else class="headerLight">
    <touchable-opacity :on-press="goToTop">
      <text class="headerTextLight">juni.</text>
    </touchable-opacity>
    <touchable-opacity :on-press="displaySettings">
      <Image class="junimeaLogo" :source="require('../assets/unicorn.png')"
             :style="{width: 25, height:25}" />
    </touchable-opacity>
    <touchable-opacity :on-press="searchPosts">
      <Image class="searchIcon" :source="require('../assets/search-icon.png')"
             :style="{width: 25, height:25}" />
    </touchable-opacity>
    <touchable-opacity :on-press="goToProfile">
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
export default {
  name: "Header",
  methods:{
    searchPosts(){
      alert("Function coming soon!")
    },
    displaySettings(){
      this.$emit("displaySettings");
    },
    goToTop(){
      this.$emit("goToTop");
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
.headerDark{
  height: 4%;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerLight{
  height: 4%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.headerTextDark{
  font-size: 20px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 2.5%;
  margin-left: 5%;
}
.headerTextLight{
  font-size: 20px;
  font-weight: 700;
  color: #070700;
  margin-top: 2.5%;
  margin-left: 5%;
}
.junimeaLogo{
  margin-right: 1%;
}
.searchIcon{
  margin-right: 8%;
}
.profilePicture{

}
</style>