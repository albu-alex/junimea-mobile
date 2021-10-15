<template>
  <view v-if="isDarkTheme" class="postBox">
    <text-input v-model="postText" class="addNewPostDark" placeholder="What are you thinking about?"
                :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 7}" />
    <view class="postButtons">
      <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 2}" :on-press="addPost" class="postButtonDark">
        <text class="postButtonTextDark">Create new post</text>
      </touchable-opacity>
      <touchable-opacity :on-press="uploadFile" class="postPhoto">
        <Image :source="require('../assets/add_photo_icon.png')"
                :style="{width: 25, height:25}" />
      </touchable-opacity>
    </view>
  </view>
  <view v-else class="postBox">
    <text-input v-model="postText" class="addNewPostLight" placeholder="What are you thinking about?" :style="{borderRadius: 10, paddingHorizontal: 7}"
                :multiline="true" keyboardAppearance="light" placeholderTextColor="ghostwhite"/>
    <view class="postButtons">
      <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 2}" :on-press="addPost" class="postButtonLight">
        <text class="postButtonTextLight">Create new post</text>
      </touchable-opacity>
      <touchable-opacity :on-press="uploadFile" class="postPhoto">
        <Image :source="require('../assets/add_photo_icon.png')"
               :style="{width: 25, height:25}" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import FormData from "form-data";
import {Alert} from "react-native";
export default {
  data(){
    return{
      postText: "",
      images: [],
    }
  },
  name: "AddPostBox",
  props:{
    username: String,
    isDarkTheme: Boolean
  },
  methods:{
    async uploadFile(){
      if(this.username === ""){
        Alert.alert("Error", "Users can not create posts",
            [
              {
                text: "Login first",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
        );
        this.$emit("redirectToLogin");
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
      await axios.post('http://52.57.118.176/Post/AddFile', data, {
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
      this.images.push(newImage)
    },
    addPost(){
      if(this.username === ""){
        Alert.alert("Error", "Users can not create posts",
            [
              {
                text: "Login first",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
        );
        this.$emit("redirectToLogin");
        return;
      }
      if(!this.postText){
        alert("Post text is required!");
        return 1;
      }
      let post = {
          text: this.postText,
          images: this.images,
      }
      this.$emit('addPost', post);
      this.postText = "";
      this.images = [];
    }
  }
}
</script>

<style>
.postButtons{
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3%;
}
.postBox{
  margin-top: 3%;
  justify-content: center;
}
.postPhoto{
  margin-top: 4%;
  margin-left: 6%;
}
.postButtonDark{
  background-color: #AAAAAA;
  height: 25px;
  margin-top: 4%;
  margin-right: 6%;
  justify-content: center;
  align-self: center;
}
.postButtonLight{
  background-color: #555555;
  height: 25px;
  margin-top: 4%;
  margin-right: 6%;
  justify-content: center;
  align-self: center;
}
.postButtonTextDark{
  color: black;
  font-weight: 400;
  font-size: 14px;
}
.postButtonTextLight{
  color: white;
  font-weight: 400;
  font-size: 14px;
}
.addNewPostDark{
  align-self: center;
  background-color: ghostwhite;
  color: dimgrey;
  width: 90%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
.addNewPostLight{
  align-self: center;
  background-color: #212121;
  color: #969696;
  width: 90%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
</style>