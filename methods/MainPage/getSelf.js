import axios from 'axios';

export async function getSelf(){
    let profilePicture;
    let username;
    let userID;
    await axios({
        method: 'get',
        url: `http://52.57.118.176/User/Self`,
        timeout: 4000
    })
    .then(function (response){
        if(response.status === 200){
            profilePicture = response.data.profilePicUrl
            username = response.data.email
            userID = response.data.id
        }
    })
    .catch(function(){
        profilePicture = "";
        username = "";
        userID = "";
    });
    return [profilePicture, username, userID];
}