<!--This component makes up the majority of what the user sees-->
<!--After the Login component is done showing, the MainPage component is shown-->
<!--Consists of: OwnStatusBar, Settings, Header, AddPostBox, UserProfile and UserPost components-->
<template>
  <animated:view v-if="isDarkTheme&&!noConnection" class="mainPageDark" :style="{opacity: viewOpacity}">
    <OwnStatusBar :isDarkTheme="isDarkTheme"/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed&&!visiblePrompts"
              @visiblePrompts="visiblePrompts = !visiblePrompts" :visiblePrompts="false"
              @changeViewMode="changeViewMode" class="settings" :isDarkTheme="isDarkTheme" />
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed&&visiblePrompts"
              @visiblePrompts="visiblePrompts = !visiblePrompts" :visiblePrompts="true"
              @changeViewMode="changeViewMode" class="settingsExtended" :isDarkTheme="isDarkTheme" />
    <Header @goToProfile="goToProfile" @showTags="showTags" :isDarkTheme="isDarkTheme"
            @searchDisplayed="searchDisplayed = true" :profilePic="profilePicture"
            @displaySettings="settingsDisplayed = !settingsDisplayed" :style="{zIndex: 2}" />
    <Search v-if="searchDisplayed" :isDarkTheme="isDarkTheme" @cancelSearch="searchDisplayed = false" />
    <UserProfile v-if="profileDisplayed&&!searchDisplayed" :username="newUsername" :userID="userID"
                 :posts="posts" @goToMainPage="goToMainPage"
                 @refreshUserPosts="getInitialPosts('top')"
                 :profilePicture="profilePicture" :isMainUser="true" :isDarkTheme="isDarkTheme" />
    <!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed&&!waitingForPost&&!postProfileDisplayed&&!searchDisplayed"
                :isDarkTheme="isDarkTheme" @addPost="addPost($event, 'top')"
                :username="newUsername" @redirectToLogin="redirectToLogin" />
    <animated:view class="tags" v-if="leftSideTags&&!settingsDisplayed&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tags" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="tags" v-if="leftSideTags&&settingsDisplayed&&visiblePrompts&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tagsLower" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="tags" v-if="leftSideTags&&settingsDisplayed&&!visiblePrompts&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tagsMiddle" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="posts" :style="{opacity: postsOpacity}">
      <UserProfile :isMainUser="false"
                   v-if="postProfileDisplayed&&!searchDisplayed" :username="postUsername"
                   :posts="posts" @goToMainPage="goToMainPage"
                   @refreshUserPosts="getInitialPosts('top')"
                   :profilePicture="postProfilePicture" :isDarkTheme="isDarkTheme"></UserProfile>
      <flat-list v-if="!profileDisplayed&&!searchDisplayed" :data="posts" :render-item="(post) => renderPosts(post)" :onRefresh="refreshList"
                 :refreshing="false" :onEndReached="refreshListBottom" :onEndReachedTreshold="0" />
    </animated:view>
  </animated:view>
  <animated:view class="noConnection" v-else-if="isDarkTheme&&noConnection">
    <NoConnection :isDarkTheme="isDarkTheme" />
  </animated:view>
  <animated:view v-else-if="!isDarkTheme&&!noConnection" class="mainPageLight" :style="{opacity: viewOpacity}">
    <OwnStatusBar :isDarkTheme="isDarkTheme"/>
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed&&!visiblePrompts"
              @visiblePrompts="visiblePrompts = !visiblePrompts" :visiblePrompts="false"
              @changeViewMode="changeViewMode" class="settings" :isDarkTheme="isDarkTheme" />
    <Settings @Logout="Logout" :newUsername="newUsername" v-if="settingsDisplayed&&visiblePrompts"
              @visiblePrompts="visiblePrompts = !visiblePrompts" :visiblePrompts="true"
              @changeViewMode="changeViewMode" class="settingsExtended" :isDarkTheme="isDarkTheme" />
    <Header @goToProfile="goToProfile" @showTags="showTags" :isDarkTheme="isDarkTheme"
            @searchDisplayed="searchDisplayed = true" :profilePic="profilePicture"
            @displaySettings="settingsDisplayed = !settingsDisplayed" :style="{zIndex: 2}"/>
    <Search v-if="searchDisplayed" :isDarkTheme="isDarkTheme" @cancelSearch="searchDisplayed = false" />
    <UserProfile v-if="profileDisplayed&&!searchDisplayed" :username="newUsername" :userID="userID"
                 :posts="posts" @goToMainPage="goToMainPage"
                  @refreshUserPosts="getInitialPosts('top')"
                 :profilePicture="profilePicture" :isMainUser="true" :isDarkTheme="isDarkTheme" />
