import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SERVER_URL } from '../redux/constants';
import { addFeed } from '../redux/feedSlice';
import ProfileCard from './ProfileCard';

function Feed() {
  let feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{
    const feed = await axios.get(`${SERVER_URL}/user/feeds`,{withCredentials : true});
    console.log(feed)
    dispatch(addFeed(feed.data.feedUsers))
  }

  useEffect(()=>{
    getFeed()
  },[dispatch])
  if(feed?.length == 0){
    return <div className='flex , justify-center my-10'>
      <h1 className='text-3xl'>You are all caught-up</h1>
    </div>
  }
  return (
   <div>
     {feed && feed?.length > 0 &&
    <div className='flex , justify-center my-10'>
      <ProfileCard user={feed[0]} isShow={true}/>
    </div>}
   </div>
  )
}

export default Feed
