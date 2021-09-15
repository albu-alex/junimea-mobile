<template>
<view class="postBox">
  <text-area class="addNewPost" placeholder="What are you thinking about?"/>
  <touchable-opacity :on-click="addPost">
    <text class="postButtonText">Create new post</text>
  </touchable-opacity>
</view>
</template>

<script>
export default {
  name: "AddPostBox",
  methods:{
    addPost(){
      //TODO: implement an axios request after server touch up
      alert("New feature coming soon!");
    }
  }
}
</script>

<style>
.postBox{
  flex-direction: row;
  justify-content: center;
}
.postButtonText{
  color: #AAAAAA;
  font-weight: 400;
  font-size: 12px;
}
.addNewPost{
  background-color: #252525;
  color: #AAAAAA;
  width: 75%;
  height: 20%;
  font-weight: 400;
  font-size: 14px;
}
</style>