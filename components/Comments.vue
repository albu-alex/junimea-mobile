<template>
<view class="commentsDark" v-if="isDarkTheme">
  <view class="commentHeader">
    <Image :source="{uri: profilePicture}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5, marginLeft: 5, marginTop: 2}" />
    <touchable-opacity :on-press="goToProfile">
      <text class="headerTextDark">{{firstName}}</text>
    </touchable-opacity>
    <touchable-opacity :on-press="report" class="reportComment">
      <Image :source="require('../assets/three-dots.png')"
             :style="{width: 20, height:10, marginTop: 5}" />
    </touchable-opacity>
  </view>
  <text :style="{marginLeft: 5}" class="primaryTextDark">{{comment}}</text>
  <text v-for="(file,index) in files">
    <scroll-view :pinchGestureEnabled="true" :maximumZoomScale="3" :minimumZoomScale="1"
                 :showsVerticalScrollIndicator="false"
                 :showsHorizontalScrollIndicator="false">
      <Image :source="{uri: String(file)}"
             :style="{width: pageWidth, marginBottom: 10,
                      height: (pageWidth/300)*300}" />
    </scroll-view>
  </text>
  <view class="commentInteraction">
    <touchable-opacity :style="{marginLeft: 5, marginRight: 50}" :activeOpacity="1" :on-press="likeComment">
      <text class="secondaryTextDark">Like</text>
    </touchable-opacity>
    <touchable-opacity :activeOpacity="1" :on-press="replyToComment">
      <text class="secondaryTextDark">Reply</text>
    </touchable-opacity>
  </view>
  <view v-if="showReplyBox" class="commentFooter">
    <text-input v-model="commentText" class="addNewCommentDark" placeholder="Reply..." placeholderTextColor="dimgrey"
                :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft:5}"/>
    <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
      <Ionicons name="image" :size=18 color="#555555" />
    </touchable-opacity>
    <touchable-opacity :activeOpacity="0.85" :onPress="postComment">
      <text :style="{marginLeft: 20, marginTop: 5}" class="secondaryTextDark">Send</text>
    </touchable-opacity>
  </view>
</view>
<view class="commentsLight" v-else>
  <view class="commentHeader">
    <Image :source="{uri: profilePicture}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5, marginLeft: 5, marginTop: 2}" />
    <touchable-opacity :on-press="goToProfile">
      <text class="headerTextLight">{{firstName}}</text>
    </touchable-opacity>
    <touchable-opacity :on-press="report" class="reportComment">
      <Image :source="require('../assets/three-dots.png')"
             :style="{width: 20, height:10, marginTop: 5}" />
    </touchable-opacity>
  </view>
  <text :style="{marginLeft: 5}" class="primaryTextLight">{{comment}}</text>
  <text v-for="(file,index) in files">
    <scroll-view :pinchGestureEnabled="true" :maximumZoomScale="3" :minimumZoomScale="1"
                 :showsVerticalScrollIndicator="false"
                 :showsHorizontalScrollIndicator="false">
      <Image :source="{uri: String(file)}"
             :style="{width: pageWidth, marginBottom: 10,
                      height: (pageWidth/300)*300}" />
    </scroll-view>
  </text>
  <view class="commentInteraction">
    <touchable-opacity :style="{marginLeft: 5, marginRight: 50}" :activeOpacity="1" :on-press="likeComment">
      <text class="secondaryTextLight">Like</text>
    </touchable-opacity>
    <touchable-opacity :activeOpacity="1" :on-press="replyToComment">
      <text class="secondaryTextLight">Reply</text>
    </touchable-opacity>
  </view>
  <view v-if="showReplyBox" class="commentFooter">
  <text-input v-model="commentText" class="addNewCommentLight" placeholder="Reply..."
              :multiline="true" keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft: 5}" />
    <touchable-opacity class="addNewCommentButton" :on-press="postPhoto">
      <Ionicons name="image" :size=18 color="#AAAAAA" />
    </touchable-opacity>
    <touchable-opacity :activeOpacity="0.85" :onPress="postComment">
      <text :style="{marginLeft: 20, marginTop: 5}" class="secondaryTextDark">Send</text>
    </touchable-opacity>
  </view>
