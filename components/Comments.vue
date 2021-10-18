<template>
<view class="commentsDark" v-if="isDarkTheme">
  <view class="commentHeader">
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5}" />
    <text class="headerTextDark">user</text>
    <touchable-opacity :on-press="report">
      <Image :source="require('../assets/three-dots.png')"
             :style="{width: 20, height:10, marginTop: 5}" class="reportComment" />
    </touchable-opacity>
  </view>
  <text :style="{marginLeft: 5}" class="primaryTextDark">comment</text>
  <view class="commentInteraction">
    <touchable-opacity :style="{marginLeft: 5, marginRight: 50}" :activeOpacity="1" :on-press="likeComment">
      <text class="secondaryTextDark">Like</text>
    </touchable-opacity>
    <touchable-opacity :activeOpacity="1" :on-press="replyToComment">
      <text class="secondaryTextDark">Reply</text>
    </touchable-opacity>
  </view>
  <text-input v-model="commentText" class="addNewCommentDark" placeholder="Reply..." placeholderTextColor="dimgrey"
              :multiline="true" keyboardAppearance="dark" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft:5}"/>
</view>
<view class="commentsLight" v-else>
  <view class="commentHeader">
    <Image :source="{uri: 'https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png'}"
           :style="{width: 20, height:20, borderRadius: 50, marginRight: 5}" />
    <text class="headerTextLight">user</text>
    <touchable-opacity :on-press="report">
      <Image :source="require('../assets/three-dots.png')"
             :style="{width: 20, height:10, marginTop: 5}" class="reportComment" />
    </touchable-opacity>
  </view>
  <text :style="{marginLeft: 5}" class="primaryTextLight">comment</text>
  <view class="commentInteraction">
    <touchable-opacity :style="{marginLeft: 5, marginRight: 50}" :activeOpacity="1" :on-press="likeComment">
      <text class="secondaryTextLight">Like</text>
    </touchable-opacity>
    <touchable-opacity :activeOpacity="1" :on-press="replyToComment">
      <text class="secondaryTextLight">Reply</text>
    </touchable-opacity>
  </view>
  <text-input v-model="commentText" class="addNewCommentLight" placeholder="Reply..."
              :multiline="true" keyboardAppearance="light" :style="{borderRadius: 10, paddingHorizontal: 7, marginLeft: 5}" />
</view>
</template>

<script>
export default {
  name: "Comments",
  props:{
    isDarkTheme: Boolean,
  },
  data(){
    return{
      commentText: ""
    }
  },
  async beforeMount(){
    await this.loadComments();
  },
  methods:{
    async loadComments(){
      //This post will load the comments of the post when API will be deployed
    },
    report(){
      alert("Not yet available");
    },
    likeComment(){
      alert("Like not available yet")
    },
    replyToComment(){
      alert("Reply not available yet")
    }
  }
}
</script>

<style>
.commentInteraction{
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 4%;
}
.addNewCommentLight{
  align-self: flex-start;
  background-color: #DADADA;
  color: #969696;
  width: 60%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
}
.addNewCommentDark{
  align-self: flex-start;
  background-color: #252525;
  color: dimgrey;
  width: 60%;
  height: 25px;
  font-weight: 500;
  font-size: 14px;
}
.reportComment{
  margin-left: 85%;
}
.commentsDark{
  background-color: #151515;
  border-width: 1px;
  border-color: #252525;
}
.commentsLight{
  background-color: #EAEAEA;
  border-width: 1px;
  border-color: #DADADA;
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
.secondaryTextDark{
  color: #AAAAAA;
  font-size: 12px;
  font-weight: 600;
}
.primaryTextDark{
  color: #AAAAAA;
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 2%;
}
.primaryTextLight{
  color: #555555;
  font-size: 16px;
  font-weight: 200;
  margin-bottom: 2%;
}
</style>