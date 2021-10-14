<template>
<view class="commentsDark" v-if="isDarkTheme">
  <text>comment</text>
</view>
<view class="commentsLight" v-else>
  <text>comment</text>
</view>
</template>

<script>
export default {
  name: "Comments",
  props:{
    isDarkTheme: Boolean,
  }
}
</script>

<style>
.commentsDark{
  background-color: #151515;
}
.commentsLight{
  background-color: #EAEAEA;
}
</style>