import { useEffect, useState } from "react"
import Spinner from '../Layout/Spinner'

const UserLists = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoding] = useState(true);
    useEffect(() => {
        userFetch();
    }, [])
    const userFetch = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_GITHUB}/users`,
            {
                headers: { Authorization: `token ${process.env.REACT_APP_API_GITHUB_TOKEN}` }
            }
        )
        const data = await response.json();
        setUsers(data);
        setLoding(false)
    }
    if (!loading) {

        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">{users.map((user, key) => {
                return (
                    <h3 key={key}>{user.login}</h3>
                )
            })}</div>
        )
    } else {
        return <Spinner />
    }
}

export default UserLists