export function search(tags, text) {
    alert("Searching...")
    if(tags.length === 0) {
        return
    }
    const regularExpression = new RegExp(text, 'gi')
    tags.forEach((tag, index) => {
        let result = tag.match(regularExpression)
        if(result === null)
            tags.splice(index, 1)
    })
    return tags
}