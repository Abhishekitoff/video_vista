import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import API_KEY from '../constant/Youtube';
import Avatar from 'react-avatar';
import { GrLike, GrDislike } from "react-icons/gr";
import { FaShare } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import WatchRight from './WatchRight';

const Watch = () => {
  const [singleVideo, setsingleVideo] = useState('');
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v')

  const getsingleVideo = async () => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`)

      setsingleVideo(res?.data?.items[0])


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getsingleVideo()
  }, [])




  return (
    <div className=' mt-16 sm:p-8 w-full flex text-zinc-200 '>
      <div className='sm:w-[70%]   sm:mx-2'>
       
       <iframe className='rounded-xl sm:block hidden' width="690" height="400" src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
       
       <iframe className='rounded-xl block sm:hidden' width="400" height="300" src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
       
        <h1 className='text-3xl w-[90%] px-2 sm:w-[90%] font-semibold mt-2'>{singleVideo?.snippet?.title}</h1>

        <div className='flex items-center justify-between sm:justify-between px-2 mt-2'>
          <div className='flex justify-between items-center gap-4 sm:gap-0  sm:w-[35%]'>
            <div className='flex gap-1'>
              <Avatar src='' size={35} round={true} className='cursor-pointer' />
              <h1 className='font-bold'>{singleVideo?.snippet?.channelTitle}</h1>
            </div>
            <button className='px-3 py-1 font-bold bg-zinc-800 rounded-full sm:block hidden'>Subscribe</button>
            <button className='px-3 py-1 font-bold bg-zinc-800 rounded-full sm:hidden block'><FaBell /></button>
          </div>

          <div className='flex items-center sm:gap-4'>
            <div className='flex  sm:gap-7 items-center justify-center px-1 py-2 sm:px-8 sm:py-3 sm:bg-zinc-800 cursor-pointer rounded-full'>
              <GrLike  className=''/>
              <GrDislike  className=''/>
            </div>
            <div className=' px-4 py-3 sm:block hidden bg-zinc-800 rounded-full '>
              <FaShare />
            </div>
            <div className=' px-4 py-3 sm:block hidden bg-zinc-800 rounded-full'><MdFileDownload /></div>
          </div>

        </div>

        <div className='mt-2 w-[100%] sm:w-full h-40 overflow-y-scroll bg-zinc-900 rounded-xl p-5'>
          {singleVideo?.snippet?.description}
        </div>

      </div>

      <div className='w-[30%] sm:block hidden'>
        <WatchRight />
      </div>
    </div>
  )
}

export default Watch