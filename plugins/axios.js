export default function ({ $axios, redirect }) {
    $axios.setHeader('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3cyIsInN1YiI6InNob3BfYXBwIiwiYXVkIjoibW9iaWxlIiwianRpIjoiYWJjZGVmZzEyMzQ1NiIsInVzZXJfaWQiOjgsImlhdCI6MTU3NTM2NjA0MiwiZXhwIjoxNTc1MzY2MDcyfQ.GbTTze9myU-8W26hRxkfXxZJuYlft2jywejFGqHNx9g")
    $axios.onRequest(config => {
        // console.log(config)
        // console.log('Making request to ' + config.url)
    })

    $axios.onResponse(response => {
        // console.log('Making request to ' + response)
        // console.log(response)
        if (response.status === 200) {
            return Promise.resolve(response.data)
        }
        return Promise.resolve(response)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}