<!--    Allows the user to make a new post and the post it after it passes validations-->
    <AddPostBox v-if="!profileDisplayed&&!waitingForPost&&!postProfileDisplayed&&!searchDisplayed"
                @addPost="addPost($event, 'top')" :username="newUsername"
                :isDarkTheme="isDarkTheme" @redirectToLogin="redirectToLogin"/>
    <animated:view class="tags" v-if="leftSideTags&&!settingsDisplayed&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tags" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="tags" v-if="leftSideTags&&settingsDisplayed&&visiblePrompts&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tagsLower" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="tags" v-if="leftSideTags&&settingsDisplayed&&!visiblePrompts&&!searchDisplayed" :style="{opacity: tagsOpacity}">
      <Tags class="tagsMiddle" :isDarkTheme="isDarkTheme"/>
    </animated:view>
    <animated:view class="posts" :style="{opacity: postsOpacity}">
      <UserProfile :isMainUser="false"
                    v-if="postProfileDisplayed&&!searchDisplayed" :username="postUsername"
                   :posts="posts" @goToMainPage="goToMainPage"
                   @refreshUserPosts="getInitialPosts('top')"
                   :profilePicture="postProfilePicture" :isDarkTheme="isDarkTheme"></UserProfile>
      <flat-list v-if="!profileDisplayed&&!searchDisplayed" :data="posts" :render-item="(post) => renderPosts(post)" :onRefresh="refreshList"
                 :refreshing="false" :onEndReached="refreshListBottom" :onEndReachedTreshold="0" />
    </animated:view>
  </animated:view>
  <animated:view v-else-if="!isDarkTheme&&noConnection">
    <NoConnection :isDarkTheme="isDarkTheme" />
  </animated:view>
