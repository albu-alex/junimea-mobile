<!--This component is going to be used to search for posts by the tags that the post has-->
<template>
<view v-if="isDarkTheme">
  <text>dark</text>
</view>
<view v-else>
  <text>light</text>
</view>
</template>

<script>
export default {
  name: "Search",
  props:{
    isDarkTheme: Boolean,
  }
}
</script>

<style>

</style>