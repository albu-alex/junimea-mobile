<template>
<view class="updateProfile">
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              class="inputForm">
  </text-input>
</view>
</template>

<script>
export default {
  name: "UpdateProfileForm"
}
</script>

<style>
.updateProfile{
  background-color: #252525;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.inputForm{
  background-color: #505050;
  width: 90%;
  height: 5%;
  margin-bottom: 5%;
}
</style>