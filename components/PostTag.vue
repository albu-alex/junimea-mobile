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
  background-color: #151515;
  border-width: 1px;
  border-color: #AAAAAA;
}
.darkText{
  color: #AAAAAA;
}
.lightTag{
  background-color: #EAEAEA;
  border-width: 1px;
  border-color: #555555;
}
.lightText{
  color: #555555;
}
</style>