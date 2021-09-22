<!--This component makes up the majority of what the user sees-->
<!--After the Login component is done showing, the MainPage component is shown-->
<!--Consists of: StatusBar, Settings, Header, AddPostBox and UserPost components-->
<template>
  <view class="mainPage">
    <StatusBar/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed" class="settings" />
    <Header @goToProfile="goToProfile" @goToTop="goToTop"
            @displaySettings="settingsDisplayed = !settingsDisplayed" />
    <UserProfile v-if="profileDisplayed" :username="newUsername" :posts="posts" />
<!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed" @addPost="addPost($event)" />
    <scroll-view :onMomentumScrollEnd="refreshList" v-if="!profileDisplayed" ref="pagePosts">
      <UserPost v-if="!profileDisplayed" v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
      :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes" ></UserPost>
    </scroll-view>
  </view>
</template>

<!--TODO: To be moved into separate folder-->
<script>
import StatusBar from "./StatusBar";
import Header from "./Header";
import Settings from "./Settings";
import AddPostBox from "./AddPostBox";
import UserPost from "./UserPost";
import UserProfile from "./UserProfile";
import axios from "axios";
export default {
  name: "MainPage",
  data(){
    return{
      //Variable keeps track of the settings bar
      //Defaults to false
      settingsDisplayed: false,
      posts: [],
      //Variable keeps track of the profile page
      //Defaults to false
      profileDisplayed: false,
    }
  },
  async beforeMount(){
    //!!! CURRENTLY THIS IS JUST A MOCK UP! FINAL VERSION WILL MAKE A LOT MORE SENSE
    await this.getInitialPosts();
  },
  components:{
    UserProfile,
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
    async getInitialPosts(){
      //!!! CURRENTLY THIS IS JUST A MOCK UP! FINAL VERSION WILL MAKE A LOT MORE SENSE
      await axios.get(`https://randomuser.me/api/?results=3`).then((response) => {
        let users = response.data.results;
        for(let i=0;i<users.length;i++){
          let image = {
            uri: users[i].picture.large,
            height: 300,
            width: 300
          }
          let images = [];
          images.push(image)
          let post = {
            text: "This post was taken from randomuser.me",
            images: images
          }
          this.addPost(post);
        }
      });
    },
    Logout(){
      this.$emit("Logout")
    },
    goToTop(){
      this.$refs.pagePosts.current?.scrollTo({
        y: 0.0,
        animated: true
      });
    },
    goToProfile(){
      if(this.newUsername === ''){
        alert("It looks like you are a guest! You must register to access this page!")
        return;
      }
      this.profileDisplayed = !this.profileDisplayed
    },
    refreshList() {
      // TODO: Pull data from API
      this.refreshing = true;
      this.getInitialPosts();
      this.refreshing = false;
    },
    async addPost(newPost){
      if(this.newUsername === ''){
        alert("It looks like you are a guest! You must register before creating a post!")
        return;
      }
      let post;
      let newImages = [];
      newPost.images.forEach(image => newImages.push(image.uri))
      let dimensions = [];
      newPost.images.forEach(image => dimensions.push(image))
      await axios({
        method: 'post',
        url: 'http://52.57.118.176/Post/Add',
        data:{
          "Title": newPost.text,
          "Files": newImages
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
            "likes": response.data.likes,
            "dimensions": dimensions
          }
        }
      })
      .catch(function (response){
        alert(response);
      });
      if(post)
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