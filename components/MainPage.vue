<!--This component makes up the majority of what the user sees-->
<!--After the Login component is done showing, the MainPage component is shown-->
<!--Consists of: OwnStatusBar, Settings, Header, AddPostBox, UserProfile and UserPost components-->
<template>
  <animated:view v-if="isDarkTheme" class="mainPageDark" :style="{opacity: viewOpacity}">
    <OwnStatusBar :isDarkTheme="isDarkTheme"/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed"
              @changeViewMode="changeViewMode" class="settings" :isDarkTheme="isDarkTheme" />
    <Header @goToProfile="goToProfile" @showTags="showTags" :isDarkTheme="isDarkTheme"
            @searchDisplayed="searchDisplayed = true" :profilePic="profilePicture"
            @displaySettings="settingsDisplayed = !settingsDisplayed" />
    <Search v-if="searchDisplayed" :isDarkTheme="isDarkTheme" @cancelSearch="searchDisplayed = false" />
    <UserProfile v-if="profileDisplayed&&!searchDisplayed" :username="newUsername"
                 :posts="posts" @goToMainPage="profileDisplayed = false"
                 @refreshUserPosts="getInitialPosts('top')"
                 :profilePicture="profilePicture" :isMainUser="true" :isDarkTheme="isDarkTheme" />
    <!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed&&!waitingForPost&&!postProfileDisplayed&&!searchDisplayed"
                :isDarkTheme="isDarkTheme" @addPost="addPost($event, 'top')"
                :username="newUsername" @redirectToLogin="redirectToLogin" />
    <view v-if="waitingForPost&&!searchDisplayed" :style="{justifyContent: 'flex-start'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <view class="posts">
      <Tags :isDarkTheme="isDarkTheme" v-if="leftSideTags" class="tags" />
      <scroll-view :scrollEnabled="!leftSideTags" v-if="postProfileDisplayed&&!searchDisplayed">
        <UserProfile :isMainUser="false"
                     v-if="postProfileDisplayed&&!searchDisplayed" :username="postUsername"
                     :posts="posts" @goToMainPage="postProfileDisplayed = false"
                     @refreshUserPosts="getInitialPosts('top')"
                     :profilePicture="postProfilePicture" :isDarkTheme="isDarkTheme"></UserProfile>
      </scroll-view>
      <!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
      <scroll-view :scrollEnabled="!leftSideTags" :scrollEventThrottle="0" :onScroll="refreshList"
                   v-if="!profileDisplayed&&!postProfileDisplayed&&!searchDisplayed" ref="pagePosts">
        <UserPost v-if="!profileDisplayed&&!searchDisplayed" v-for="post in posts" :key="post.id"
                  :userPostText="post.title" :id="post.id" @redirectToLogin="redirectToLogin"
                  :dimensions="(post.dimensions) ? post.dimensions : []"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic"
                  :likes="post.likes" @goToUser="goToUser" :isDarkTheme="isDarkTheme" ></UserPost>
        <view v-if="isLoading&&!searchDisplayed" :style="{justifyContent: 'flex-end'}">
          <activity-indicator size="large" color="dimgrey" />
        </view>
      </scroll-view>
    </view>
  </animated:view>
  <animated:view v-else class="mainPageLight" :style="{opacity: viewOpacity}">
    <OwnStatusBar :isDarkTheme="isDarkTheme"/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed"
              @changeViewMode="changeViewMode" class="settings" :isDarkTheme="isDarkTheme" />
    <Header @goToProfile="goToProfile" @showTags="showTags" :isDarkTheme="isDarkTheme"
            @searchDisplayed="searchDisplayed = true" :profilePic="profilePicture"
            @displaySettings="settingsDisplayed = !settingsDisplayed"/>
    <Search v-if="searchDisplayed" :isDarkTheme="isDarkTheme" @cancelSearch="searchDisplayed = false" />
    <UserProfile v-if="profileDisplayed&&!searchDisplayed" :username="newUsername"
                 :posts="posts" @goToMainPage="profileDisplayed = false"
                  @refreshUserPosts="getInitialPosts('top')"
                 :profilePicture="profilePicture" :isMainUser="true" :isDarkTheme="isDarkTheme" />
