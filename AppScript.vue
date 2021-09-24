<script>
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Settings from "./components/Settings";
export default {
  data(){
    return {
      isLoggedIn: false,
      username: "",
    }
  },
  name: "App",
  components:{
    Settings,
    MainPage,
    Login
  },
  methods:{
    verifyLogin(newUsername){
      this.isLoggedIn = true
      this.username = newUsername;
    }
  }
}
</script>