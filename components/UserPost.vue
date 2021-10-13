<!--The UserPost component consists of all the information retrieved from the API when user triggers the add post event-->
<template>
  <view v-if="isDarkTheme" class="postDark">
    <touchable-opacity :on-press="redirectToUser">
      <view class="postHeader">
  <!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
        <Image v-if="profilePic != null" :source="{uri: profilePic}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <text class="postHeaderTextDark">{{username}}</text>
      </view>
    </touchable-opacity>
    <view class="postContent">
      <view class="postContentHeader">
        <text class="postTextDark">{{userPostText}}</text>
        <touchable-opacity :on-press="reportBug">
          <Image :source="require('../assets/three-dots.png')"
                 :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 5}" />
        </touchable-opacity>
      </view>
      <text v-for="(file,index) in files">
        <scroll-view :pinchGestureEnabled="true" :maximumZoomScale="3" :minimumZoomScale="1"
                     :showsVerticalScrollIndicator="false"
                     :showsHorizontalScrollIndicator="false">
          <touchable-opacity :on-press="doubleTapToLike" :activeOpacity="1">
            <animated:Image :source="{uri: String(file)}"
                            :style="{width: pageWidth, marginBottom: 10,
                            height: (pageWidth/dimensions[index].width)*dimensions[index].height}" />
          </touchable-opacity>
        </scroll-view>
      </text>
    </view>
    <view class="postFeedback">
      <touchable-opacity :on-press="likePost">
        <Image class="upButton"
               :style="{width: 25, height:25}"
               :source="require('../assets/up-button.png')" />
      </touchable-opacity>
      <touchable-opacity :on-press="dislikePost">
        <Image class="upButton"
              :style="{width: 25, height:25, marginLeft: 20}"
              :source="require('../assets/down-button.png')" />
      </touchable-opacity>
      <text class="likesTextDark">{{likes}}</text>
      <touchable-opacity :on-press="postComment">
        <Image class="upButton"
               :style="{width: 25, height:25, marginLeft: 5, marginRight:10, marginBottom: 5}"
               :source="require('../assets/comment-icon.png')" />
      </touchable-opacity>
      <touchable-opacity :on-press="sharePost">
        <Image class="upButton"
               :style="{width: 25, height:25, marginLeft: 20, marginBottom: 5}"
               :source="require('../assets/share-button.png')" />
      </touchable-opacity>
    </view>
  </view>
  <view v-else class="postLight">
    <touchable-opacity :on-press="redirectToUser">
      <view class="postHeader">
        <!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
        <Image v-if="profilePic != null" :source="{uri: profilePic}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <text class="postHeaderTextLight">{{username}}</text>
      </view>
    </touchable-opacity>
    <view class="postContent">
      <view class="postContentHeader">
        <text class="postTextLight">{{userPostText}}</text>
        <touchable-opacity :on-press="reportBug">
          <Image :source="require('../assets/three-dots.png')"
                 :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 5}" />
        </touchable-opacity>
      </view>
      <text v-for="(file,index) in files">
        <scroll-view :pinchGestureEnabled="true" :maximumZoomScale="3" :minimumZoomScale="1"
                     :showsVerticalScrollIndicator="false"
                     :showsHorizontalScrollIndicator="false">
          <touchable-opacity :on-press="doubleTapToLike" :activeOpacity="1">
            <animated:Image :source="{uri: String(file)}"
                            :style="{width: pageWidth, marginBottom: 10,
                            height: (pageWidth/dimensions[index].width)*dimensions[index].height}" />
          </touchable-opacity>
        </scroll-view>
      </text>
    </view>
    <view class="postFeedback">
      <touchable-opacity :on-press="likePost">
        <Image class="upButton"
               :style="{width: 25, height:25}"
               :source="require('../assets/up-button.png')" />
      </touchable-opacity>
      <touchable-opacity :on-press="dislikePost">
        <Image class="upButton"
               :style="{width: 25, height:25, marginLeft: 20}"
               :source="require('../assets/down-button.png')" />
      </touchable-opacity>
      <text class="likesTextLight">{{likes}}</text>
      <touchable-opacity :on-press="postComment">
        <Image class="upButton"
               :style="{width: 25, height:25, marginLeft: 5, marginRight:10, marginBottom: 5}"
               :source="require('../assets/comment-icon.png')" />
      </touchable-opacity>
      <touchable-opacity :on-press="sharePost">
        <Image class="upButton"
               :style="{width: 25, height:25, marginLeft: 20, marginBottom: 5}"
               :source="require('../assets/share-button.png')" />
      </touchable-opacity>
    </view>
  </view>
</template>


