import axios from 'axios';
import { Alert } from 'react-native'

export async function createNewComment(commentText, id, images){
    await axios({
        method: 'post',
        url: `http://52.57.118.176/Comment/Add`,
        data:{
            "Text": commentText,
            "PostId": id,
            "Files": images
        },
        timeout: 5000
    })
    .then(function (response){
        if(response.status === 200){
            alert("Comment created successfully")
        }
    })
    .catch(function(){
        Alert.alert("Error", "You are not logged in",
            [
                {
                    text: "Login",
                    style: "cancel",
                    onPress: () => {
                        Alert.alert("Logout", "In order to post a comment",
                            [
                                {
                                    text: "Settings -> Logout",
                                    style: "destructive"
                                }
                            ],
                            {
                                cancelable: true,
                                onDismiss: () => alert(":(")
                            }
                        )
                    }
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