import axios from 'axios';
import { Alert } from 'react-native';

export async function verifyRegister(email ,username, password, navigation){
    let isRegistered = false;
    await axios({
        method: 'post',
        url: 'http://52.57.118.176/Auth/Register',
        data:{
            "UserName": username,
            "Email": email,
            "Password": password
        },
        timeout: 4000
    })
    .then(function (response){
        if(response.status === 200){
            isRegistered = true;
        }
    })
    .catch(function (error){
        if(error.response)
            Alert.alert("Error", "This account has already been registered",
                [
                    {
                        text: "Login",
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                }
            );
        else
            Alert.alert("Error", "Undefined behaviour",
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
    });
    if(isRegistered)
        navigation.navigate('Main')
}