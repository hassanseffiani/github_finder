import Axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_API_GITHUB
const GITHUB_TOKEN = process.env.REACT_APP_API_GITHUB_TOKEN

const github = Axios.create({
    baseURL: GITHUB_URL,
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
})

// Get search results
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text,
    })

    const response = await github.get(`search/users?${params}`)
    return response.data.items
}


// Get user and repos
export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10,
    })
    
    const [user, repos] = await Promise.all([
        github.get(`users/${login}`),
        github.get(`users/${login}/repos?${params}`)
    ])

    return { user: user.data, repos: repos.data}
}

// Get Single user
// export const GetUser = async (login) => {
//     const response = await github.get(`users/${login}`)

//     if (response.status === 404) {
//         window.location = '/notfound'
//     } else {
//         return response.data
//     }
// }

// export const getUserRepos = async (login) => {
//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10,
//     })

//     const response = await github.get(`users/${login}/repos?${params}`)
//     return response.data
// }