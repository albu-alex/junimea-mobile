<template>
  <view class="noConnection">
    <AntDesign v-if="isDarkTheme" name="wifi" :size=40 color="#AAAAAA" />
    <AntDesign v-else name="wifi" :size=40 color="#555555" />
    <text :class="{ mainTextDark: (isDarkTheme), mainTextLight: (!isDarkTheme)}">You are not connected to the internet!</text>
  </view>
</template>

<script>
import { AntDesign } from '@expo/vector-icons';
export default {
  name: "NoConnection",
  props:{
    isDarkTheme: Boolean,
  },
  components:{
    AntDesign
  }
}
</script>

<style>
.noConnection{
  justify-content: center;
  align-items: center;
  align-self: center;
}
.mainTextDark{
  color: #AAAAAA;
  font-size: 30px;
  font-weight: 600;
}
.mainTextLight{
  color: #555555;
  font-size: 30px;
  font-weight: 600;
}
</style>