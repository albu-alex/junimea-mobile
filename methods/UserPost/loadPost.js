import axios from 'axios';

export async function loadPost(id){
    // let comments;
    // let liked;
    // let files;
    // let title;
    // let username;
    // let profilePic;
    // let likes;
    // let tags;
    let post;
    let loaded = false;
    await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/Get/${id}`,
        timeout: 10000
    })
    .then(function (response){
        // comments = response.data.comments
        // liked = response.data.liked
        // files = response.data.files;
        // title = response.data.title;
        // username = response.data.userName;
        // profilePic = response.data.profilePicUrl;
        // likes = response.data.likes;
        // tags = response.data.tags;
        // loaded = true;
        post = response.data;
    })
    .catch(function(){
        loaded = false;
    });
    // this.loaded = loaded
    // if(liked){
    //     this.likeOpacity = 0.4;
    //     this.dislikeOpacity = 1;
    // }
    // else {
    //     this.likeOpacity = 1;
    //     this.dislikeOpacity = 0.4;
    // }
    return post;
}