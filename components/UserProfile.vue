<template>
  <view class="profile" v-if="username !== ''">
<!--    Have to figure out how to get user profile picture from API-->
    <touchable-opacity :on-press="goToMainPage">
      <Image :source="require('../assets/back-button.png')" :style="{width: 35, height: 35}" />
    </touchable-opacity>
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text class="primaryText">{{username}}</text>
    <touchable-opacity :on-press="uploadProfilePicture" class="profilePictureButton">
      <text class="profilePictureButtonText">Change profile picture</text>
    </touchable-opacity>
<!--    scrollEventThrottle only works for iOS; have to come up with a solution for Android-->
      <scroll-view v-if="!isLoading" :scrollEventThrottle="0" :onScroll="refreshList" ref="pagePosts">
        <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes" ></UserPost>
      </scroll-view>
    <view v-if="isLoading" :style="{justifyContent: 'center'}">
      <activity-indicator size="large" color="dimgrey" />
    </view>
  </view>
</template>

<script>
import UserPost from "./UserPost";
export default {
  data(){
    return{
      isLoading: false,
    }
  },
  name: "UserProfile",
  props:{
    username: String,
    posts: Array
  },
  components:{
    UserPost
  },
  methods: {
    //This function sleeps the loading component, such that an actual loading is simulated
    sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    uploadProfilePicture() {
      // Have to figure out connection between profile picture and API
      alert("New feature coming soon!")
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