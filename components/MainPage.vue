<!--This component makes up the majority of what the user sees-->
<!--After the Login component is done showing, the MainPage component is shown-->
<!--Consists of: StatusBar, Settings, Header, AddPostBox, UserProfile and UserPost components-->
<template>
  <view class="mainPage">
    <StatusBar/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed" class="settings" />
    <Header @goToProfile="goToProfile" @goToTop="goToTop"
            @displaySettings="settingsDisplayed = !settingsDisplayed" />
    <UserProfile v-if="profileDisplayed" :username="newUsername" :posts="posts" @goToMainPage="profileDisplayed = false" />
<!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed&&!waitingForPost" @addPost="addPost($event)" />
    <view v-if="waitingForPost" :style="{justifyContent: 'flex-start'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <scroll-view :scrollEventThrottle="0" :onScroll="refreshList" v-if="!profileDisplayed" ref="pagePosts">
      <UserPost v-if="!profileDisplayed" v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
      :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes" ></UserPost>
      <view v-if="isLoading" :style="{justifyContent: 'flex-end'}">
        <activity-indicator size="large" color="dimgrey" />
      </view>
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
      // This variable is responsible for checking whether the creation of the post is occurring or not
      // Defaults to false
      waitingForPost: false,
      //This variable is responsible for displaying the loading component
      isLoading: false,
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
    this.isLoading = true;
    await this.getInitialPosts();
    this.isLoading = false;
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
    async getInitialPosts(postPositon){
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
          this.addPost(post, postPositon);
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
      this.profileDisplayed = true
    },
    refreshList(event) {
      // TODO: Pull data from API
      // this.isLoading = true;
      // this.getInitialPosts();
      let paddingToBottom = 1000;
      if(event.nativeEvent.contentOffset.y < 0){
        this.isLoading = true;
        this.getInitialPosts("top");
        return;
      }
      if(event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height - paddingToBottom)){
        this.isLoading = true;
        this.getInitialPosts("bottom")
      }
    },
    async addPost(newPost, postPosition){
      if(this.newUsername === ''){
        alert("It looks like you are a guest! You must register before creating a post!")
        return;
      }
      this.waitingForPost = true;
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
            "liked": response.data.liked,
            "dimensions": dimensions
          }
        }
      })
      .catch(function (response){
        alert(response);
      });
      if(post)
        if(postPosition === 'top')
          this.posts = [post].concat(this.posts)
        else
          this.posts.push(post)
      this.waitingForPost = false;
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