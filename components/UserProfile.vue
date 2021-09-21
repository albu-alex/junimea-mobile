<template>
  <view class="profile">
    <text>{{username}}</text>
  </view>
</template>

<script>
export default {
  name: "UserProfile",
  props:{
    username: String
  }
}
</script>

<style>

</style>