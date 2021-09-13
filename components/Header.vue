<!--Component contains all the categories that an user can access-->
<!--Each category is under a button(touchable-opacity)-->
<template>
  <view class="header">
      <touchable-opacity id="homepageButton" :on-press="displayAlert">
        <text class="headerText">juni.</text>
      </touchable-opacity>
  </view>
</template>

<!--Did not separate the script in another file for obvious reasons-->
<script>
export default {
  name: "Header",
  methods:{
    displayAlert(){
      alert("Hello!");
    }
  }
}
</script>

<style>
.header{
  height: 5%;
  background-color: black;
  align-items: flex-start;
}
.headerText{
  font-size: 20px;
  font-weight: 700;
  color: ghostwhite;
  margin-top: 3%;
  margin-left: 3%;
}
</style>