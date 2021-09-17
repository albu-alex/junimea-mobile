<!--Component displays all the settings that the user can access-->
<!--Contains a greeting message with the username and all of the options that the user is allowed to access-->
<template>
  <view class="settings">
    <text class="textPrimary">Hello, {{newUsername}}!</text>
    <view class="settingsTab">
      <touchable-opacity :on-press="logout">
        <text class="textSecondary">Logout</text>
      </touchable-opacity>
      <touchable-opacity :on-press="changeViewMode">
        <text class="textSecondary">Change view mode</text>
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
export default {
  name: "Settings",
  props:{
    newUsername: String
  },
  methods:{
    //This function emits a method in which the user is taken back to the login component
    logout(){
      this.$emit("Logout");
    },
    changeViewMode(){
      alert("New feature coming soon!");
    }
  }
}
</script>

<style>
.settings{
  background-color: #252525;
}
.settingsTab{
  flex-direction: row;
  justify-content: space-between;
}
.textSecondary{
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 200;
}
.textPrimary {
  color: #AAAAAA;
  font-size: 14px;
  font-weight: 500;
  align-self: center;
  margin-bottom: 10px;
}
</style>