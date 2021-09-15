<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view class="header">
      <touchable-opacity id="homepageButton" :on-press="displaySettings">
        <text class="headerText">juni.</text>
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
    }
  }
}
</script>

<style>
.header{
  height: 4%;
  background-color: black;
  align-items: flex-start;
}
.headerText{
  font-size: 20px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 2.5%;
  margin-left: 3%;
}
</style>