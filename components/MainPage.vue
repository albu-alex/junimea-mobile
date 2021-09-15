<template>
  <view class="mainPage">
    <StatusBar/>
    <Settings :newUsername="newUsername" v-if="settingsDisplayed" class="settings" />
    <Header @displaySettings="settingsDisplayed = !settingsDisplayed" />
    <AddPostBox @addPost="addPost($event)" />
    <UserPost v-for="post in posts" :key="post.id" :userPostText="post.text"></UserPost>
  </view>
</template>

<script>
import StatusBar from "./StatusBar";
import Header from "./Header";
import Settings from "./Settings";
import AddPostBox from "./AddPostBox";
import UserPost from "./UserPost";
export default {
  name: "MainPage",
  data(){
    return{
      settingsDisplayed: false,
      posts: []
    }
  },
  components:{
    UserPost,
    StatusBar,
    Header,
    Settings,
    AddPostBox
  },
  props:{
    newUsername: String
  },
  methods:{
    async addPost(newPost){
      //TODO: axios request
      await this.posts.push(newPost)
    }
  }
}
</script>

<style>
.settings{
  height: 10%;
}
.mainPage{
  background-color: #252525;
  flex: 1;
}
</style>