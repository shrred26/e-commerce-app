export const fetchJSONData = async (...args) => {
    return fetch(...args).then((response) => {
        if (!response.ok) {
            let err = new Error("HTTP status code: " + response.status)
            err.response = response
            err.status = response.status
            throw err
        }
        return response.json();
    })
}