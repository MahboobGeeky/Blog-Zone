import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block rounded-full px-5 py-2.5 text-base font-medium text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-900'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
