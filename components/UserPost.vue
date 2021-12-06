<!--The UserPost component consists of all the information retrieved from the API when user triggers the add post event-->
<template>
  <view v-if="isDarkTheme&&showPost&&loaded" class="postDark">
    <touchable-opacity :on-press="redirectToUser" :activeOpacity="0.6">
      <view v-if="!postHidden" class="postHeader">
  <!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
        <Image v-if="profilePic != null" :source="{uri: profilePic}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <text class="postHeaderTextDark">{{username}}</text>
      </view>
    </touchable-opacity>
    <view class="postContent">
      <view class="postContentHeader">
        <text class="postTextDark" v-if="!postHidden">{{userPostText}}</text>
        <text class="postTextDark" v-if="postHidden">This post is now hidden</text>
        <touchable-opacity :on-press="reportBug">
          <Image :source="require('../assets/three-dots.png')"
                 :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 5}" />
        </touchable-opacity>
      </view>
      <view :style="{flexDirection: 'row', flexWrap: 'wrap', flex: '1'}">
        <post-tag v-for="tag in tags" class="tag" :tag="tag.name" :isDarkTheme="isDarkTheme" v-if="!postHidden"></post-tag>
      </view>
      <text v-if="!postHidden" v-for="(file,index) in files">
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
    <view v-if="!postHidden" class="postFeedback">
      <touchable-opacity :on-press="likePost">
        <AntDesign :style="{marginRight: 45, alignSelf:'flex-start', opacity: likeOpacity}" name="like1" :size=24 color="#AAAAAA" />
      </touchable-opacity>
      <touchable-opacity :on-press="dislikePost">
        <AntDesign name="dislike1" :size=24 color="#AAAAAA" :style="{opacity: dislikeOpacity}" />
      </touchable-opacity>
      <text class="likesTextDark">{{likes}}</text>
      <touchable-opacity :on-press="postComment">
        <FontAwesome name="comment" :size=24 color="#AAAAAA" :style="{marginLeft: 15, marginRight:25, marginBottom: 5}" />
      </touchable-opacity>
      <touchable-opacity :on-press="sharePost">
        <FontAwesome :style="{marginLeft: 20, marginBottom: 5}" name="share" :size=24 color="#AAAAAA" />
      </touchable-opacity>
    </view>
    <view v-if="showComments&&comments.length > 0" class="postDark">
        <Comments v-for="comment in comments" :comment="comment.text" @redirectToLogin="redirectToLogin" @goBack="showComments = false"
                  :isDarkTheme="isDarkTheme" :id="id" :profilePicture="comment.user.profilePicUrl" :files="comment.files"
                  :firstName="comment.user.firstName" @goToProfile="redirectToCommentUser" :isGuest="isGuest"/>
      <view class="addNewComment">
      <FontAwesome5 name="comment" :size=14 color="#555555" :style="{zIndex: 2, marginTop: 14, marginLeft: 16}" />
      <text-input v-model="commentText" class="addNewCommentDark" placeholder="Comment..." placeholderTextColor="dimgrey"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 18, marginLeft: -16}" />
        <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
          <Ionicons name="image" :size=18 color="#AAAAAA" />
        </touchable-opacity>
        <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
          <text class="buttonTextDark">Send</text>
        </touchable-opacity>
      </view>
    </view>
    <view v-if="showComments&&comments.length === 0" class="postDark">
      <FontAwesome5 class="icon" name="comment-slash" :size=30 color="#AAAAAA" />
      <text class="commentsTextDark" :style="{marginBottom: 20}">There aren't any comments as of now! Be the first!</text>
    <view class="addNewComment">
      <FontAwesome5 name="comment" :size=14 color="#555555" :style="{zIndex: 2, marginTop: 14, marginLeft: 16}" />
      <text-input v-model="commentText" class="addNewCommentDark" placeholder="Comment..." placeholderTextColor="dimgrey"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 18, marginLeft: -16}" />
      <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
        <Ionicons name="image" :size=18 color="#AAAAAA" />
      </touchable-opacity>
      <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
        <text class="buttonTextDark">Send</text>
      </touchable-opacity>
    </view>
  </view>
  </view>
  <view v-else-if="!loaded">
    <activity-indicator size="large" color="dimgrey" />
  </view>
  <view v-else-if="!isDarkTheme&&showPost&&loaded" class="postLight">
    <touchable-opacity :on-press="redirectToUser" :activeOpacity="0.6">
      <view v-if="!postHidden" class="postHeader">
        <!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
        <Image v-if="profilePic != null" :source="{uri: profilePic}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <text class="postHeaderTextLight">{{username}}</text>
      </view>
    </touchable-opacity>
    <view class="postContent">
      <view class="postContentHeader">
        <text class="postTextLight" v-if="!postHidden">{{userPostText}}</text>
        <text class="postTextLight" v-if="postHidden">This post is now hidden</text>
        <touchable-opacity :on-press="reportBug">
          <Image :source="require('../assets/three-dots.png')"
                 :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 5}" />
        </touchable-opacity>
      </view>
      <view :style="{flexDirection: 'row', flexWrap: 'wrap', flex: '1'}">
        <post-tag v-for="tag in tags" class="tag" :tag="tag.name" :isDarkTheme="isDarkTheme" v-if="!postHidden"></post-tag>
      </view>
      <text v-if="!postHidden" v-for="(file,index) in files">
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
    <view v-if="!postHidden" class="postFeedback">
      <touchable-opacity :on-press="likePost">
        <AntDesign :style="{marginRight: 45, alignSelf:'flex-start', opacity: likeOpacity}" name="like1" :size=24 color="#555555" />
      </touchable-opacity>
      <touchable-opacity :on-press="dislikePost">
        <AntDesign name="dislike1" :size=24 color="#555555" :style="{opacity: dislikeOpacity}" />
      </touchable-opacity>
      <text class="likesTextLight">{{likes}}</text>
      <touchable-opacity :on-press="postComment">
        <FontAwesome name="comment" :size=24 color="#555555" :style="{marginLeft: 15, marginRight:25, marginBottom: 5}" />
      </touchable-opacity>
      <touchable-opacity :on-press="sharePost">
        <FontAwesome :style="{marginLeft: 20, marginBottom: 5}" name="share" :size=24 color="#555555" />
      </touchable-opacity>
    </view>
    <view v-if="showComments&&comments.length > 0" class="postLight">
      <Comments v-for="comment in comments" :comment="comment.text" @redirectToLogin="redirectToLogin" @goBack="showComments = false"
                :isDarkTheme="isDarkTheme" :id="id" :profilePicture="comment.user.profilePicUrl" :files="comment.files"
                :firstName="comment.user.firstName" @goToProfile="redirectToCommentUser" :isGuest="isGuest"/>
      <view class="addNewComment">
        <FontAwesome5 name="comment" :size=14 color="#555555" :style="{zIndex: 2, marginTop: 14, marginLeft: 16}" />
        <text-input v-model="commentText" class="addNewCommentLight" placeholder="Comment..." :multiline="true"
                    keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 18, marginLeft: -16}" />
        <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
          <Ionicons name="image" :size=18 color="#AAAAAA" />
        </touchable-opacity>
        <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
          <text class="buttonTextLight">Send</text>
        </touchable-opacity>
      </view>
    </view>
    <view v-if="showComments&&comments.length === 0" class="postLight">
      <FontAwesome5 class="icon" name="comment-slash" :size=30 color="#AAAAAA" />
      <text class="commentsTextLight" :style="{marginBottom: 20}">There aren't any comments as of now! Be the first!</text>
      <view class="addNewComment">
        <FontAwesome5 name="comment" :size=14 color="#AAAAAA" :style="{zIndex: 2, marginTop: 14, marginLeft: 16}" />
        <text-input v-model="commentText" class="addNewCommentLight" placeholder="Comment..." :multiline="true"
                    keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 18, marginLeft: -16}" />
        <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
          <Ionicons name="image" :size=18 color="#AAAAAA" />
        </touchable-opacity>
        <touchable-opacity class="addNewCommentButton" :on-press="createNewComment">
          <text class="buttonTextLight">Send</text>
        </touchable-opacity>
      </view>
    </view>
  </view>
