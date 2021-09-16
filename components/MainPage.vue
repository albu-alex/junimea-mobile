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
    <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id"
    :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes" ></UserPost>
  </view>
</template>

<!--TODO: To be moved into separate folder-->
<script>
import StatusBar from "./StatusBar";
import Header from "./Header";
import Settings from "./Settings";
import AddPostBox from "./AddPostBox";
import UserPost from "./UserPost";
import axios from "axios";
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
      let post;
      await axios({
        method: 'post',
        url: 'http://52.57.118.176/Post/Add',
        data:{
          "Title": newPost.text,
          "Files": ["https://sanoboardbucket.s3.eu-central-1.amazonaws.com/1c2dfecf-2df9-43f5-8008-b9a559c41145semnatura1.jpg"]
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.status === 200){
          post = {
            "id": response.data.id,
            "title": response.data.title,
            "files": response.data.files,
            "username": response.data.userName,
            "profilePic": response.data.profilePicUrl,
            "likes": response.data.likes
          }
        }
      })
      .catch(function (response){
        alert(response);
      });
      this.posts.push(post)
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