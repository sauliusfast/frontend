import { useContext, useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import Carousel from '../components/Carousel'
const ProfilePage = () => {
    const img = useRef()
    const [error, setError] = useState();
    const { user, setUser } = useContext(mainContext)
    function upload(){
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({image:img.current.value, user}),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/upload`, options)
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setError(data.message)
                setUser(data.user)
            } else {
                setError(data.message)
            }
            img.current.value = ''
        })
    }
    return (
        <div className='ProfilePage'>
            <Carousel user={user}/>
            <input ref={img} type='text' placeholder='image url'/>
            <button onClick={upload} >Upload</button>
            <h1>{error}</h1>
        </div>
    );
};

export default ProfilePage;