<!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed&&!waitingForPost&&!postProfileDisplayed&&!searchDisplayed"
                @addPost="addPost($event, 'top')" :username="newUsername"
                :isDarkTheme="isDarkTheme" @redirectToLogin="redirectToLogin"/>
    <view v-if="waitingForPost&&!searchDisplayed" :style="{justifyContent: 'flex-start'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
    <view class="posts">
      <Tags :isDarkTheme="isDarkTheme" v-if="leftSideTags" class="tags" />
      <scroll-view :scrollEnabled="!leftSideTags" v-if="postProfileDisplayed&&!searchDisplayed">
        <UserProfile :isMainUser="false"
                      v-if="postProfileDisplayed&&!searchDisplayed" :username="postUsername"
                     :posts="posts" @goToMainPage="postProfileDisplayed = false"
                     @refreshUserPosts="getInitialPosts('top')"
                     :profilePicture="postProfilePicture" :isDarkTheme="isDarkTheme"></UserProfile>
      </scroll-view>
  <!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
      <scroll-view :scrollEnabled="!leftSideTags" :scrollEventThrottle="0" :onScroll="refreshList"
                   v-if="!profileDisplayed&&!postProfileDisplayed&&!searchDisplayed" ref="pagePosts">
        <UserPost v-if="!profileDisplayed&&!searchDisplayed" v-for="post in posts" :key="post.id"
                  :userPostText="post.title" :id="post.id" @redirectToLogin="redirectToLogin"
                  :dimensions="(post.dimensions) ? post.dimensions : []"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic"
                  :likes="post.likes" @goToUser="goToUser" :isDarkTheme="isDarkTheme" ></UserPost>
        <view v-if="isLoading&&!searchDisplayed" :style="{justifyContent: 'flex-end'}">
          <activity-indicator size="large" color="#969696" />
        </view>
      </scroll-view>
    </view>
  </animated:view>
</template>

