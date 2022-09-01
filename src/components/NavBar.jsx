import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import mainContext from '../context/mainContext';
const NavBar = () => {
    const { login, setLogin, user, setUser, setUsers } = useContext(mainContext)
    const nav = useNavigate();
    function logout(){
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch(`http://localhost:4000/logout`, options)
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            setLogin(false)
            setUser(null)
            setUsers([])
            nav('/')
        })
    }
    return (
        <div className='NavBar block'>
            {login ? <h1 onClick={logout}>Logout</h1> : <h1 onClick={()=>nav('/')}>Login</h1>}
            {login && <h1 onClick={()=>nav('/profile')}>Profile</h1>}
            {login && 
                <>
                    {user.images.length >= 2 ?
                        <>
                            <h1 onClick={()=>nav('/users')}>Users</h1>
                            <h1 onClick={()=>nav('/filter')}>Filter</h1>
                            <h1 onClick={()=>nav('/history')}>History</h1>
                        </> :
                        <div>
                            <h3>Upload images</h3>
                            <h3>unlock functionality!</h3>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default NavBar;