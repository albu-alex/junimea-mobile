//npm import
import axios from 'axios'
import { Alert } from 'react-native'

export async function likePost(id) {
    await axios({
        method: 'post',
        url: `http://52.57.118.176/Post/Like`,
        data:{
            "Value": 1,
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
                    text: "Like",
                    style: "cancel",
                    onPress: () => alert("Guest likes coming soon!")
                }
            ],
            {
                cancelable: true,
                onDismiss: () => alert(":(")
            }
        )
    });
}