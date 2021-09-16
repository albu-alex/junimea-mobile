<template>
  <view class="post">
    <text class="postText">{{userPostText}}</text>
    <text class="postText">{{id}}</text>
    <text class="postText">{{files}}</text>
    <text class="postText">{{username}}</text>
    <text class="postText">{{profilePic}}</text>
    <text class="postText">{{likes}}</text>
  </view>
</template>

<script>
export default {
  name: "UserPost",
  props:{
    userPostText: String,
    id: Number,
    files: Array,
    username: String,
    profilePic: String,
    likes: Number
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