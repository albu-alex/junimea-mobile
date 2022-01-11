<template>
  <view :class="{ wrapperDark: (isDarkTheme), wrapperLight: (!isDarkTheme)}" v-if="!addPost">
    <OwnStatusBar :isDarkTheme="isDarkTheme" :style="{marginBottom: '5%'}" />
    <touchable-opacity :on-press="() => navigation.navigate('MainPage', {theme: isDarkTheme})"
                       :active-opacity="0.6" :style="{alignSelf: 'flex-end', marginBottom: '20%', marginRight: '2%'}">
      <Feather v-if="isDarkTheme" name="x" :size=28 color="#AAAAAA"/>
      <Feather v-else name="x" :size=28 color="#555555"/>
    </touchable-opacity>
    <view :class="{ optionButtonDark: (isDarkTheme), optionButtonLight: (!isDarkTheme)}" v-if="!addPost">
        <touchable-opacity :on-press="uploadFile" :active-opacity="0.6" :style="{borderRadius: 10}"
                           :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
          <view :style="{flexDirection: 'row', justifyContent: 'center'}">
                <MaterialIcons v-if="isDarkTheme" :style="{alignSelf: 'center', marginBottom: 5}" name="camera" :size=32 color="#AAAAAA" />
                <MaterialIcons v-else :style="{alignSelf: 'center', marginBottom: 5}" name="camera" :size=32 color="#555555" />
                <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">Choose media from gallery</text>
          </view>
        </touchable-opacity>
    </view>
    <view :class="{ optionButtonDark: (isDarkTheme), optionButtonLight: (!isDarkTheme)}" v-if="!addPost">
      <touchable-opacity :on-press="takePicture" :active-opacity="0.6" :style="{borderRadius: 10}"
                         :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <Ionicons v-if="isDarkTheme" :style="{alignSelf: 'center', marginBottom: 5}" name="ios-camera" :size=32 color="#AAAAAA" />
          <Ionicons v-else :style="{alignSelf: 'center', marginBottom: 5}" name="ios-camera" :size=32 color="#555555" />
          <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">Take a picture</text>
        </view>
      </touchable-opacity>
    </view>
    <view :class="{ optionButtonDark: (isDarkTheme), optionButtonLight: (!isDarkTheme)}" v-if="!addPost">
      <touchable-opacity :on-press="shareLink" :active-opacity="0.6" :style="{borderRadius: 10}"
                         :class="{ buttonDark: (isDarkTheme), buttonLight: (!isDarkTheme)}">
        <view :style="{flexDirection: 'row', justifyContent: 'center'}">
          <FontAwesome5 v-if="isDarkTheme" :style="{alignSelf: 'center', marginBottom: 5}" name="link" :size=32 color="#AAAAAA" />
          <FontAwesome5 v-else :style="{alignSelf: 'center', marginBottom: 5}" name="link" :size=32 color="#555555" />
          <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">Copy a picture URL</text>
        </view>
      </touchable-opacity>
    </view>
    <text v-if="photos.length > 0" :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}" :style="{marginTop: '7%'}">
      {{images.length}} {{photos}} added
    </text>
  </view>
  <view v-else>
    <view :style="{flexDirection: 'row'}">
      <Ionicons v-if="operatingSystem === 'ios'&&isDarkTheme" name="text" :size=20 color="#AAAAAA" class="logo" />
      <Ionicons v-else-if="operatingSystem === 'ios'&&!isDarkTheme" name="text" :size=20 color="#555555" class="logo" />
      <Ionicons v-else-if="operatingSystem === 'android'&&isDarkTheme" name="text" :size=20 color="#AAAAAA" class="logoAndroid" />
      <Ionicons v-else name="text" :size=20 color="#555555" class="logoAndroid" />
      <text-input v-model="postText" class="addNewPost" placeholder="Title" v-if="isDarkTheme" placeholderTextColor="#AAAAAA"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 25}" />
      <text-input v-model="postText" class="addNewPost" placeholder="Title" v-else placeholderTextColor="#555555"
                  :multiline="true" keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 25}" />
    </view>
    <view :style="{flexDirection: 'row'}">
      <FontAwesome5 v-if="operatingSystem === 'ios'&&isDarkTheme" name="hashtag" :size=20 color="#AAAAAA" class="logo" />
      <FontAwesome5 v-else-if="operatingSystem === 'ios'&&!isDarkTheme" name="hashtag" :size=20 color="#555555" class="logo" />
      <FontAwesome5 v-else-if="operatingSystem === 'android'&&isDarkTheme" name="hashtag" :size=20 color="#AAAAAA" class="logoAndroid" />
      <FontAwesome5 v-else name="hashtag" :size=20 color="#555555" class="logoAndroid" />
      <text-input v-model="tags" class="addNewPost" placeholder="Tag1, tag2...(optional)" v-if="isDarkTheme" placeholderTextColor="#AAAAAA"
                  :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 25}" />
      <text-input v-model="tags" class="addNewPost" placeholder="Tag1, tag2...(optional)" v-else placeholderTextColor="#555555"
                  :multiline="true" keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 25}" />
    </view>
    <text :class="{ primaryTextDark: (isDarkTheme), primaryTextLight: (!isDarkTheme)}">{{images.length}} {{photos}} added</text>
    <view class="postButtons">
      <touchable-opacity :style="{borderRadius: 10, paddingHorizontal: 2}" :on-press="addPostFunction" :class="{ postButtonDark: (isDarkTheme), postButtonLight: (!isDarkTheme)}">
        <text :class="{ postButtonTextDark: (isDarkTheme), postButtonTextLight: (!isDarkTheme)}">Create new post</text>
      </touchable-opacity>
      <touchable-opacity :on-press="uploadFile" class="postPhoto">
        <Ionicons v-if="isDarkTheme" name="image" :size=24 color="#AAAAAA" />
        <Ionicons v-else name="image" :size=24 color="#555555" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import FormData from "form-data";
