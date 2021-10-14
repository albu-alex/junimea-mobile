<template>
<view class="commentsDark" v-if="isDarkTheme">
  <view class="commentHeader">
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5}" />
    <text class="headerTextDark">user</text>
  </view>
  <text class="primaryTextDark">comment</text>
</view>
<view class="commentsLight" v-else>
  <view class="commentHeader">
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5}" />
    <text class="headerTextLight">user</text>
  </view>
  <text class="primaryTextLight">comment</text>
</view>
</template>

<script>
export default {
  name: "Comments",
  props:{
    isDarkTheme: Boolean,
  },
  async beforeMount(){
    await this.loadComments();
  },
  methods:{
    async loadComments(){
      //This post will load the comments of the post when API will be deployed
    }
  }
}
</script>

<style>
.commentsDark{
  background-color: #151515;
}
.commentsLight{
  background-color: #EAEAEA;
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
.primaryTextDark{
  color: #AAAAAA;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 1%;
}
.primaryTextLight{
  color: #555555;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 1%;
}
</style>