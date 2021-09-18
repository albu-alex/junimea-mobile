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
<!--    <text v-for="image in images">-->
<!--      <Image :source="{uri: String(image)}" :style="{width: 600, height:300}" />-->
<!--    </text>-->
  </view>
</template>

<script>
import * as ImagePicker from 'expo-image-picker';
export default {
  data(){
    return{
      postText: "",
      images: [],
    }
  },
  name: "AddPostBox",
  methods:{
    async uploadFile(){
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      let newImage = pickerResult.uri
      if(newImage != null)
        this.images.push(newImage)
      alert(pickerResult.uri);
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