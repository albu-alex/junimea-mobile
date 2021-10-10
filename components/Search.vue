<!--This component is going to be used to search for posts by the tags that the post has-->
<template>
<view class="searchDark" v-if="isDarkTheme">
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="ghostwhite"
                placeholder="Search Junimea" v-model="searchText" class="textInputDark"
                keyboardAppearance="dark" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :on-press="cancelSearch">
      <text class="buttonTextDark">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextDark">
    Trending
  </text>
</view>
<view class="searchLight" v-else>
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="black"
                placeholder="Search Junimea" v-model="searchText" class="textInputLight"
                keyboardAppearance="light" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :on-press="cancelSearch">
      <text class="buttonTextLight">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextLight">
    Trending
  </text>
</view>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      searchText: "",
      tags: []
    }
  },
  props:{
    isDarkTheme: Boolean,
  },
  methods:{
    cancelSearch(){
      this.$emit("cancelSearch");
    },
    search({ nativeEvent: { key: keyValue } }){
      if(keyValue === 'Enter'){
        alert("Searching...")
        this.searchText = "";
      }
    }
  }
}
</script>

<style>
.textInputDark{
  background-color: #505050;
  width: 75%;
  height: 100%;
  margin-bottom: 5%;
  margin-left: 3%;
  color: ghostwhite;
}
.textInputLight{
  background-color: #AFAFAF;
  width: 75%;
  height: 100%;
  margin-bottom: 5%;
  margin-left: 3%;
  color: #070700;
}
.primaryTextDark{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 700;
  margin-left: 2%;
}
.primaryTextLight{
  color: #555555;
  font-size: 24px;
  font-weight: 700;
  margin-left: 2%;
}
.buttonTextDark{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
  margin-top: 7%;
  margin-right: 3%;
}
.buttonTextLight{
  color: #555555;
  font-size: 20px;
  font-weight: 500;
  margin-top: 7%;
  margin-right: 3%;
}
.searchHeader{
  margin-top: 5%;
  flex-direction: row;
  justify-content: space-between;
}
.searchDark{
  background-color: #252525;
}
.searchLight{
  background-color: #DADADA;
}
</style>