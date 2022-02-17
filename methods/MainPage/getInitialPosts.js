import axios from 'axios'

export async function getInitialPosts(postNumber){
    let posts = []
    let noConnection = false
    await axios({
        method: 'get',
        url: `http://52.57.118.176/Post/List/${postNumber}`,
        timeout: 10000
    })
    .then(function(response){
        for(let i=0;i<response.data.length;i++)
            posts.push(response.data[i].id)
    })
    .catch(function(){
        posts = []
    })
    return posts
}