export default function ({ $axios, redirect }) {
    $axios.setHeader('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3cyIsInN1YiI6InNob3BfYXBwIiwiYXVkIjoibW9iaWxlIiwianRpIjoiYWJjZGVmZzEyMzQ1NiIsInVzZXJfaWQiOjEsImlhdCI6MTU3NTM4MzE4MCwiZXhwIjoxNTc1Mzg2MTgwfQ.zUz4XhPc4drYpLDu5UuxAfgl1Nyg-ZvdbhkREa2oS1I")
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