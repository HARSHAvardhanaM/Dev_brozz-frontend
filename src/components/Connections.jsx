import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SERVER_URL } from '../redux/constants';
import { addConnections } from '../redux/connectionSlice';

function Connections() {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch()

    const getConnections = async () => {
        try {
            if (connections && connections.length) {
                return
            }
            const data = await axios.get(`${SERVER_URL}/user/connections`, { withCredentials: true });
            dispatch(addConnections(data.data.data));
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getConnections()
    }, [])

    // if(!connections) {console.log("Hello");return;}

    if(!connections) return(<p>Nothing</p>)

    if (connections && connections?.length === 0) return (<p>No connections found</p>)

    return (
        <div className='flex flex-col text-center mb-5'>
            <h1 className='text-white text-2xl'>Connections</h1>
            <div>
            {connections.map((connection) => {
                return(
                    <div className='flex  w-1/2 mx-auto bg-base-300 mt-6 p-3 rounded'>
                        <div className='w-1/4'>
                            <img className='w-20 h-20 rounded' src={connection.imageUrl} /> 
                        </div>
                        <div className='flex flex-col text-left'>
                            <p>{connection.firstName+" "+connection.lastName}</p>
                            {connection.age && connection.gender && <p>{connection.age+" "+connection.gender}</p>}
                            <p>{connection.about}</p>
                        </div>
                        
                    </div>
                )
            })}
            </div>
        </div>
    )


}


export default Connections
