import { createContext, useReducer } from 'react'
import GithubReducer from './Githubreducer'

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_API_GITHUB
const GITHUB_TOKEN = process.env.REACT_APP_API_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

      // Get search results
      const searchUsers = async (text) => {
          setLoading()

          const params = new URLSearchParams({
              q: text,
          })

          const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
              headers: {
                  Authorization: `token ${GITHUB_TOKEN}`,
              },
          })

          const {
              items
          } = await response.json()

          dispatch({
              type: 'GET_USERS',
              payload: items,
          })
      }
    
      // Clear users from state
      const clearUsers = () => dispatch({
          type: 'CLEAR_USERS'
      })

    // set loading
    const setLoading = () => dispatch({type: 'SET_loading'});

    return (
        <GithubContext.Provider value={{
            users: state.users, loading: state.loading, searchUsers, clearUsers
        }}>{children}</GithubContext.Provider>
    )
}


export default GithubContext;