</view>
</template>

<script>
import axios from "axios";
import {Alert, Dimensions} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
const win = Dimensions.get('window');
export default {
  name: "Comments",
  props:{
    isDarkTheme: Boolean,
    id: Number,
    comment: String,
    profilePicture: String,
    files: Array,
    firstName: String,
    isGuest: Boolean
  },
  data(){
    return{
      commentText: "",
      showReplyBox: false,
      //These variables are used to dynamically resize the photo on any device
      pageWidth: win.width,
      pageHeight: win.height,
    }
  },
  components:{
    Ionicons
  },
  methods:{
    async postPhoto(){
      if(this.isGuest){
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
    },
    report(){
      Alert.alert("", "",
          [
            {
              text: "Report comment",
              style: "cancel",
              onPress: () => alert("report post")
            },
            {
              text: "Report comment bug",
              style: "cancel",
              onPress: () => alert("report user bug")
            }
          ],
          {
            cancelable: true,
          }
      );
    },
    likeComment(){
      alert("Like not available yet")
    },
    replyToComment(){
      if(!this.showReplyBox){
        this.showReplyBox = true;
        return;
      }
      this.commentText = "";
      this.showReplyBox = false;
    },
    goToProfile(){
      this.$emit("goToProfile", {username: this.firstName, profilePicture: this.profilePicture})
    },
    async postComment(){
      // let showLogin = false;
      // let comment;
      // await axios({
      //   method: 'post',
      //   url: `http://52.57.118.176/Comment/Add`,
      //   data:{
      //     "Text": this.commentText,
      //     "PostId": this.id,
      //     "Files": []
      //   },
      //   timeout: 4000
      // })
      // .then(function (response){
      //   if(response.status === 200){
      //     comment = response.data.text
      //   }
      // })
      // .catch(function(){
      //   showLogin = true;
      // });
      // if(!showLogin) {
      //   this.commentText = "";
      //   return;
      // }
      // Alert.alert("Error", "You are not logged in",
      //     [
      //       {
      //         text: "Login",
      //         style: "cancel",
      //         onPress: () => this.$emit("redirectToLogin")
      //       },
      //       {
      //         text: "Continue as guest",
      //         style: "destructive",
      //         onPress: () => alert(":(")
      //       }
      //     ],
      //     {
      //       cancelable: true,
      //       onDismiss: () => alert(":(")
      //     }
      // );
    }
  }
}
</script>

<style>
.addNewCommentButton{
  margin-left: 5%;
  margin-top: 1%;
}
.commentFooter{
  flex-direction: row;
}
.commentInteraction{
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 4%;
}
.addNewCommentLight{
  align-self: flex-start;
  background-color: #DADADA;
  color: #969696;
  width: 60%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4%;
}
.addNewCommentDark{
  align-self: flex-start;
  background-color: #252525;
  color: dimgrey;
  width: 60%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4%;
}
.reportComment{
  margin-left: 75%;
}
.commentsDark{
  background-color: #151515;
  border-width: 1px;
  border-color: #252525;
}
.commentsLight{
  background-color: #EAEAEA;
  border-width: 1px;
  border-color: #DADADA;
}
.headerTextDark{
  color: #AAAAAA;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 3%;
}
.headerTextLight{
  color: #555555;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 3%;
}
.commentHeader{
  justify-content: flex-start;
  flex-direction: row;
}
.secondaryTextDark{
  color: #AAAAAA;
  font-size: 12px;
  font-weight: 600;
}
.secondaryTextLight{
  color: #555555;
  font-size: 12px;
  font-weight: 600;
}
.primaryTextDark{
  color: #AAAAAA;
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 2%;
}
.primaryTextLight{
  color: #555555;
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 2%;
}
</style>