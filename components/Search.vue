<!--This component is going to be used to search for posts by the tags that the post has-->
<template>
<view class="searchDark" v-if="isDarkTheme">
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="ghostwhite" :style="{borderRadius: 10, paddingHorizontal: 7}"
                placeholder="Search Junimea" v-model="searchText" class="textInputDark"
                keyboardAppearance="dark" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :style="{borderRadius: 10}" :on-press="cancelSearch">
      <text class="buttonTextDark">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextDark">
    Trending
  </text>
  <scroll-view>
    <text v-for="tag in tags" class="tagsDark">
      <touchable-opacity>
        <text class="tagsDark">{{tag}}</text>
      </touchable-opacity>
    </text>
  </scroll-view>
</view>
<view class="searchLight" v-else>
  <view class="searchHeader">
    <text-input :autoCorrect="false" placeholderTextColor="black" :style="{borderRadius: 10, paddingHorizontal: 7}"
                placeholder="Search Junimea" v-model="searchText" class="textInputLight"
                keyboardAppearance="light" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :style="{borderRadius: 10}" :on-press="cancelSearch">
      <text class="buttonTextLight">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextLight">
    Trending
  </text>
  <scroll-view>
    <text v-for="tag in tags" class="tagsLight">
      <touchable-opacity>
        <text class="tagsLight">{{tag}}</text>
      </touchable-opacity>
    </text>
  </scroll-view>
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
  beforeMount(){
    //Currently just a mockup - actual version will use an API request
    this.tags.push("#sarmale")
    this.tags.push("#squid game")
    this.tags.push("#junimea")
    this.tags.push("#guie muvern")
  },
  //This lifecycle hook is used to match search string with the tags
  beforeUpdate(){
    let regularExpression = new RegExp(this.searchText, 'gi')
    for(let i=0;i<this.tags.length;i++){
      let result = this.tags[i].match(regularExpression)
      if(result === null)
        this.tags.splice(i, 1)
    }
    //Need to reload the tags array with the tags when API is dontag
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
.tagsDark{
  color: #AAAAAA;
  font-size: 20px;
  font-weight: 400;
  margin-left: 5%;
  margin-top: 2%;
}
.tagsLight{
  color: #555555;
  font-size: 20px;
  font-weight: 400;
  margin-left: 5%;
  margin-top: 2%;
}
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
  margin-top: 9%;
  margin-right: 3%;
}
.buttonTextLight{
  color: #555555;
  font-size: 20px;
  font-weight: 500;
  margin-top: 9%;
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