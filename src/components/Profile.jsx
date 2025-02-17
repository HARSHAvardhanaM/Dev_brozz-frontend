import React, { useState } from 'react'
import Edit from './Edit.jsx'
import { useSelector } from 'react-redux'


function Login() {
    const user = useSelector(state => state.user)

    return (
        user &&
        <div className='flex justify-evenly h-'>
            <Edit className="h-1.5 mt-0"  user={user}/>
            
        </div>
    )
}

export default Login