import { useRef, useState, useContext } from 'react'
import mainContext from '../context/mainContext';
const FilterPage = () => {
    const { user, setUser } = useContext(mainContext)
    const city = useRef()
    const ageMax = useRef()
    const gender = useRef()
    const [ageOut, setAgeOut] = useState(user.filterAgeMax)
    function saveFilter(){
        const filter = {
            ageMax: ageMax.current.value,
            gender: gender.current.value,
            city: city.current.value,
            user
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(filter),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/filter`, options)
        .then(res => res.json())
        .then(data => setUser(data.user))
    }
    return (
        <div className='FilterPage block page'>
            <select ref={city} defaultValue={user.filterCity}>
                {['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Utena', 'Marijampolė', 'Telšiai', 'Alytus', 'Tauragė'].map((x, i) => <option key={i} value={x}>{x}</option> )}
            </select>
            <select ref={gender} defaultValue={user.filterGender}>
                {['male', 'female'].map((x, i) => <option key={i} value={x}>{x}</option> )}
            </select>
                <span>18</span>
                <input 
                    ref={ageMax} min='18' max='50' type='range'
                    step='1'
                    defaultValue={user.filterAgeMax}
                    onInput={()=> setAgeOut(ageMax.current.value)}
                />
                <span>{ageOut}</span>
            <button onClick={saveFilter}>Save Filter</button>
        </div>
    )
}
export default FilterPage;