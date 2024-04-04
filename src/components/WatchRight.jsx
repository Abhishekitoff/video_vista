import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { YOUTUBE_API } from "../constant/Youtube"
import { Link } from 'react-router-dom'


const WatchRight = () => {
    const [video, setvideo] = useState([])

    const fetchVideo = async () => {
        try {
            const res = await axios.get(`${YOUTUBE_API}`)
            setvideo(res.data.items)



        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchVideo()

    }, [])
    return (
        <div>
            {
                video.map((item, index) => {
                    return <Link to={`/watch?v=${item.id}`} key={item.id} className='mt-5 hidden sm:flex cursor-pointer w-full  gap-2'>
                        <img className='w-40 rounded-xl' src={item?.snippet?.thumbnails?.medium?.url} alt="ytvideo" />


                        <div className=' w-[55%] ' >
                            <h1 className='font-semibold leading-5'>{item?.snippet?.title.slice(0, 38)}</h1>
                            <p className='leading-4 text-sm'>{item?.snippet?.channelTitle}</p>
                            <div className='flex justify-between'>
                                <p>108m</p>
                                <p>8 month ago</p>
                            </div>
                        </div>


                    </Link>
                })
            }
        </div>
    )
}

export default WatchRight