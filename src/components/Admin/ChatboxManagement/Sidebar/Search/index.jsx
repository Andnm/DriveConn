import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../../context/authContext';
import './style.css'
import { getUserList } from '../../../../../api/user'

const Search = () => {
    const { currentToken, userDecode } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        const data = await getUserList(currentToken)
        console.log(data)
        for (const userData of data) {
            const fullName = `${userData.lastName} ${userData.firstName}`;
            if (fullName.toLowerCase().includes(username.toLowerCase())) {
                setUser(userData);
                setErr(false);
                return; 
            }
        }

        setUser(null);
        setErr(true);
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    return (
        <div className="search-sidebar">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => {setErr(false); setUsername(e.target.value)}}
                    onFocus={() => setErr(false)}
                    value={username}
                />
            </div>

            {err && <span className="error-message">User not found!</span>}
            {user && (
                <div className="userChat">
                    <img src={user?.imgURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user?.lastName + ' ' + user?.firstName}</span>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Search