import { useEffect, useState, useContext } from 'react'
import mainContext from '../context/mainContext'
import Carousel from '../components/Carousel';
const HistoryPage = () => {
    const [select, setSelect] = useState('likesGiven')
    const { user, users, setUsers } = useContext(mainContext)
    useEffect(() => {
        setUsers([])
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({list: user[select]}),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/history`, options)
        .then(res => res.json())
        .then(data => setUsers([...data.users]))
    }, [select])
    return (
        <div className='HistoryPage block page'>
            <div className='links'>
                <h3 className='link' onClick={()=>setSelect('likesGiven')} style={select==='likesGiven' ? {textDecoration: 'underline'} : {}}>People I liked ({user.likesGiven.length})</h3>
                <h3 className='link' onClick={()=>setSelect('likesGot')} style={select==='likesGot' ? {textDecoration: 'underline'} : {}}>People who liked me ({user.likesGot.length})</h3>
            </div>
            <div className='list'>
                {users.map((x, i)=>
                    <div className='user' key={i}>
                        <h3>{x.username} {x.age}</h3>
                        <Carousel user={x}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;