<!--TODO: To be moved into separate folder-->
<script>
import OwnStatusBar from "./StatusBar";
import Header from "./Header";
import Settings from "./Settings";
import AddPostBox from "./AddPostBox";
import UserPost from "./UserPost";
import UserProfile from "./UserProfile";
import axios from "axios";
import Search from "./Search";
import Tags from "./Tags";
import {Platform, StatusBar, Animated, Easing} from "react-native";
export default {
  name: "MainPage",
  data(){
    return {
      // This variable is responsible for checking whether the creation of the post is occurring or not
      // Defaults to false
      waitingForPost: false,
      //This variable is responsible for displaying the loading component
      isLoading: false,
      //Variable keeps track of the settings bar
      //Defaults to false
      settingsDisplayed: false,
      posts: [],
      //This variable keeps track of the number of posts displayed
      postNumber: 10,
      //Variable keeps track of the profile page
      //Defaults to false
      profileDisplayed: false,
      //This variable keeps track if the user has clicked on another user's profile
      postProfileDisplayed: false,
      postUsername: "",
      postProfilePicture: "",
      //This variable holds the URL for the user profile picture
      profilePicture: "",
      isDarkTheme: true,
      searchDisplayed: false,
      leftSideTags: false,
      updateProfile: false,
      viewOpacity: 0,
      //This variable determines if the refresh should be allowed to be made or not
      refreshAllowed: true,
      startTime: 0
    }
  },
  async created(){
    this.viewOpacity = new Animated.Value(0)
    if(this.newUsername === "")
      return;
    let postNumber = 10;
    let found = false;
    let profilePicture;
    let username = this.newUsername
    while(!found){
      await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/List/${postNumber}`,
        timeout: 4000
      })
      .then(function (response){
        let posts = response.data
        for(let i=0;i<posts.length;i++){
          if(posts[i].userName === username){
            profilePicture = posts[i].profilePicUrl;
            found = true;
          }
        }
      });
      postNumber += 10;
    }
    this.profilePicture = profilePicture;
  },
  beforeUpdate(){
    if (!this.isDarkTheme && Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true);
    }
    else if(this.isDarkTheme && Platform.OS === 'ios'){
      StatusBar.setBarStyle('light-content', true);
    }
  },
  async beforeMount(){
    if(this.customTheme !== undefined){
      this.isDarkTheme = this.customTheme;
    }
    this.isLoading = true;
    await this.getInitialPosts('top');
    this.isLoading = false;
  },
  async mounted(){
    this.animateView();
  },
  components:{
    Search,
    UserProfile,
    UserPost,
    OwnStatusBar,
    Header,
    Settings,
    AddPostBox,
    Tags
  },
  props:{
    newUsername: String,
    customTheme: Boolean
  },
  methods:{
    redirectToLogin(){
      this.$emit("redirectToLogin", this.isDarkTheme);
    },
    changeViewMode(){
      this.isDarkTheme = !this.isDarkTheme;
      this.animateView();
    },
    animateView(){
      this.viewOpacity.setValue(0);

      Animated.timing(this.viewOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => {

      });
    },
    async getInitialPosts(postPosition){
      let posts;
      await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/List/${this.postNumber}`,
        timeout: 4000
      })
      .then(function (response){
        posts = response.data
        for(let i=0;i<posts.length;i++){
          const numberOfPhotos = posts[i].files.length;
          posts[i]["dimensions"] = []
          for(let j=0;j<numberOfPhotos;j++) {
            posts[i]["dimensions"].push(
                {
                  uri: "",
                  width: 300,
                  height: 300
                }
            )
            //This is just to skip the refactor that is due to come
            posts[i]["username"] = posts[i].userName
            posts[i]["profilePic"] = posts[i].profilePicUrl
          }
        }
      });
      if(posts) {
        if(this.postNumber === 10)
          this.posts = posts;
        else {
          if (postPosition === 'bottom' || !postPosition)
            posts.forEach(post => this.posts.push(post))
          else
            this.posts = posts.concat(this.posts)
        }
        this.postNumber += 11;
      }
    },
    Logout(){
      this.$emit("Logout", this.isDarkTheme)
    },
    showTags(){
      this.leftSideTags = !this.leftSideTags;
    },
    goToProfile(){
      if(this.newUsername === ''){
        alert("It looks like you are a guest! You must register to access this page!")
        return;
      }
      this.profileDisplayed = true
    },
    refreshList(event){
      if(!this.refreshAllowed){
        if(performance.now() - this.startTime <= 5000)
          return;
        this.refreshAllowed = true;
      }
      else{
        this.startTime = performance.now();
        this.refreshAllowed = false;
      }
      let paddingToBottom = 1000;
      if(event.nativeEvent.contentOffset.y < 0){
        this.isLoading = true;
        this.getInitialPosts("top");
        return;
      }
      if(event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height - paddingToBottom)){
        this.isLoading = true;
        this.getInitialPosts("bottom");
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
      });
      if(post){
        this.profilePicture = post.profilePic
        if(postPosition === 'top')
          this.posts = [post].concat(this.posts)
        else
          this.posts.push(post)
      }
      this.waitingForPost = false;
    },
    goToUser(event){
      this.postUsername = event.username
      this.postProfilePicture = event.profilePicture
      this.postProfileDisplayed = true;
    }
  }
}
</script>

<style>
.posts{
  flex-direction: row;
}
.settings{
  height: 10%;
}
.tags{
  height: 100%;
  width: 27%;
}
.mainPageDark{
  background-color: #252525;
  flex: 1;
}
.mainPageLight{
  background-color: #DADADA;
  flex: 1;
}
</style>