<template>
  <view class="postBox">
    <text-input v-model="postText" class="addNewPost" placeholder="What are you thinking about?"/>
    <view class="postButtons">
      <touchable-opacity :on-press="addPost" class="postButton">
        <text class="postButtonText">Create new post</text>
      </touchable-opacity>
      <touchable-opacity :on-press="uploadFile" class="postPhoto">
    <!--    Source to be changed with something not static-->
        <Image :source="require('D:\\Cursuri\\vue-native\\junimea-mobile\\assets\\add_photo_icon.png')"
                :style="{width: 25, height:25}" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import axios from "axios";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};
export default {
  data(){
    return{
      postText: "",
      images: [],
    }
  },
  name: "AddPostBox",
  methods:{
    uploadFile(){
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    },
    addPost(){
      if(!this.postText){
        alert("Post must contain text!");
        return 1;
      }
      let post={
        text: this.postText,
      }
      this.$emit('addPost', post);
      this.postText = "";
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
  background-color: ghostwhite;
  color: dimgrey;
  width: 100%;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
}
</style>