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
        <Camera ref="camera" :type="this.type" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
// import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
export default {
  data(){
    return{
      postText: "",
      images: [],
      hasCameraPermission: false,
      type: Camera.Constants.Type.back,
    }
  },
  async mounted(){
    const status = await Camera.requestCameraPermissionsAsync();
    this.hasCameraPermission = status.toString() === 'granted'
  },
  components:{
    Camera,
  },
  name: "AddPostBox",
  methods:{
    uploadFile(){
      const newImage = this.$refs.camera.takePictureAsync();
      alert(this.hasCameraPermission)
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