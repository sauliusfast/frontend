import { useEffect, useContext } from 'react'
import mainContext from '../context/mainContext';
import Carousel from '../components/Carousel';
const UsersPage = () => {
    const { user, setUser, users, setUsers } = useContext(mainContext)
    useEffect(()=>{
        setUsers([])
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/users`, options)
        .then(res => res.json())
        .then(data => {
            if(user) {
                data.users = data.users.filter(x=>
                    x.city===user.filterCity && 
                    x.gender===user.filterGender &&
                    x.age<=user.filterAgeMax &&
                    !user.likesGiven.includes(x._id)
                )
                setUsers(data.users)
            }
        })
    }, [])
    function pass(){
        setUsers(old => {
            old.shift()
            return [...old]
        })
    }
    function like(id){
        setUsers(old => {
            old.shift()
            return [...old]
        })
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({currentUser: users[0], loggedInUser: user}),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/like`, options)
        .then(res => res.json())
        .then(data => setUser(data.user))
    }
    return (users.length > 0 ? 
            <div className='UsersPage block page'>
                <Carousel user={users[0]} />
                <h1>{users[0].username} {users[0].age}</h1>
                <div className='buttons'>
                    <button onClick={pass}>Dislike</button>
                    <button onClick={()=>like(users[0]._id)}>Like</button>
                </div>
            </div>
            :
            <div className='UsersPage block page'>
               <h3>No more users :(</h3>
            </div>
    )
}

export default UsersPage;