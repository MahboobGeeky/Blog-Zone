import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '100px'}) {
    return (
        <div style={{width}}>
            <img
            src={logo}
            alt="Logo"
            className='h-full w-full rounded-full object-cover ring-2 ring-white/80 shadow-sm'
            />
        </div>
    )
}

export default Logo

