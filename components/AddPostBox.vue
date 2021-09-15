<template>
<view class="postBox">
  <text-input v-model="postText" class="addNewPost" placeholder="What are you thinking about?"/>
  <touchable-opacity :on-press="addPost" class="postButton">
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
      if(!this.postText){
        alert("Post must contain text!");
        return 1;
      }
      let post={
        id: this.posts.length,
        text: this.postText
      }
      this.posts.push(post);
      this.$emit('addPost', post);
      this.postText = "";
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
  margin-top: 4%;
  margin-left: 6%;
}
.postButtonText{
  color: #AAAAAA;
  font-weight: 400;
  font-size: 14px;
}
.addNewPost{
  background-color: ghostwhite;
  color: dimgrey;
  width: 60%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
</style>