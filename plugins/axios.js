export default function ({ $axios, redirect }) {
    $axios.setHeader('Authorization', '123')
    $axios.onRequest(config => {
        console.log(config)
        console.log('Making request to ' + config.url)
    })

    $axios.onResponse(response => {
        console.log('Making request to ' + response)
        console.log(response)
        return Promise.resolve(response)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}