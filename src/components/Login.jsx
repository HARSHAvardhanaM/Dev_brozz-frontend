import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from "../redux/constants.js"

function Login() {
    const [email, setEmail] = useState("rocky@k.com");
    const [password, setPassword] = useState("Rocky@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [isLogIn, setIsLogIn] = useState(true)
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            setError("")
            const data = await axios.post(`${SERVER_URL}/login`,
                {
                    email, password
                },
                {
                    withCredentials: true
                }
            );
            // console.log(data.data.user)
            dispatch(addUser(data.data.user));
            navigate("/")
        } catch (error) {
            setError(error.response.data)
            // console.error(error)
        }
    }

    const handleSignup = async () => {
        try {
            setError("")
            const data = await axios.post(`${SERVER_URL}/signup`,
                {
                    firstName,lastName,email, password, age
                },
                {
                    withCredentials: true
                }
            );
            console.log(data.data)
            dispatch(addUser(data.data.user));
            navigate("/profile")
        } catch (error) {
            setError(error.response.data)
            // console.error(error)
        }
    }

    return (
        <div className='flex justify-center my-6 '>
            <div className="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2ypu0v6IkokzMtGvrtASf8vjWKy44y1GOg&s"
                        alt="Pic" />
                </figure>
                <div className="card-body flex ">
                    <h2 className="card-title ">{isLogIn ? "Login" : "Sign Up"}</h2>
                    <div className='py-6'>

                        {
                            !isLogIn &&
                            <>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="py-2 label-text">Enter Firstname</span>
                                    </div>
                                    <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="py-2 label-text">Enter Lastname</span>
                                    </div>
                                    <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                                </label>

                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="py-2 label-text">Enter Age</span>
                                    </div>
                                    <input value={age} onChange={(e) => { setAge(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        }

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="py-2 label-text">Enter email</span>
                            </div>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className=" form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text py-2">Password</span>
                            </div>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label>
                            {
                                isLogIn ?
                                <span onClick={()=>{setIsLogIn((prev)=>!prev)}} className="label-text "><p className='my-5'>Don't have an account <span className='text-blue-700'>Signup</span></p></span> :
                                <span onClick={()=>{setIsLogIn((prev)=>!prev)}} className="label-text "><p className='my-5'>Already an user <span className='text-blue-700'>Login</span></p></span>
                            }
                        </label>
                    </div>

                    {error && <p className='text-red-500'>{error}</p>}

                    <div className="card-actions justify-end">
                        {
                            isLogIn ?
                            <button onClick={handleLogin} className="btn btn-primary">Login</button>:
                            <button onClick={handleSignup} className="btn btn-primary">SignUp</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