</template>


<script>
import {Dimensions, Alert, AsyncStorage, Platform} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
const win = Dimensions.get('window');
import axios from 'axios';
import Comments from "./Comments";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import PostTag from "./PostTag";
export default {
  components: {
    PostTag,
    Comments,
    AntDesign,
    FontAwesome,
    Ionicons,
    FontAwesome5
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
      //This array will contain all the comment photos that will be added
      images: [],
      //This variable is responsible for hiding the post
      postHidden: false,
      //This variables will change when a post is interacted with
      likeOpacity: 1,
      dislikeOpacity: 1,
      username: "",
      userPostText: "",
      files: [],
      likes: 0,
      //This variable is used in order to render to component after the API call
      loaded: false,
      tags: []
    }
  },
  name: "UserPost",
  props:{
    id: Number,
    profilePic: String,
    dimensions: Array,
    liked: Boolean,
    isDarkTheme: Boolean,
    isGuest: Boolean
  },
  async beforeMount(){
    await this.loadPost();
  },
  async created(){
    let posts = await AsyncStorage.getItem(
        'hidden-posts',
    );
    posts = JSON.parse(posts)
    if(!Array.isArray(posts)){
      if (this.id === posts){
        this.username = "";
        this.profilePic = "";
        this.files = [];
        this.userPostText = "";
        this.postHidden = true;
      }
    }
    else{
      let found = false;
      found = posts.find(post => post === this.id);
      if(!found)
        return;
      this.username = "";
      this.profilePic = "";
      this.files = [];
      this.userPostText = "";
      this.postHidden = true;
    }
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
          "Files": this.images
        },
        timeout: 5000
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
        this.images = [];
        this.commentText = "";
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
    async postPhoto(){
      if(this.isGuest){
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
        return;
      }
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      let localUri = pickerResult.uri;
      let filename = localUri.split('/').pop();
      let newUri;
      let data = new FormData();
      data.append('File', {uri: localUri, name: filename});
      await axios.post('http://52.57.118.176/File/Add', data, {
        timeout: 4000,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(function (response){
        if(response.status === 200){
          newUri = response.data.url
        }
      })
      .catch(function(){
        Alert.alert("Oops", "Something went wrong",
            [
              {
                text: "Try again",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
        );
      });
      let newImage = {
        uri: newUri,
        height: pickerResult.height,
        width: pickerResult.width
      }
      Alert.alert("Success", "Image added successfully",
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
      this.images.push(newImage.uri)
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
        this.liked = true;
        this.disliked = false;
        this.likeOpacity = 0.4;
        this.dislikeOpacity = 1;
      }
      this.taps = 0;
      if(showLogin)
        Alert.alert("Error", "You are not logged in",
            [
              {
                text: "Like",
                style: "cancel",
                onPress: () => alert("Guest likes coming soon!")
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
    redirectToCommentUser(userData){
      this.$emit("goToUser", {username: userData.username, profilePicture: userData.profilePicture})
    },
    async loadPost(){
      let comments;
      let liked;
      let files;
      let title;
      let username;
      let profilePic;
      let likes;
      let tags;
      await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/Get/${this.id}`,
        timeout: 10000
      })
      .then(function (response){
        comments = response.data.comments
        liked = response.data.liked
        files = response.data.files;
        title = response.data.title;
        username = response.data.userName;
        profilePic = response.data.profilePicUrl;
        likes = response.data.likes;
        tags = response.data.tags;
      });
      this.loaded = true;
      if(liked){
        this.likeOpacity = 0.4;
        this.dislikeOpacity = 1;
      }
      else{
        this.likeOpacity = 1;
        this.dislikeOpacity = 0.4;
      }
      this.liked = liked;
      this.likes = likes;
      this.comments = comments;
      this.files = files;
      this.userPostText = title;
      this.username = username;
      this.profilePic = profilePic;
      this.tags = tags;
      this.disliked = this.liked;
      this.taps = 0;
    },
    async savePost(){
      let posts = await AsyncStorage.getItem(
          'saved-posts',
      );
      posts = JSON.parse(posts)
      if(!Array.isArray(posts)){
        posts = []
        posts.push(this.id.toString())
        posts = JSON.stringify(posts)
      }
      else{
        let newPosts = posts
        newPosts.push(this.id)
        posts = JSON.stringify(newPosts)
      }
      await AsyncStorage.setItem(
          'saved-posts',
          posts
      );
    },
    async hidePost(){
      let posts = await AsyncStorage.getItem(
          'hidden-posts',
      );
      posts = JSON.parse(posts)
      if(!Array.isArray(posts)){
        posts = []
        posts.push(this.id.toString())
        posts = JSON.stringify(posts)
      }
      else{
        let newPosts = posts
        newPosts.push(this.id)
        posts = JSON.stringify(newPosts)
      }
      await AsyncStorage.setItem(
          'hidden-posts',
          posts
      );
      this.username = "";
      this.profilePic = "";
      this.files = [];
      this.userPostText = "";
      this.postHidden = true;
    },
    async reShowPost(){
      let posts = await AsyncStorage.getItem(
          'hidden-posts',
      );
      posts = JSON.parse(posts)
      if(!Array.isArray(posts)){
        posts = []
      }
      else{
        let index = posts.indexOf(this.id.toString());
        posts.splice(index, 1)
      }
      posts = JSON.stringify(posts)
      await AsyncStorage.setItem(
          'hidden-posts',
          posts
      );
      this.postHidden = false;
      await this.loadPost();
    },
    //This function is supposed to let you report bugs and visibility options
    reportBug(){
      if(!this.postHidden) {
        if(Platform.OS === 'ios')
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
                  onPress: this.savePost
                }
              ]
          );
        else
          Alert.alert("", "",
              [
                {
                  text: "Report post",
                  style: "cancel",
                  onPress: () => alert("report post")
                },
                {
                  text: "Hide post",
                  style: "cancel",
                  onPress: this.hidePost
                },
                {
                  text: "Save post",
                  style: "cancel",
                  onPress: this.savePost
                }
              ],
              {
                cancelable: true,
              }
          );
        return;
      }
      if(Platform.OS === 'ios')
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
                text: "Show post",
                style: "cancel",
                onPress: this.reShowPost
              },
              {
                text: "Save post",
                style: "cancel",
                onPress: this.savePost
              }
            ]
        );
      else
        Alert.alert("", "",
            [
              {
                text: "Report post",
                style: "cancel",
                onPress: () => alert("report post")
              },
              {
                text: "Show post",
                style: "cancel",
                onPress: this.reShowPost
              },
              {
                text: "Save post",
                style: "cancel",
                onPress: this.savePost
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
        this.liked = false;
        this.disliked = true;
        this.likeOpacity = 1;
        this.dislikeOpacity = 0.4;
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
        this.liked = true;
        this.disliked = false;
        this.likeOpacity = 0.4;
        this.dislikeOpacity = 1;
      }
      if(showLogin)
        Alert.alert("Error", "You are not logged in",
            [
              {
                text: "Like",
                style: "cancel",
                onPress: () => alert("Guest likes coming soon!")
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
.icon{
  justify-content: center;
  align-self: center;
  margin-top: 10%;
}
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
  width: 70%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-top: 2%;
}
.addNewCommentLight{
  align-self: flex-start;
  background-color: #DADADA;
  color: #969696;
  width: 70%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-top: 2%;
}
.postContentHeader{
  flex-direction: row;
  justify-content: space-between;
}
.postHeader{
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 2%;
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
.commentsTextDark{
  color: #AAAAAA;
  font-size: 16px;
  font-weight: 400;
  align-self: center;
  margin-bottom: 2%;
}
.commentsTextLight{
  color: #555555;
  font-size: 16px;
  font-weight: 400;
  align-self: center;
  margin-bottom: 2%;
}
.postFeedback{
  align-self: center;
  flex-direction: row;
  align-content: space-between;
  margin-top: 2%;
  margin-bottom: 1%;
}
.tag{
  margin-left: 2%;
  flex-basis: 33%;
}
</style>