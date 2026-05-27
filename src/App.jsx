import { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import "./App.css";
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice";
import {Header, Footer} from './components/index'
import { Outlet } from "react-router-dom";
import { client } from "./lib/appwrite";


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    client.ping()
      .then(() => console.log("Appwrite ping successful"))
      .catch((error) => console.log("Appwrite ping failed", error))

    authService.getCurrentUser()
      .then((userData)=> {
        if(userData){
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        } 
      })
      .finally(() => setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-transparent">
      <div className="w-full block">
        <Header/>
        <main className="min-h-[calc(100vh-220px)] py-8">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App;
