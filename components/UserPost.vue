<!--The UserPost component consists of all the information retrieved from the API when user triggers the add post event-->
<template>
  <view class="post">
    <touchable-opacity :on-press="redirectToUser">
      <view class="postHeader">
  <!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
        <Image v-if="profilePic != null" :source="{uri: profilePic}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
        <text class="postHeaderText">{{username}}</text>
      </view>
    </touchable-opacity>
    <view class="postContent">
      <view class="postContentHeader">
        <text class="postText">{{userPostText}}</text>
        <touchable-opacity :on-press="reportBug">
          <Image :source="require('../assets/three-dots.png')"
                 :style="{width: 25, height:10, alignSelf: 'flex-end', marginTop: 5}" />
        </touchable-opacity>
      </view>
      <text v-for="(file,index) in files">
        <scroll-view :pinchGestureEnabled="true" :maximumZoomScale="3" :minimumZoomScale="1"
                     :showsVerticalScrollIndicator="false"
                     :showsHorizontalScrollIndicator="false">
          <touchable-opacity :on-press="likePost">
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
      <text class="likesText">{{likes}}</text>
    </view>
  </view>
</template>


<!--TODO: To be moved into separate folder-->
<script>
import { Dimensions, Animated } from "react-native";
const win = Dimensions.get('window');
import axios from 'axios';
export default {
  data(){
    return {
      //These variables are used to dynamically resize the photo on any device
      pageWidth: win.width,
      pageHeight: win.height,
      //This variable keeps track of the zooming
      zoomScale: 1,
      //As default comes the same as this.liked
      disliked: Boolean
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
    liked: Boolean
  },
  beforeMount(){
    this.disliked = this.liked;
  },
  methods:{
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
      .catch(function(response){
        alert(response)
      });
      if(newLikes !== undefined){
        this.likes = newLikes;
        this.disliked = !this.disliked
      }
    },
    async likePost(){
      let newLikes;
      let value;
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
      .catch(function(response){
        alert(response)
      });
      if(newLikes !== undefined){
        this.likes = newLikes;
        this.liked = !this.liked
      }
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
.post{
  margin-bottom: 5%;
  background-color: #151515;
}
.postHeaderText{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 3%;
}
.likesText{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 500;
  align-self: center;
  margin-right: 5%;
  margin-left: 5%;
}
.postText{
  color: #AAAAAA;
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