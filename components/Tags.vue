<template>
<view v-if="isDarkTheme">
  <text class="primaryTextDark">Trending</text>
  <text v-for="tag in tags" class="tagTextDark">{{tag}}</text>
</view>
<view v-else>
  <text class="primaryTextLight">Trending</text>
  <text v-for="tag in tags" class="tagTextLight">{{tag}}</text>
</view>
</template>

<script>
export default {
  name: "Tags",
  data(){
    return{
      tags: [],
    }
  },
  beforeMount(){
    //Currently just a mockup - actual version will use an API request
    this.tags.push("#sarmale")
    this.tags.push("#squid game")
    this.tags.push("#junimea")
    this.tags.push("#guie muvern")
    this.tags.push("#rezist")
  },
  props:{
    isDarkTheme: Boolean,
  }
}
</script>

<style>
.primaryTextDark{
  color: #AAAAAA;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25%;
}
.primaryTextLight{
  color: #555555;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25%;
}
.tagTextDark{
  color: #AAAAAA;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3%;
}
.tagTextLight{
  color: #555555;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3%;
}
</style>