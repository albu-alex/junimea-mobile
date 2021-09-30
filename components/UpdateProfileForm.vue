<template>
<view class="updateProfile">
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="First Name"
              class="inputForm">
  </text-input>
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="Second Name"
              class="inputForm">
  </text-input>
  <text-input :autoCorrect="false"
              placeholderTextColor="ghostwhite" placeholder="Email address"
              class="inputForm">
  </text-input>
  <touchable-opacity :on-press="returnUpdatedProfile">
    <text class="sendButtonText">Send</text>
  </touchable-opacity>
</view>
</template>

<script>
export default {
  name: "UpdateProfileForm",
  methods:{
    returnUpdatedProfile(){
      //This function updated the models firstName, lastName and emailAddress in Settings.vue
      this.$emit("updateProfileFields");
    }
  }
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
  margin-bottom: 1%;
  color: ghostwhite;
  font-weight: 200;
}
.sendButtonText{
  color: #AAAAAA;
  font-weight: 200;
}
</style>