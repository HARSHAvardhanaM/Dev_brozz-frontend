import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/authSlice';
import { SERVER_URL } from "../redux/constants.js"
import ProfileCard from './ProfileCard.jsx'

function Edit({ user }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [imageUrl, setImageUrl] = useState(user.imageUrl);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [toast,setToast] = useState(false)

    const updateUser = async () => {
        try {
            setError("");
            const data = await axios.patch(`${SERVER_URL}/profile/edit`, {
                firstName, lastName, age, imageUrl, gender, about
            },
                { withCredentials: true });
            dispatch(addUser(data.data.data));
            setToast(true);
            setTimeout(()=>{setToast(false)},3000)
        } catch (error) {
            const result = error.response.data.split(':')[2].trim();
            setError(result)
        }
    }


    return (
        <div className='flex justify-evenly'>
            <div className='flex justify-center my-6 mx-10'>
                <div className="card bg-base-100 image-full w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2ypu0v6IkokzMtGvrtASf8vjWKy44y1GOg&s"
                            alt="Pic" />
                    </figure>
                    <div className="card-body flex ">
                        <h2 className="card-title ">Update</h2>
                        <div className='py-6'>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="py-2 label-text"> First Name</span>
                                </div>
                                <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                            </label>

                            <label className=" form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text py-2">Last Name</span>
                                </div>
                                <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="py-2 label-text"> Image URL</span>
                                </div>
                                <input value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="py-2 label-text"> Age</span>
                                </div>
                                <input value={age} onChange={(e) => { setAge(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="py-2 label-text"> About</span>
                                </div>
                                <input value={about} onChange={(e) => { setAbout(e.target.value) }} type="text" className="input input-bordered w-full max-w-xs" />
                            </label>

                            <label className="form-control w-full max-w-xs ">
                                <div className="label mt-5 mr-6">
                                    <span className="py-2 label-text">Gender</span>
                                </div>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn m-1">{gender}</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li onClick={() => { setGender('male') }}><a>Male</a></li>
                                        <li onClick={() => { setGender('female') }}><a>Female</a></li>
                                        <li onClick={() => { setGender('others') }}><a>Others</a></li>
                                    </ul>
                                </div>
                            </label>
                        </div>

                        {error && <p className='text-red-500'>{error}</p>}

                        <div className="card-actions justify-end">
                            <button onClick={updateUser} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6 h-36'>
                <ProfileCard isShow={false} user={{ firstName, lastName, about, age, imageUrl, gender }} />
            </div>
            <div>
                {toast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Edit
