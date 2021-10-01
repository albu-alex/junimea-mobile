<template>
  <view class="profile" v-if="username !== ''">
<!--    Have to figure out how to get user profile picture from API-->
    <touchable-opacity :on-press="goToMainPage">
      <Image :source="require('../assets/back-button.png')" :style="{width: 35, height: 35}" />
    </touchable-opacity>
    <Image v-if="!profilePictureURL&&!profilePicture" :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else-if="profilePicture" :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text class="primaryText">{{username}}</text>
    <touchable-opacity v-if="isMainUser"
        :on-press="uploadProfilePicture" class="profilePictureButton">
      <text class="profilePictureButtonText">Change profile picture</text>
    </touchable-opacity>
<!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
      <scroll-view v-if="!isLoading" :scrollEventThrottle="0" :onScroll="refreshList" ref="pagePosts">
        <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes"
                   v-if="post.username === username"></UserPost>
      </scroll-view>
    <view v-if="isLoading" :style="{justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
  </view>
</template>

<script>
import UserPost from "./UserPost";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data'
export default {
  data(){
    return{
      isLoading: false,
      profilePictureURL: ""
    }
  },
  name: "UserProfile",
  props:{
    username: String,
    posts: Array,
    profilePicture: String,
    isMainUser: Boolean
  },
  components:{
    UserPost
  },
  methods: {
    //This function sleeps the loading component, such that an actual loading is simulated
    sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
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
          alert(Object.values(error.response.data.errors)[0]);
        }
      });
      if(newProfilePic){
        this.profilePictureURL = newProfilePic;
      }
    },
    refreshList(event) {
      // TODO: Pull data from API
      // This feature will be implemented completely after the API is configured
      if(event.nativeEvent.contentOffset.y < 0){
        this.isLoading = true;
        this.$emit("refreshUserPosts");
        this.sleep(500);
        this.isLoading = false;
      }
    },
    goToMainPage(){
      this.$emit("goToMainPage");
    }
  }
}
</script>

<style>
.profilePicture{
  align-self: center;
}
.profile{
  flex: 1;
  align-self: center;
  margin-top: 5%;
}
.primaryText{
  align-self: center;
  margin-top: 2%;
  margin-bottom: 5%;
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
}
.profilePictureButton{
  align-self: center;
  background-color: #505050;
  width: 50%;
}
.profilePictureButtonText{
  align-self: center;
  font-size: 20px;
  font-weight: 400;
  color: ghostwhite;
}
</style>