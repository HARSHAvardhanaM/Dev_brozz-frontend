import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnectionRequest, removeConnectionReq } from '../redux/connetionReq';
import axios from 'axios';
import { SERVER_URL } from '../redux/constants';
import { useNavigate } from 'react-router-dom';

function ConnectionReq() {
    const connectionReq = useSelector(store => store.connectionReq);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRequest = async (status,id) =>{
        try {
            const data = await axios.post(SERVER_URL+"/request/review/"+status+"/"+id,{},{withCredentials : true});
            dispatch(removeConnectionReq(id))
        } catch (error) {
            console.error(error)
        }
    }

    const getConnectionReq = async () => {
        try {
            if (connectionReq && connectionReq.length) {
                return
            }
            const data = await axios.get(`${SERVER_URL}/user/request/recived`, { withCredentials: true });
            dispatch(addConnectionRequest(data.data));
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getConnectionReq()
    }, []);

    if (!connectionReq) {
        return (
            <div className='flex flex-col text-center mb-5'>
                <h1 className='text-white text-2xl'>Loading...</h1>
            </div>
        )
    }

    if (connectionReq?.length == 0) {
        return (
            <div className='flex flex-col text-center mb-5'>
                <h1 className='text-white text-2xl'>No requests found</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col text-center mb-5'>
            <h1 className='text-white text-2xl'>Connections</h1>
            <div>
                {connectionReq && connectionReq?.map((connection) => {
                    return (
                        <div key={connection._id} className='flex  w-1/2 mx-auto bg-base-300 mt-6 p-3 rounded justify-evenly text-left'>
                            <div className='w-1/5'>
                                <img className='w-20 h-20 rounded' src={connection.fromUserId.imageUrl} />
                            </div>
                            <div className='flex flex-col text-left w-3/5'>
                                <p>{connection.fromUserId.firstName + " " + connection.fromUserId.lastName}</p>
                                {connection.fromUserId.age && connection.fromUserId.gender && <p>{connection.fromUserId.age + " " + connection.fromUserId.gender}</p>}
                                <p>{connection.fromUserId.about}</p>
                            </div>
                            <div className='flex flex-col justify-between'>
                            <div>
                                <button onClick={()=>{handleRequest("accepted",connection._id)}} className="btn btn-primary w-14 h-8">Accept</button>
                                </div>
                                <div>
                                <button onClick={()=>{handleRequest("rejected",connection._id)}} className="btn btn-secondary w-14 h-8">Reject</button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default ConnectionReq
