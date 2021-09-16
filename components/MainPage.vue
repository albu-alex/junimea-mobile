<!--This component makes up the majority of what the user sees-->
<!--After the Login component is done showing, the MainPage component is shown-->
<!--Consists of: StatusBar, Settings, Header, AddPostBox and UserPost components-->
<template>
  <view class="mainPage">
    <StatusBar/>
    <Settings :newUsername="newUsername" v-if="settingsDisplayed" class="settings" />
    <Header @displaySettings="settingsDisplayed = !settingsDisplayed" />
<!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox @addPost="addPost($event)" />
    <UserPost v-for="post in posts" :key="post.id" :userPostText="post.text"></UserPost>
  </view>
</template>

<!--TODO: To be moved into separate folder-->
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
      //Variable keeps track of the settings bar
      //Defaults to false
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