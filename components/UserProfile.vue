<template>
  <animated:view class="profile" v-if="username !== ''&&!this.noConnection" :style="{opacity: viewOpacity}">
    <view class="profileHeader">
      <touchable-opacity :on-press="goToMainPage">
        <Ionicons v-if="isDarkTheme" name="ios-arrow-back" :size=30 color="#505050" />
        <Ionicons v-else name="ios-arrow-back" :size=30 color="#AFAFAF" />
      </touchable-opacity>
      <touchable-opacity v-if="!isMainUser" :on-press="reportUser">
        <Image :source="require('../assets/three-dots.png')"
               :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 3}" />
      </touchable-opacity>
    </view>
    <Image v-if="!profilePicture" :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">{{username}}</text>
    <view :style="{flexDirection: 'row'}">
      <touchable-opacity :style="{borderRadius: 10}"
          :on-press="uploadProfilePicture" :class="{ profilePictureButtonDark: (isDarkTheme), profilePictureButtonLight: (!isDarkTheme)}">
        <text :class="{ profilePictureButtonTextDark: (isDarkTheme), profilePictureButtonTextLight: (!isDarkTheme)}">Change picture</text>
      </touchable-opacity>
      <touchable-opacity :style="{borderRadius: 10}"
                         :on-press="viewSavedPosts" :class="{ profilePictureButtonDark: (isDarkTheme), profilePictureButtonLight: (!isDarkTheme)}">
        <text :class="{ profilePictureButtonTextDark: (isDarkTheme), profilePictureButtonTextLight: (!isDarkTheme)}">View saved posts</text>
      </touchable-opacity>
    </view>
    <flat-list v-if="!isLoading&&!areSavedPosts&&isDarkTheme" :data="posts" :render-item="(post) => renderPosts(post)"
               :keyExtractor="post => post.id.toString()" :refreshControl="renderRefreshDark()">
    </flat-list>
    <flat-list v-if="!isLoading&&!areSavedPosts&&!isDarkTheme" :data="posts" :render-item="(post) => renderPosts(post)"
               :keyExtractor="post => post.id.toString()" :refreshControl="renderRefreshLight()">
    </flat-list>
      <scroll-view v-else-if="!isLoading&&areSavedPosts&&savedPosts.length > 0">
        <UserPost v-for="post in savedPosts" :userPostText="post.title" :id="post.id"
                  :dimensions="(post.dimensions) ? post.dimensions : []" :files="post.files" :username="post.userName"
                  :profilePic="post.profilePicUrl" :likes="post.likes" :isDarkTheme="isDarkTheme"></UserPost>
      </scroll-view>
    <scroll-view v-else-if="!isLoading&&areSavedPosts&&savedPosts.length === 0">
      <MaterialIcons v-if="isDarkTheme" class="noMorePostsIcon" name="post-add" :size=100 color="#505050" />
      <MaterialIcons v-else class="noMorePostsIcon" name="post-add" :size=100 color="#AFAFAF" />
      <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">There aren't any saved posts!</text>
    </scroll-view>
    <view v-if="isLoading" :style="{justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
  </animated:view>
  <view v-else-if="this.noConnection">
    <NoConnection :isDarkTheme="isDarkTheme" />
  </view>
</template>

