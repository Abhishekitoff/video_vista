import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_KEY, YOUTUBE_API } from "../constant/Youtube"
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeVideo } from '../utils/AppSlice'

const VideoContainer = () => {


  const { video, category } = useSelector((store) => store.app)
  const dispatch = useDispatch()

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${YOUTUBE_API}`)
      dispatch(setHomeVideo(res?.data?.items))

    }
    catch (error) {
      console.log(error)
    }
  }


  const fetchVideoByCategory = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`)
      // console.log(res);
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      console.log(error);
    }
  }
  



  useEffect(() => {
    if (category === "All") {
       fetchVideo()
    }
    else{
        fetchVideoByCategory(category)
    }
   
  

  }, [category])





  return (
    <div className='sm:grid-cols-4  sm:gap-5 sm:grid'>

      {
        video.map((item, index) => <Link key={item.id.videoId} to={`/watch?v=${item.id.videoId}`}>  <VideoCard item={item} /> </Link>)
      }
    </div>
  )
}

export default VideoContainer