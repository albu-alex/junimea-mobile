<!--This component is going to be used to search for posts by the tags that the post has-->
<template>
<view class="searchDark" v-if="isDarkTheme">
  <OwnStatusBar :isDarkTheme="isDarkTheme"/>
  <view class="searchHeader">
    <Ionicons :style="{paddingLeft: 15, zIndex: 2, paddingTop: 5}" name="ios-search-outline" :size=24 color="ghostwhite" />
    <text-input :autoCorrect="false" placeholderTextColor="ghostwhite" :style="{paddingTop: 10, borderRadius: 10, paddingHorizontal: 25, marginLeft: -30}"
                placeholder="Search Junimea" v-model="searchText" class="textInputDark"
                keyboardAppearance="dark" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :style="{borderRadius: 10}" :on-press="cancelSearch">
      <text class="buttonTextDark">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextDark">
    Trending
  </text>
  <scroll-view v-if="tags.length > 0">
    <text v-for="tag in tags" class="tagsDark">
      <touchable-opacity>
        <text class="tagsDark">{{tag}}</text>
      </touchable-opacity>
    </text>
  </scroll-view>
  <scroll-view v-else>
    <MaterialIcons class="icon" name="do-not-touch" :size=54 color="#AAAAAA" />
    <text class="tagsDark">Your search did not provide any results!</text>
  </scroll-view>
</view>
<view class="searchLight" v-else>
  <OwnStatusBar :isDarkTheme="isDarkTheme"/>
  <view class="searchHeader">
    <Ionicons :style="{paddingLeft: 15, zIndex: 2, paddingTop: 5}" name="ios-search-outline" :size=24 color="black" />
    <text-input :autoCorrect="false" placeholderTextColor="black" :style="{paddingTop: 10, borderRadius: 10, paddingHorizontal: 25, marginLeft: -30}"
                placeholder="Search Junimea" v-model="searchText" class="textInputLight"
                keyboardAppearance="light" :onKeyPress="search" :multiline="true"></text-input>
    <touchable-opacity :style="{borderRadius: 10}" :on-press="cancelSearch">
      <text class="buttonTextLight">Cancel</text>
    </touchable-opacity>
  </view>
  <text class="primaryTextLight">
    Trending
  </text>
  <scroll-view v-if="tags.length > 0">
    <text v-for="tag in tags" class="tagsLight">
      <touchable-opacity>
        <text class="tagsLight">{{tag}}</text>
      </touchable-opacity>
    </text>
  </scroll-view>
  <scroll-view v-else>
    <MaterialIcons class="icon" name="do-not-touch" :size=54 color="#555555" />
    <text class="tagsLight">Your search did not provide any results!</text>
  </scroll-view>
</view>
</template>

<script>
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import OwnStatusBar from "./StatusBar"
export default {
  name: "Search",
  data(){
    return{
      searchText: "",
      tags: [],
      isDarkTheme: this.navigation.getParam('theme')
    }
  },
  props:{
    navigation: {
      type: Object
    }
  },
  components:{
    MaterialIcons,
    Ionicons,
    OwnStatusBar
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
    if(this.tags.length === 0){
      return;
    }
    let regularExpression = new RegExp(this.searchText, 'gi')
    for(let i=0;i<this.tags.length;i++){
      let result = this.tags[i].match(regularExpression)
      if(result === null)
        this.tags.splice(i, 1)
    }
    //Need to reload the tags array with the tags when API is done
  },
  methods:{
    cancelSearch(){
      this.navigation.navigate("MainPage", {theme: this.isDarkTheme});
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
.icon{
  justify-content: center;
  align-self: center;
  margin-top: 35%;
}
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
  flex: 1;
}
.searchLight{
  background-color: #DADADA;
  flex: 1;
}
</style>