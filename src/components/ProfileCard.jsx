import axios from 'axios'
import React from 'react'
import { SERVER_URL } from '../redux/constants'
import { useDispatch } from 'react-redux'
import {removeSingleFromFeed} from '../redux/feedSlice'

function ProfileCard({user,isShow}) {

    const dispatch = useDispatch()

    const handleRequest = async(status,id)=>{
        try {
            const data = await axios.post(`${SERVER_URL}/request/send/${status}/${id}`,{},{withCredentials:true});
            dispatch(removeSingleFromFeed(id))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    src={user.imageUrl}
                    alt="Profile Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.firstName+" "+user.lastName}</h2>
                {user.age && user.gender && <p>{user.age +" "+ user.gender}</p>}
                <p>{user.about}</p>
                {
                    isShow && <div className="card-actions justify-between felx ">
                    <button onClick={()=>{handleRequest("ignored",user._id)}} className="btn btn-primary">Ignore</button>
                    <button onClick={()=>{handleRequest("interested",user._id)}} className="btn btn-secondary">Interested</button>
                </div>
                }
            </div>
        </div>
    )
}

export default ProfileCard