<!--TODO: To be moved into separate folder-->
<script>
import {Dimensions, Animated, Alert} from "react-native";
const win = Dimensions.get('window');
import axios from 'axios';
export default {
  data(){
    return {
      loggingIn: Boolean,
      //These variables are used to dynamically resize the photo on any device
      pageWidth: win.width,
      pageHeight: win.height,
      //This variable keeps track of the zooming
      zoomScale: 1,
      //As default comes the same as this.liked
      disliked: Boolean,
      //The next 3 variables are used in order to determine the double tap to like logic
      startTime: Number,
      endTime: Number,
      taps: 0
    }
  },
  name: "UserPost",
  props:{
    userPostText: String,
    id: Number,
    files: Array,
    dimensions: Array,
    username: String,
    profilePic: String,
    likes: Number,
    liked: Boolean,
    isDarkTheme: Boolean
  },
  beforeMount(){
    this.disliked = this.liked;
    this.taps = 0;
  },
  methods:{
    postComment(){
      alert("Not available yet!")
    },
    sharePost(){
      alert("Not a way to implement this yet!")
    },
    async doubleTapToLike(){
      if(this.taps === 0){
        this.taps = 1;
        this.startTime = performance.now();
        return;
      }
      this.endTime = performance.now();
      if(this.endTime - this.startTime > 1000) {
        this.taps = 0;
        return;
      }
      let newLikes;
      let showLogin = false;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
          "Value": 1,
          "Id": this.id
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.data.errorMessage === null){
          newLikes = response.data.count;
        }
      })
      .catch(function(){
        showLogin = true;
      });
      if(newLikes !== undefined) {
        this.likes = newLikes;
        this.liked = !this.liked
      }
      this.taps = 0;
      if(showLogin)
        Alert.alert("Error", "You are not logged in",
            [
              {
                text: "Login",
                style: "cancel",
                onPress: () => this.$emit("redirectToLogin")
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
    },
    redirectToUser(){
      this.$emit("goToUser",{username: this.username, profilePicture: this.profilePic})
    },
    //This function is supposed to let you report bugs and visibility options
    reportBug(){
      alert("Not yet!")
    },
    async dislikePost(){
      let newLikes;
      let value;
      let showLogin = false;
      if(!this.disliked)
        value = -1;
      else
        value = 1;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
          "Value": value,
          "Id": this.id
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.data.errorMessage === null){
          newLikes = response.data.count;
        }
      })
      .catch(function(){
        showLogin = true;
      });
      if(newLikes !== undefined){
        this.likes = newLikes;
        this.disliked = !this.disliked
      }
      if(showLogin)
        Alert.alert("Error", "You are not logged in",
            [
              {
                text: "Login",
                style: "cancel",
                onPress: () => this.$emit("redirectToLogin")
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
    },
    async likePost(){
      let newLikes;
      let value;
      let showLogin = false;
      if(!this.liked)
        value = 1;
      else
        value = -1;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
          "Value": value,
          "Id": this.id
        },
        timeout: 4000
        })
      .then(function (response){
        if(response.data.errorMessage === null){
          newLikes = response.data.count;
        }
      })
      .catch(function(){
        showLogin = true;
      });
      if(newLikes !== undefined){
        this.likes = newLikes;
        this.liked = !this.liked
      }
      if(showLogin)
        Alert.alert("Error", "You are not logged in",
            [
              {
                text: "Login",
                style: "cancel",
                onPress: () => this.$emit("redirectToLogin")
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
    }
  },
}
</script>


<style>
.postContentHeader{
  flex-direction: row;
  justify-content: space-between;
}
.upButton{
  margin-top: 6%;
}
.postHeader{
  flex-direction: row;
  justify-content: center;
  margin: 5%;
}
.postDark{
  margin-bottom: 5%;
  background-color: #151515;
}
.postLight{
  margin-bottom: 5%;
  background-color: #EAEAEA;
}
.postHeaderTextDark{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 3%;
}
.postHeaderTextLight{
  color: #555555;
  font-size: 20px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 3%;
}
.likesTextDark{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 500;
  align-self: center;
  margin-right: 15%;
  margin-left: 15%;
}
.likesTextLight{
  color: #555555;
  font-size: 24px;
  font-weight: 500;
  align-self: center;
  margin-right: 15%;
  margin-left: 15%;
}
.postTextDark{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 2%;
  margin-bottom: 2%;
}
.postTextLight{
  color: #555555;
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 2%;
  margin-bottom: 2%;
}
.postFeedback{
  align-self: center;
  flex-direction: row;
  align-content: center;
  margin-top: 2%;
}
</style>