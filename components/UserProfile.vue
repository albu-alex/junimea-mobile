<template>
  <animated:view class="profile" v-if="username !== '' && isDarkTheme" :style="{opacity: viewOpacity}">
    <view class="profileHeader">
      <touchable-opacity :on-press="goToMainPage">
        <Ionicons name="ios-arrow-back" :size=30 color="#505050" />
      </touchable-opacity>
      <touchable-opacity v-if="!isMainUser" :on-press="reportUser">
        <Image :source="require('../assets/three-dots.png')"
               :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 3}" />
      </touchable-opacity>
    </view>
    <Image v-if="!profilePictureURL&&!profilePicture" :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else-if="profilePicture" :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text class="primaryTextDark">{{username}}</text>
    <view :style="{flexDirection: 'row'}">
      <touchable-opacity :style="{borderRadius: 10}" v-if="isMainUser"
          :on-press="uploadProfilePicture" class="profilePictureButtonDark">
        <text class="profilePictureButtonTextDark">Change picture</text>
      </touchable-opacity>
      <touchable-opacity :style="{borderRadius: 10}" v-if="isMainUser"
                         :on-press="viewSavedPosts" class="profilePictureButtonDark">
        <text class="profilePictureButtonTextDark">View saved posts</text>
      </touchable-opacity>
    </view>
<!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
      <scroll-view v-if="!isLoading&&!areSavedPosts" :scrollEventThrottle="0" :onScroll="refreshList" ref="pagePosts">
        <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes"
                   v-if="post.userId === userID || post.userName === username" :isDarkTheme="isDarkTheme"></UserPost>
      </scroll-view>
      <scroll-view v-else-if="!isLoading&&areSavedPosts">
        <UserPost v-for="post in savedPosts" :key="post.id" :userPostText="post.title" :id="post.id"
                  :dimensions="(post.dimensions) ? post.dimensions : []" :files="post.files" :username="post.userName"
                  :profilePic="post.profilePicUrl" :likes="post.likes" :isDarkTheme="isDarkTheme"></UserPost>
      </scroll-view>
    <view v-if="isLoading" :style="{justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
  </animated:view>
  <animated:view class="profile" v-else-if="username !== '' && !isDarkTheme" :style="{opacity: viewOpacity}">
    <view class="profileHeader">
      <touchable-opacity :on-press="goToMainPage">
        <Ionicons name="ios-arrow-back" :size=30 color="#AFAFAF" />
      </touchable-opacity>
      <touchable-opacity v-if="!isMainUser" :on-press="reportUser">
        <Image :source="require('../assets/three-dots.png')"
               :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 3}" />
      </touchable-opacity>
    </view>
    <Image v-if="!profilePictureURL&&!profilePicture" :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else-if="profilePicture" :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <Image v-else :source="{uri: profilePicture}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text class="primaryTextLight">{{username}}</text>
    <view :style="{flexDirection: 'row'}">
      <touchable-opacity v-if="isMainUser" :style="{borderRadius: 10}"
                         :on-press="uploadProfilePicture" class="profilePictureButtonLight">
        <text class="profilePictureButtonTextLight">Change picture</text>
      </touchable-opacity>
      <touchable-opacity v-if="isMainUser" :style="{borderRadius: 10}"
                         :on-press="viewSavedPosts" class="profilePictureButtonLight">
        <text class="profilePictureButtonTextLight">View saved posts</text>
      </touchable-opacity>
    </view>
    <!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
    <scroll-view v-if="!isLoading&&!areSavedPosts" :scrollEventThrottle="0" :onScroll="refreshList" ref="pagePosts">
      <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
                :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes"
                v-if="post.userId === userID || post.userName === username" :isDarkTheme="isDarkTheme"></UserPost>
    </scroll-view>
    <scroll-view v-else-if="!isLoading&&areSavedPosts">
      <UserPost v-for="post in savedPosts" :key="post.id" :userPostText="post.title" :id="post.id"
                :dimensions="(post.dimensions) ? post.dimensions : []" :files="post.files" :username="post.userName"
                :profilePic="post.profilePicUrl" :likes="post.likes" :isDarkTheme="isDarkTheme"></UserPost>
    </scroll-view>
    <view v-if="isLoading" :style="{justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
  </animated:view>
</template>

<script>
import UserPost from "./UserPost";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data'
import {Alert, Animated, AsyncStorage, Easing} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default {
  data(){
    return{
      isLoading: false,
      profilePictureURL: "",
      viewOpacity: 0,
      areSavedPosts: false,
      savedPosts: []
    }
  },
  created(){
    this.viewOpacity = new Animated.Value(0)
  },
  mounted(){
    this.animateView();
  },
  async beforeMount(){
    let posts = await AsyncStorage.getItem(
        'saved-posts',
    );
    posts = JSON.parse(posts)
    alert(posts)
    for(let postId in posts){
      let post;
      await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/Get/${postId}`,
        timeout: 4000
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
        post = false;
      })
      .catch(function () {
        post = false;
      });
      if(post !== false)
        this.savedPosts.push(post);
    }
  },
  name: "UserProfile",
  props:{
    username: String,
    posts: Array,
    profilePicture: String,
    userID: String,
    isMainUser: Boolean,
    isDarkTheme: Boolean
  },
  components:{
    UserPost,
    Ionicons
  },
  methods: {
    viewSavedPosts(){
      this.areSavedPosts = !this.areSavedPosts
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
        this.profilePictureURL = newProfilePic;
      }
    },
    refreshList(event) {
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