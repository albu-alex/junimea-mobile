<template>
  <view class="profile">
<!--    Have to figure out how to get user profile picture from API-->
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 75, height: 75, borderRadius: 50}" class="profilePicture" />
    <text class="primaryText">{{username}}</text>
    <touchable-opacity :on-press="uploadProfilePicture" class="profilePictureButton">
      <text class="profilePictureButtonText">Change profile picture</text>
    </touchable-opacity>
    <RefreshControl :refreshing="refreshing" :onRefresh="refreshList"/>
      <scroll-view ref="pagePosts">
        <UserPost v-for="post in posts" :key="post.id" :userPostText="post.title" :id="post.id" :dimensions="post.dimensions"
                  :files="post.files" :username="post.username" :profilePic="post.profilePic" :likes="post.likes" ></UserPost>
      </scroll-view>
  </view>
</template>

<script>
import UserPost from "./UserPost";
import RefreshControl from 'react-native';
export default {
  data(){
    return{
      refreshing: false,
    }
  },
  name: "UserProfile",
  props:{
    username: String,
    posts: Array
  },
  components:{
    UserPost,
    RefreshControl
  },
  methods: {
    uploadProfilePicture() {
      // Have to figure out connection between profile picture and API
      alert("New feature coming soon!")
    },
    refreshList() {
      this.refreshing = true;
      alert("Hey, user!")
      this.refreshing = false;
    },
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