<script>
import React from 'react';
import UserPost from "./UserPost";
import NoConnection from "./NoConnection";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data'
import {Alert, Animated, AsyncStorage, Easing, RefreshControl} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export default {
  data(){
    return{
      isLoading: false,
      profilePictureURL: "",
      viewOpacity: 0,
      areSavedPosts: false,
      savedPosts: [],
      posts: [],
      noConnection: false,
      postNumber: 200
    }
  },
  async created(){
    this.viewOpacity = new Animated.Value(0);
    while(this.posts.length === 0)
      await this.getInitialPosts('top');
  },
  mounted(){
    this.animateView();
  },
  async beforeMount(){
    await this.getUserPosts();
    await this.getSavedPosts();
  },
  name: "UserProfile",
  props:{
    username: String,
    profilePicture: String,
    userID: String,
    isMainUser: Boolean,
    isDarkTheme: Boolean
  },
  components:{
    UserPost,
    NoConnection,
    Ionicons,
    MaterialIcons,
    RefreshControl
  },
  methods: {
    renderRefreshDark(){
      return(
          <RefreshControl tintColor="ghostwhite" refreshing={false} onRefresh={this.refreshList}/>
      )
    },
    renderRefreshLight(){
      return(
          <RefreshControl tintColor="#070000" refreshing={false} onRefresh={this.refreshList}/>
      )
    },
    renderPosts(post){
      post = post.item
      return(
          <UserPost key={post.id} userPostText={post.title} id={post.id} dimensions={post.dimensions}
                    files={post.files} username={post.username}  likes={post.likes}
                    profilePic={post.profilePicUrl} isDarkTheme={this.isDarkTheme}
          />
      );
    },
    viewSavedPosts(){
      this.areSavedPosts = !this.areSavedPosts
    },
    async getUserPosts(){
      let posts = await AsyncStorage.getItem(
          'posts',
      );
      posts = JSON.parse(posts)
      alert(posts)
    },
    async getSavedPosts(){
      this.savedPosts = [];
      let posts = await AsyncStorage.getItem(
          'saved-posts',
      );
      posts = JSON.parse(posts)
      for(let postId of posts){
        let post;
        await axios({
          method: 'get',
          url: `http://52.57.118.176/Post/Get/${postId}`,
          timeout: 5000
        })
            .then(function (response) {
              if (response.status === 200) {
                post = response.data
                post["dimensions"] = []
                const numberOfPhotos = post.files.length;
                for (let j = 0; j < numberOfPhotos; j++) {
                  post["dimensions"].push(
                      {
                        uri: "",
                        width: 300,
                        height: 300
                      }
                  )
                }
              }
              else
                post = false;
            })
            .catch(function () {
              post = false;
            });
        if(post !== false) {
          this.savedPosts.push(post);
          return;
        }
        this.noConnection = true;
      }
    },
    //This function sleeps the loading component, such that an actual loading is simulated
    sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    reportUser(){
      Alert.alert("", "",
          [
            {
              text: "Report user",
              style: "cancel",
              onPress: () => alert("report post")
            },
            {
              text: "Report user bug",
              style: "cancel",
              onPress: () => alert("report user bug")
            }
          ],
          {
            cancelable: true,
          }
      );
    },
    //This function is used in order to upload the photo which the user has selected for profile picture
    async uploadFile(){
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = pickerResult.uri;
      let filename = localUri.split('/').pop();

      return {localUri, filename};
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
    //This functions uploads the picture selected by the user to replace the profile picture
    async uploadProfilePicture() {
      let profilePicture = await this.uploadFile()
      let data = new FormData();
      data.append('Pic', {uri: profilePicture.localUri, name: profilePicture.filename});
      let newProfilePic;
      await axios.post('http://52.57.118.176/User/ProfilePic', data, {
        timeout: 4000,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(function (response){
        if(response.status === 200){
          newProfilePic = response.data.url
        }
      })
      .catch(function (error){
        if(error.response){
          Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
              [
                {
                  text: "Try again",
                  style: "cancel",
                }
              ],
              {
                cancelable: true,
              }
          );
        }
      });
      if(newProfilePic){
        Alert.alert("Success", "Profile picture updated successfully!",
            [
              {
                text: "Great",
                style: "cancel",
              }
            ],
            {
              cancelable: true,
            }
        );
        this.profilePicture = newProfilePic;
      }
    },
    async refreshList() {
      await this.getInitialPosts("top");
    },
    goToMainPage(){
      if(this.isMainUser)
        this.$emit("goToMainPage", this.profilePicture);
      else
        this.$emit("goToMainPage", "");
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
          })
          .catch(function(){
            noConnection = true;
          });
      if(noConnection){
        this.noConnection = true;
        return;
      }
      if(posts) {
        if(this.postNumber === 10)
          this.posts = posts.filter(post => post.userId === this.userID);
        else {
          if (postPosition === 'bottom' || !postPosition) {
            this.posts = this.posts.concat(posts)
          }
          else {
            this.posts.forEach(post => posts.push(post));
            posts = posts.filter(post => post.userId === this.userID);
            this.posts = posts;
          }
        }
        this.postNumber += 10;
      }
    },
  }
}
</script>

<style>
.noMorePostsIcon{
  margin-top: 20%;
  justify-content: center;
  align-self: center;
}
.profileHeader{
  flex-direction: row;
  justify-content: space-between;
}
.profilePicture{
  align-self: center;
}
.profile{
  flex: 1;
  align-self: center;
  margin-top: 5%;
}
.primaryTextDark{
  align-self: center;
  margin-top: 2%;
  margin-bottom: 5%;
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
}
.primaryTextLight{
  align-self: center;
  margin-top: 2%;
  margin-bottom: 5%;
  color: #555555;
  font-size: 20px;
  font-weight: 500;
}
.profilePictureButtonDark{
  align-self: center;
  background-color: #505050;
  width: 40%;
  height: 50%;
  margin: 5%;
}
.profilePictureButtonLight{
  align-self: center;
  background-color: #AFAFAF;
  width: 40%;
  height: 50%;
  margin: 5%;
}
.profilePictureButtonTextDark{
  align-self: center;
  font-size: 18px;
  font-weight: 400;
  color: ghostwhite;
  margin: 5%;
}
.profilePictureButtonTextLight{
  align-self: center;
  font-size: 18px;
  font-weight: 400;
  color: #070700;
  margin: 5%;
}
</style>