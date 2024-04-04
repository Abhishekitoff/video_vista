import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import profile from '../assets/profile.jpg'
import axios from 'axios'
import API_KEY from '../constant/Youtube'

const VideoCard = ({item}) => {
    const [ytIcon, setytIcon] = useState('')
    const getYoutubeChanelName = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY} `)
            // console.log(res);
            setytIcon(res.data.items[0].snippet.thumbnails.high.url)
            
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
     getYoutubeChanelName();
    }, [])
    
 
    return (
        <div className='mt-5  cursor-pointer w-full'>
            <img className='w-80 rounded-xl' src={item.snippet.thumbnails.medium.url} alt="ytvideo" />

            <div className='flex mt-2  gap-3 '>
               <div>
               <Avatar src={ytIcon} size={35} round={true} className='cursor-pointer  ' />       
               </div>

                <div className=' ' >
                    <h1 className='font-semibold'>{item.snippet.title}</h1>
                    <p>{item.snippet.channelTitle}</p>
                </div>
            </div>

        </div>
    )
}

export default VideoCard