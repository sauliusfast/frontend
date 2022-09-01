import './App.css'
import { useState, useEffect } from 'react'
import mainContext from './context/mainContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import FilterPage from './pages/FilterPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import NavBar from './components/NavBar'

function App() {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {"content-type":"application/json"},
      credentials: 'include'
    }
    fetch(`http://localhost:4000/autoLogin`, options)
    .then(res => res.json())
    .then(data => {
      console.log(data.message)
      if (data.user) {
          setUser(data.user)
          setLogin(true)
      }
    })
  }, [])

  	return (
		<div className='App'>
			<mainContext.Provider value={{login, setLogin, user, setUser, users, setUsers}}>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path="/" element={<LoginPage />}/>
						{login ? <>
							<Route path="/profile" element={<ProfilePage />}/>
							<Route path="/history" element={<HistoryPage />}/>
							<Route path="/filter" element={<FilterPage />}/>
							<Route path="/users" element={<UsersPage />}/>
						</> : <>
							<Route path="/profile"/>
							<Route path="/history"/>
							<Route path="/filter"/>
							<Route path="/users"/>
						</>
						}
					</Routes>
				</BrowserRouter>
			</mainContext.Provider>
		</div>
  	);
}

export default App
