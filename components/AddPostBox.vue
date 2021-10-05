<template>
  <view class="postBox">
    <text-input v-model="postText" class="addNewPost" placeholder="What are you thinking about?"
                :multiline="true" keyboardAppearance="dark"/>
    <view class="postButtons">
      <touchable-opacity :on-press="addPost" class="postButton">
        <text class="postButtonText">Create new post</text>
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
    username: String
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
      .catch(function (response){
        alert(response);
      });
      let newImage = {
        uri: newUri,
        height: pickerResult.height,
        width: pickerResult.width
      }
      alert("Image added successfully!")
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
}
.postBox{
  margin-top: 3%;
  justify-content: center;
}
.postPhoto{
  margin-top: 4%;
  margin-left: 6%;
}
.postButton{
  background-color: #AAAAAA;
  height: 25px;
  margin-top: 4%;
  margin-right: 6%;
  justify-content: center;
  align-self: center;
}
.postButtonText{
  color: black;
  font-weight: 400;
  font-size: 14px;
}
.addNewPost{
  align-self: center;
  background-color: ghostwhite;
  color: dimgrey;
  width: 90%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
</style>