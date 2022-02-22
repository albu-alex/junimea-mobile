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
            posts.push({id: response.data[i].id,
                        userId: response.data[i].userId})
    })
    .catch(function(){
        posts = []
    })
    posts.sort((a, b) => a.id - b.id);
    return posts
}