import {Alert, Platform} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import OwnStatusBar from "./StatusBar";
export default {
  data(){
    return{
      postText: "",
      images: [],
      addPost: false,
      tags: "",
      tagsList: [],
      photos: "",
      operatingSystem: "",
      addTags: true,
      isDarkTheme: this.navigation.getParam('theme')
    }
  },
  components:{
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    Feather,
    OwnStatusBar
  },
  name: "AddPost",
  props:{
    username: String,
    navigation:{
      type: Object
    }
  },
  beforeMount(){
    this.operatingSystem = Platform.OS;
  },
  beforeUpdate(){
    if(this.images.length === 0 || this.images.length > 1){
      this.photos = "photos"
      return;
    }
    this.photos = "photo"
  },
  methods:{
    doNotAddTags(){
      this.addTags = false;
      this.sendPost();
    },
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
    async takePicture(){
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
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync();
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
    shareLink(){
      alert("Function coming soon!")
    },
    sendPost(){
      if(this.tags)
        this.tagsList = this.tags.split(",")
      let post = {
        text: this.postText,
        images: this.images,
        tags: this.tagsList
      }
      this.$emit('addPost', post);
      this.postText = "";
      this.images = [];
      this.tags = ""
      this.tagsList = [];
      this.addTags = true;
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
      }
      if(!this.postText){
        alert("Post text is required!");
        return;
      }
      if(!this.tags)
        Alert.alert("No tags detected", "Post with tags get recommended more!",
            [
              {
                text: "Add tags",
                style: "cancel",
              },
              {
                text: "Don't bother me",
                style: "destructive",
                onPress: this.doNotAddTags
              }
            ],
            {
              cancelable: true,
            }
        );
      if(this.tags || !this.addTags) {
        this.sendPost();
      }
    }
  }
}
</script>

<style>
.logo{
  padding-top: 1%;
  z-index: 2;
  padding-left: 6%;
}
.logoAndroid{
  padding-top: 2%;
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
.optionButtonDark{
  margin-top: 5%;
  justify-content: center;
  align-items: center;
  background-color: #252525;
}
.optionButtonLight{
  margin-top: 5%;
  justify-content: center;
  align-items: center;
  background-color: #DADADA;
}
.wrapperDark{
  flex: 1;
  background-color: #252525;
}
.wrapperLight{
  flex: 1;
  background-color: #DADADA;
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
.buttonDark{
  justify-content: center;
  border-width: 2px;
  border-color: #353535;
  width: 80%;
}
.postButtonLight{
  background-color: #555555;
  height: 25px;
  margin-left: 24%;
  margin-top: 4%;
  margin-right: 8%;
  justify-content: center;
}
.buttonLight{
  justify-content: center;
  border-width: 2px;
  border-color: #EAEAEA;
  width: 80%;
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
.addNewPost{
  align-self: center;
  background-color: ghostwhite;
  color: dimgrey;
  width: 90%;
  height: 40px;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 5%;
  margin-left: -6%;
}
</style>