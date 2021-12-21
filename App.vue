<template>
  <app-navigator></app-navigator>
</template>


<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Search from "./components/Search";
// import UserPost from "./components/UserPost";
import {
  createAppContainer,
  createSwitchNavigator,
} from "vue-native-router";

const StackNavigator = createSwitchNavigator(
    {
      MainPage: MainPage,
      Login: Login,
      Search: Search,
      // UserPost: UserPost
    },
    {
      initialRouteName: 'MainPage',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components:{
    AppNavigator
  },
  name: "App",
}
</script>


<style>
.container {
  background-color: #252525;
  flex: 1;
  flex-direction: row;
}
</style>
