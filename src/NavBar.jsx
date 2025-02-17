import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_URL } from './redux/constants';
import { removeUser } from './redux/authSlice';
import { removeConnections } from './redux/connectionSlice';

function NavBar() {
  const user  = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      await axios.post(`${SERVER_URL}/logout`,{},{withCredentials : true});
      dispatch(removeUser());
      dispatch(removeConnections())
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">DevBrozz</Link>
      </div>
      {user &&
      <div className="flex items-center">
        <p>Hello {user?.firstName}</p>
        <div className="dropdown dropdown-end mx-6">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"> 
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.imageUrl} />
              </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 text-center w-28 p-2 shadow">
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li><Link to={"/connections"}>Connections</Link></li>
            <li><Link to={"/connectionReq"}>Requests</Link></li>
            <li><Link onClick={handleLogout}>Logout</Link></li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default NavBar
