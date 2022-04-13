export async function createPost(title, tags, images) {
    let tagsList = []
    if(tags) {
        tagsList = tags.split(",")
    }
    const post = {
        "Title": title,
        "Files": images,
        "Tags": tagsList
    }
    await fetch('http://52.57.118.176/Post/Add', {
        method: 'POST',
        body: post
    })
    .then(function(response) {
        if(response.status === 200)
            return true
    })
    .catch(function() {
        return false
    })
}