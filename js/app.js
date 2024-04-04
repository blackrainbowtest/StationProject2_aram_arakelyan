export function connectAPI(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => err)
}