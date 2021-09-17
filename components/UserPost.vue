<!--The UserPost component consists of all the information retrieved from the API when user triggers the add post event-->
<template>
  <view class="post">
    <view class="postHeader">
<!--      An avatar image is displayed if the user does not have a profile picture, otherwise it will display the actual profile picture-->
      <Image v-if="profilePic != null" :source="profilePic" :style="{width: 25, height:25}"/>
      <Image v-else :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}" :style="{width: 25, height:25, borderRadius: 50}"/>
      <text class="postHeaderText">{{username}}</text>
    </view>
    <view class="postContent">
      <text class="postText">{{userPostText}}</text>
      <text class="postText" v-for="file in files">
        <Image :source="{uri: String(file)}" :style="{width: pageWidth, height: pageHeight/5}" />
      </text>
    </view>
    <text class="postText">{{likes}}</text>
  </view>
</template>


<!--TODO: To be moved into separate folder-->
<script>
import { Dimensions } from "react-native";
const win = Dimensions.get('window');
export default {
  data(){
    return {
      //These variables are used to dynamically resize the photo on any device
      pageWidth: win.width,
      pageHeight: win.height,
    }
  },
  name: "UserPost",
  props:{
    userPostText: String,
    id: Number,
    files: Array,
    username: String,
    profilePic: String,
    likes: Number
  }
}
</script>


<style>
.postHeader{
  flex-direction: row;
  justify-content: center;
  margin: 5%;
}
.post{
  margin-bottom: 5%;
}
.postHeaderText{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 3%;
}
.postText{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 500;
  align-self: center;
  margin-bottom: 2%;
}
</style>