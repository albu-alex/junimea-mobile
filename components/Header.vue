<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view class="header">
      <touchable-opacity id="homepageButton" :on-press="displaySettings">
        <text class="headerText">juni.</text>
      </touchable-opacity>
      <touchable-opacity id="junimeaLogoButton" :on-press="goToTop">
        <Image class="junimeaLogo" :source="require('../assets/unicorn.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
<!--    Have to figure out how to get user profile picture from API-->
    <touchable-opacity id="junimeaLogoButton" :on-press="goToProfile">
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
    profilePic: String
  }
}
</script>

<style>
.header{
  height: 4%;
  background-color: black;
  display: flex;
  flex-direction: row;
}
.headerText{
  font-size: 20px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 2.5%;
  margin-left: 5%;
}
.junimeaLogo{
  margin-left: 52%;
}
.profilePicture{
  margin-left: 40%;
}
</style>