//npm import
import axios from 'axios'
import { Alert } from 'react-native'

export async function dislikePost(id) {
    await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
            "Value": -1,
            "Id": id
        },
        timeout: 4000
    })
    .then(function (response){

    })
    .catch(function(){
        Alert.alert("Error", "You are not logged in",
            [
                {
                    text: "Login",
                    style: "cancel",
                    onPress: () => alert(":)")
                },
                {
                    text: "Continue as guest",
                    style: "destructive",
                    onPress: () => alert(":(")
                }
            ],
            {
                cancelable: true,
                onDismiss: () => alert(":(")
            }
        )
    });
}