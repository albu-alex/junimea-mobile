<!--This component takes care of the loading animation-->
<template>
  <view class="parent-container" >
    <view class="container">
      <animated:view
          class="animated-view-style"
          :style="{
          marginBottom: movingMargin,
          backgroundColor: 'ghostwhite',
        }"
      />
      <animated:view
          class="animated-view-style"
          :style="{
          marginBottom: movingMargin1,
          backgroundColor: 'dimgrey',
        }"
      />
      <animated:view
          class="animated-view-style"
          :style="{
          marginBottom: movingMargin2,
          backgroundColor: 'ghostwhite',
        }"
      />
      <animated:view
          class="animated-view-style"
          :style="{
          marginBottom: movingMargin3,
          backgroundColor: 'dimgrey',
        }"
      />
    </view>
  </view>
</template>

<script>
import { Animated, Easing } from "react-native";
export default {
  name: "Loading",
  data(){
    return{
      animatedValue: 0,
      movingMargin: 0,
      animatedValue1: 0,
      movingMargin1: 0,
      animatedValue2: 0,
      movingMargin2: 0,
      animatedValue3: 0,
      movingMargin3: 0
    }
  },
  created(){
    this.animatedValue = new Animated.Value(0);
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
  },
  beforeMount(){
    this.animate();
  },
  methods:{
    animate(){
      this.animatedValue.setValue(0);
      this.animatedValue1.setValue(0);
      this.animatedValue2.setValue(0);
      this.animatedValue3.setValue(0);

      Animated.stagger(100, [
        Animated.timing(this.animatedValue3, {
          toValue: 2,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: false
        }),

        Animated.timing(this.animatedValue2, {
          toValue: 2,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: false
        }),

        Animated.timing(this.animatedValue1, {
          toValue: 2,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(this.animatedValue, {
          toValue: 2,
          duration: this.duration,
          easing: Easing.linear,
          useNativeDriver: false
        })
      ]).start(event => {
        if (event.finished) {
          this.animate();
        }
      });
      this.movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [0, 200, 0, 200, 0]
      });
      this.movingMargin1 = this.animatedValue1.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [0, 200, 0, 200, 0]
      });
      this.movingMargin2 = this.animatedValue2.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [0, 200, 0, 200, 0]
      });
      this.movingMargin3 = this.animatedValue3.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2],
        outputRange: [0, 200, 0, 200, 0]
      });
    }
  }
}
</script>

<style>
.animated-view-style{
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
.container{
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  height: 300px;
}
.parent-container{
  flex-direction: column;
  justify-content: center;
}
</style>