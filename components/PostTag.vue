<template>
<view class="darkTag" v-if="isDarkTheme">
  <text class="darkText">{{tag}}</text>
</view>
<view class="lightTag" v-else>
  <text class="lightText">{{tag}}</text>
</view>
</template>

<script>
export default {
  name: "PostTag",
  props:{
    isDarkTheme: Boolean,
    tag: String
  }
}
</script>

<style>
.darkTag{
  background-color: #AAAAAA;
  border-width: 1px;
  border-color: #151515;
  border-radius: 7px;
  width: 100px;
  margin-bottom: 10px;
}
.darkText{
  color: #151515;
  font-size: 12px;
  font-weight: 400;
  align-self: center;
}
.lightTag{
  background-color: #555555;
  border-width: 1px;
  border-color: #EAEAEA;
  border-radius: 7px;
  width: 100px;
  margin-bottom: 10px;
}
.lightText{
  color: #EAEAEA;
  font-size: 12px;
  font-weight: 400;
  align-self: center;
}
</style>