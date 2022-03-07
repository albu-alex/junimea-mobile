import axios from 'axios';

export async function loadPost(id){
    let post;
    let loaded = false;
    await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/Get/${id}`,
        timeout: 10000
    })
    .then(function (response){
        post = response.data;
        delete post.id
    })
    .catch(function(){
        loaded = false;
    });
    return post;
}