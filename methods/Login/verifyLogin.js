import axios from 'axios';
import { Alert } from 'react-native';

export async function verifyLogin(username, password, navigation){
    let loggedIn = false;
    let shownPassword = false;
    let userToken;
    await axios({
        method: 'post',
        url: 'http://52.57.118.176/Auth/Login',
        data:{
            "UserNameOrEmail" : username,
            "Password" : password,
            "RememberMe" : false
        },
        timeout: 4000
    })
    .then(function(response){
        if(response.data.statusCode === 200) {
            loggedIn = true;
            userToken = response.data.token
        }
        else {
            shownPassword = true;
            Alert.alert(response.data.message, "Wrong username or password",
                [
                    {
                        text: "Try again",
                        style: "cancel",
                    },
                    {
                        text: "Register",
                        style: "register",
                        onPress: () => this.registeredUser = false,
                    }
                ],
                {
                    cancelable: true,
                }
            );
        }
    })
    .catch(function (error){
        if(error.response){
            Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
                [
                    {
                        text: "Try again",
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                }
            );
        }
    });
    if(loggedIn) {
        navigation.navigate("Main");
    }
}