<template>
<view class="postBox">
  <text-input class="addNewPost" placeholder="What are you thinking about?"/>
  <touchable-opacity v-model="postText" :on-press="addPost" class="postButton">
    <text class="postButtonText">Create new post</text>
  </touchable-opacity>
</view>
</template>

<script>
export default {
  data(){
    return{
      postText: "",
      posts: []
    }
  },
  name: "AddPostBox",
  methods:{
    addPost(){
      let post={
        id: this.posts.length,
        text: this.postText
      }
      this.posts.push(post);
      alert(post)
      this.$emit('addPost', post);
    }
  }
}
</script>

<style>
.postBox{
  margin-top: 3%;
  flex-direction: row;
  justify-content: center;
}
.postButton{
  margin-top: 5%;
  margin-left: 10%;
}
.postButtonText{
  color: #AAAAAA;
  font-weight: 400;
  font-size: 12px;
}
.addNewPost{
  background-color: ghostwhite;
  color: dimgrey;
  width: 50%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
</style>