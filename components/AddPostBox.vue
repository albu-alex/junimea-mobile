<template>
  <view v-if="isDarkTheme" class="postBox">
    <touchable-opacity :on-press="addNewPost" :activeOpacity="0.6">
      <view v-if="isDarkTheme&&!addPost">
        <MaterialIcons :style="{alignSelf: 'center', marginBottom: 5}" name="add-circle" :size=32 color="#AAAAAA" />
        <text class="primaryTextDark">Create a new post</text>
      </view>
    </touchable-opacity>
    <view v-if="isDarkTheme&&addPost">
      <Ionicons name="text" :size=20 color="#AAAAAA" class="logo" />
      <text-input v-model="postText" class="addNewPostDark" placeholder="Title"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 25}" />
      <FontAwesome5 name="hashtag" :size=20 color="#AAAAAA" class="logo" />
      <text-input v-model="tags" class="addNewPostDark" placeholder="Tags"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 25}" />
      <text class="primaryTextDark">{{images.length}} {{photos}} added</text>
      <view class="postButtons">
        <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 2}" :on-press="addPostFunction" class="postButtonDark">
          <text class="postButtonTextDark">Create new post</text>
        </touchable-opacity>
        <touchable-opacity :on-press="uploadFile" class="postPhoto">
          <Ionicons name="image" :size=24 color="#AAAAAA" />
        </touchable-opacity>
      </view>
    </view>
  </view>
  <view v-else class="postBox">
    <touchable-opacity :on-press="addNewPost" :activeOpacity="0.6">
      <view v-if="!isDarkTheme&&!addPost">
        <MaterialIcons :style="{alignSelf: 'center', marginBottom: 5}" name="add-circle" :size=32 color="#555555" />
        <text class="primaryTextLight">Create a new post</text>
      </view>
    </touchable-opacity>
    <view v-if="!isDarkTheme&&addPost">
      <Ionicons name="text" :size=20 color="ghostwhite" class="logo" />
      <text-input v-model="postText" class="addNewPostLight" placeholder="Title" :style="{borderRadius: 10, paddingHorizontal: 25}"
                :multiline="true" keyboardAppearance="light" placeholderTextColor="ghostwhite"/>
      <FontAwesome5 name="hashtag" :size=20 color="ghostwhite" class="logo" />
      <text-input v-model="tags" class="addNewPostLight" placeholder="Tags" placeholderTextColor="ghostwhite"
                  :multiline="true" keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 25}" />
      <text class="primaryTextLight">{{images.length}} {{photos}} added</text>
    <view class="postButtons">
      <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 2}" :on-press="addPostFunction" class="postButtonLight">
        <text class="postButtonTextLight">Create new post</text>
      </touchable-opacity>
      <touchable-opacity :on-press="uploadFile" class="postPhoto">
        <Ionicons name="image" :size=24 color="#555555" />
      </touchable-opacity>
    </view>
    </view>
  </view>
</template>

<script>
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import FormData from "form-data";
import {Alert} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
export default {
  data(){
    return{
      postText: "",
      images: [],
      addPost: false,
      tags: "",
      photos: "",
    }
  },
  components:{
    Ionicons,
    MaterialIcons,
    FontAwesome5
  },
  name: "AddPostBox",
  props:{
    username: String,
    isDarkTheme: Boolean
  },
  beforeUpdate(){
    if(this.images.length === 0 || this.images.length > 1){
      this.photos = "photos"
      return;
    }
    this.photos = "photo"
  },
  methods:{
    addNewPost(){
      this.addPost = true;
    },
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
      let newUri = false;
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
      if(newUri === false)
        return;
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
    addPostFunction(){
      if(this.username === ""){
        Alert.alert("Error", "Guests can not create posts",
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
.logo{
  padding-top: 7%;
  z-index: 2;
  padding-left: 6%;
}
.primaryTextDark{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 400;
  align-self: center;
  margin-bottom: 2%;
}
.primaryTextLight{
  color: #555555;
  font-size: 20px;
  font-weight: 400;
  align-self: center;
  margin-bottom: 2%;
}
.postButtons{
  flex-direction: row;
  margin-bottom: 3%;
}
.postBox{
  margin-top: 3%;
  justify-content: center;
}
.postPhoto{
  margin-top: 4%;
  margin-left: 4%;
}
.postButtonDark{
  background-color: #AAAAAA;
  height: 25px;
  margin-left: 24%;
  margin-top: 4%;
  margin-right: 8%;
  justify-content: center;
}
.postButtonLight{
  background-color: #555555;
  height: 25px;
  margin-left: 24%;
  margin-top: 4%;
  margin-right: 8%;
  justify-content: center;
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
  height: 40px;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 5%;
  margin-top: -7%;
}
.addNewPostLight{
  align-self: center;
  background-color: #555555;
  color: #969696;
  width: 90%;
  height: 40px;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 5%;
  margin-top: -7%;
}
</style>