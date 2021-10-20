<!--The UserPost component consists of all the information retrieved from the API when user triggers the add post event-->
<template>
  <view v-if="isDarkTheme&&showPost" class="postDark">
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
            <Image :source="{uri: String(file)}"
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
    <view v-if="showComments" class="postDark">
        <Comments v-for="comment in comments" :comment="comment.text" @redirectToLogin="redirectToLogin" @goBack="showComments = false"
                  :isDarkTheme="isDarkTheme" :id="id" :profilePicture="comment.user.profilePicUrl" :files="comment.files"
                  :firstName="comment.user.firstName"/>
      <view class="addNewComment">
      <text-input v-model="commentText" class="addNewCommentDark" placeholder="Comment..." placeholderTextColor="dimgrey"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft:10}" />
        <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
          <text class="buttonTextDark">Send</text>
        </touchable-opacity>
      </view>
    </view>
  </view>
  <view v-else-if="!isDarkTheme&&showPost" class="postLight">
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
            <Image :source="{uri: String(file)}"
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
    <view v-if="showComments" class="postLight">
      <Comments v-for="comment in comments" :comment="comment.text" @redirectToLogin="redirectToLogin" @goBack="showComments = false"
                :isDarkTheme="isDarkTheme" :id="id" :profilePicture="comment.user.profilePicUrl" :files="comment.files"
                :firstName="comment.user.firstName" />
      <view class="addNewComment">
        <text-input v-model="commentText" class="addNewCommentLight" placeholder="Comment..." :multiline="true"
                    keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft:10}" />
        <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
          <text class="buttonTextLight">Send</text>
        </touchable-opacity>
      </view>
    </view>
  </view>
</template>


<script>
import {Dimensions, Alert} from "react-native";
const win = Dimensions.get('window');
import axios from 'axios';
import Comments from "./Comments";
export default {
  components: {
    Comments
  },
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
      taps: 0,
      //This variable holds the responsibility of displaying the comments component
      showComments: false,
      comments: [],
      //This variable is used for the hide post functionality
      showPost: true,
      //This variable will be the model for the comment text
      commentText: "",
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
    isDarkTheme: Boolean,
  },
  async beforeMount(){
    let comments;
    await axios({
      method: 'get',
      url: `http://52.57.118.176/Post/Get/${this.id}`,
      timeout: 4000
    })
    .then(function (response){
      comments = response.data.comments
    });
    this.comments = comments
    this.disliked = this.liked;
    this.taps = 0;
  },
  methods:{
    async createNewComment(){
      let showLogin = false;
      let comment;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/Comment/Add`,
        data:{
          "Text": this.commentText,
          "PostId": this.id,
          "Files": []
        },
        timeout: 4000
      })
      .then(function (response){
        if(response.status === 200){
          comment = response.data
        }
      })
      .catch(function(){
        showLogin = true;
      });
      if(!showLogin) {
        this.comments.push(comment)
        return;
      }
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
    postComment(){
      this.showComments = !this.showComments
    },
    sharePost(){
      alert("Not a way to implement this yet!")
    },
    redirectToLogin(){
      this.$emit("redirectToLogin");
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
    hidePost(){
      this.username = "";
      this.profilePic = "";
      this.files = [];
      this.userPostText = "";
    },
    //This function is supposed to let you report bugs and visibility options
    reportBug(){
      Alert.alert("", "",
          [
            {
              text: "Report post",
              style: "cancel",
              onPress: () => alert("report post")
            },
            {
              text: "Report bug",
              style: "cancel",
              onPress: () => alert("report bug")
            },
            {
              text: "Hide post",
              style: "cancel",
              onPress: this.hidePost
            },
            {
              text: "Save post",
              style: "cancel",
              onPress: () => alert("save post")
            }
          ],
          {
            cancelable: true,
          }
      );
    },
    async dislikePost(){
      let newLikes;
      let showLogin = false;
      await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
          "Value": -1,
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
.buttonTextLight{
  color: #555555;
  font-size: 12px;
  font-weight: 600;
}
.buttonTextDark{
  color: #AAAAAA;
  font-size: 12px;
  font-weight: 600;
}
.addNewComment{
  flex-direction: row;
}
.addNewCommentButton{
  margin-top: 3%;
  margin-left: 5%;
}
.addNewCommentDark{
  align-self: flex-start;
  background-color: #252525;
  color: dimgrey;
  width: 80%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-top: 2%;
}
.addNewCommentLight{
  align-self: flex-start;
  background-color: #DADADA;
  color: #969696;
  width: 80%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-top: 2%;
}
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