import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SERVER_URL } from "./redux/constants"
import axios from "axios"
import { addUser } from "./redux/authSlice"

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector(store => store.user);

  const fetchdata = async () => {
    try {
      if (data) return;
      const user = await axios.get(`${SERVER_URL}/profile/view`, { withCredentials: true });
      console.log(user.data)
      dispatch(addUser(user.data))
    } catch (error) {
      console.log(error)
      if (error.response?.status == 401) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer className="mb-0" />
    </div>
  )
}

export default App
