<!--This component is going to be used to search for posts by the tags that the post has-->
<template>
<view class="searchDark" v-if="isDarkTheme">
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="ghostwhite"
                placeholder="Search Junimea" v-model="searchText" class="textInputDark"
                keyboardAppearance="dark"></text-input>
    <touchable-opacity :on-press="cancelSearch">
      <text class="primaryTextDark">Cancel</text>
    </touchable-opacity>
  </view>
</view>
<view class="searchLight" v-else>
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="black"
                placeholder="Search Junimea" v-model="searchText" class="textInputLight"
                keyboardAppearance="light"></text-input>
    <touchable-opacity :on-press="cancelSearch">
      <text class="primaryTextLight">Cancel</text>
    </touchable-opacity>
  </view>
</view>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      searchText: "",
    }
  },
  props:{
    isDarkTheme: Boolean,
  },
  methods:{
    cancelSearch(){
      this.$emit("cancelSearch");
    }
  }
}
</script>

<style>
.textInputDark{
  background-color: #505050;
  width: 75%;
  margin-bottom: 5%;
  margin-left: 5%;
  color: ghostwhite;
}
.textInputLight{
  background-color: #AFAFAF;
  width: 75%;
  margin-bottom: 5%;
  margin-left: 5%;
  color: #070700;
}
.primaryTextDark{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 500;
}
.primaryTextLight{
  color: #555555;
  font-size: 20px;
  font-weight: 500;
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