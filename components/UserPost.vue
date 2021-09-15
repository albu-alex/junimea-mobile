<template>
  <view class="post">
    <text>{{userPostText}}</text>
  </view>
</template>

<script>
export default {
  name: "UserPost",
  props:{
    userPostText: String
  }
}
</script>

<style>

</style>