</template>

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
import NoConnection from "./NoConnection";
import {Platform, StatusBar, Animated, Easing, Alert} from "react-native";
import React from "react";
export default {
  name: "MainPage",
  data(){
    return {
      // This variable is responsible for checking whether the creation of the post is occurring or not
      // Defaults to true
      waitingForPost: true,
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
      //This opacities are changed in animated values
      viewOpacity: 0,
      tagsOpacity: 0,
      postsOpacity: 1,
      //This variable determines if the refresh should be allowed to be made or not
      refreshAllowed: true,
      startTime: 0,
      //This variable holds the unique ID of the user logged in
      userID: "",
      visiblePrompts: false,
      noConnection: false,
    }
  },
  async created(){
    this.viewOpacity = new Animated.Value(0)
    this.tagsOpacity = new Animated.Value(0)
    this.postsOpacity = new Animated.Value(1)
    if(this.newUsername === "guest"){
      this.newUsername = ""
      return;
    }
    let profilePicture;
    let username;
    let userID;
    await axios({
      method: 'get',
      url: `http://52.57.118.176/User/Self`,
      timeout: 4000
    })
    .then(function (response){
      if(response.status === 200){
        profilePicture = response.data.profilePicUrl
        username = response.data.email
        userID = response.data.id
      }
    })
    .catch(function(){
      profilePicture = "";
      username = "";
      userID = "";
    });
    if(profilePicture !== "") {
      this.newUsername = username;
      this.profilePicture = profilePicture;
      this.userID = userID;
    }
  },
  beforeUpdate(){
    if (!this.isDarkTheme){
      StatusBar.setBarStyle('dark-content', true);
      return;
    }
      StatusBar.setBarStyle('light-content', true);
  },
  async beforeMount(){
    if(this.customTheme !== undefined){
      this.isDarkTheme = this.customTheme;
    }
    this.waitingForPost = true;
    await this.getInitialPosts('top');
    this.waitingForPost = false;
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
    Tags,
    NoConnection
  },
  props:{
    newUsername: String,
    customTheme: Boolean,
  },
  methods:{
    renderPosts(post){
      post = post.item
      return(
          <UserPost key={post.id} userPostText={post.title} id={post.id} dimensions={post.dimensions}
                    files={post.files} username={post.username} likes={post.likes} redirectToLogin={this.redirectToLogin}
                    profilePic={post.profilePicUrl} isDarkTheme={this.isDarkTheme} goToUser={this.goToUser} />
      );
    },
    goToMainPage(event){
      this.profileDisplayed = false;
      this.postProfileDisplayed = false;
      if(event !== "")
        this.profilePicture = event
    },
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
      if(!this.leftSideTags) {
        this.postsOpacity.setValue(0.5);
        Animated.timing(this.postsOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false
        }).start(() => {

        });
      }
      else{
        this.postsOpacity.setValue(0);
        Animated.timing(this.postsOpacity, {
          toValue: 0.5,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false
        }).start(() => {

        });
      }
    },
    async getInitialPosts(postPosition){
      let posts;
      let noConnection = false;
      await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/List/${this.postNumber}`,
        timeout: 10000
      })
      .then(function (response){
        posts = response.data
        for(let i=0;i<posts.length;i++){
          const numberOfPhotos = posts[i].files.length;
          posts[i]["dimensions"] = [{uri: '', width: 300, height: 300}]
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
      })
      .catch(function(){
        noConnection = true;
      });
      if(noConnection){
        this.noConnection = true;
        return;
      }
      if(posts) {
        this.animateView();
        if(this.postNumber === 10)
          this.posts = posts;
        else {
          if (postPosition === 'bottom' || !postPosition)
            posts.forEach(post => this.posts.push(post))
          else {
            this.posts.forEach(post => posts.push(post));
            this.posts = posts;
          }
        }
        this.postNumber += 10;
      }
      // this.waitingForPost = false;
    },
    Logout(){
      this.$emit("Logout", this.isDarkTheme)
    },
    animateTags(){
      this.postsOpacity.setValue(0);
      Animated.timing(this.postsOpacity, {
        toValue: 0.5,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => {

      });
      this.tagsOpacity.setValue(0);
      Animated.timing(this.tagsOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => {

      });
    },
    showTags(){
      this.leftSideTags = !this.leftSideTags;
      if(this.leftSideTags)
        this.animateTags();
      else
        this.animateView();
    },
    goToProfile(){
      if(this.newUsername === ''){
        Alert.alert("Error", "It looks like you are a guest",
            [
              {
                text: "Login first",
                style: "cancel",
                onPress: this.Logout
              },
              {
                text: "Continue as guest",
                style: "destructive",
                onPress: () => alert(":(")
              }
            ],
            {
              cancelable: true,
              onDismiss: () => alert(":(")
            }
        );
        return;
      }
      this.profileDisplayed = true
    },
    refreshList(){
      this.getInitialPosts("top");
    },
    refreshListBottom(){
      this.getInitialPosts("bottom");
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
.noConnection{
  align-self: center;
}
.posts{
  flex-direction: row;
}
.settings{
  height: 7%;
}
.settingsExtended{
  height: 15%;
}
.tags{
  margin-top: 12.5%;
  height: 95%;
  width: 80%;
  position: absolute;
  z-index: 1;
}
.tagsMiddle{
  margin-top: 31%;
  height: 95%;
  width: 80%;
  position: absolute;
  z-index: 1;
}
.tagsLower{
  margin-top: 52%;
  height: 85%;
  width: 80%;
  position: absolute;
  z-index: 1;
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