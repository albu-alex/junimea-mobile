import axios from 'axios'
import { Alert } from 'react-native'

export async function updateProfile(firstName, lastName, emailAddress) {
    let showLogin = false;
    await axios({
        method: 'post',
        url: `http://52.57.118.176/User/Update`,
        data: {
            "FirstName": firstName,
            "LastName": lastName,
            "Email": emailAddress
        },
        timeout: 4000
    })
    .then(function (response) {
        if (response.status === 200) {
            Alert.alert("Success", "Profile updated",
                [
                    {
                        text: "Great",
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                }
            );
        }
    })
    .catch(function () {
        showLogin = true;
    });
    if(!showLogin){
        firstName = '';
        lastName = '';
        emailAddress = '';
        return;
    }
    Alert.alert("Error", "You are not logged in",
        [
            {
                text: "Login",
                style: "cancel",
                onPress: () => alert(":(")
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
    );
}