<template>
  <view class="post">
    <text class="postText">{{userPostText}}</text>
  </view>
</template>

<script>
export default {
  name: "UserPost",
  props:{
    userPostText: String
  }
}
</script>

<style>
.post{
  margin-bottom: 5%;
}
.postText{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 3%;
}
</style>