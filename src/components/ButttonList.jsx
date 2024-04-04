import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategory } from '../utils/AppSlice';

const ButttonList = () => {
    const buttonList = ["all", "javascript", "java", "music", "vlogs","news", "mobile","bollywood songs","atif aslam "]


    const [active, setactive] = useState('all');
   const dispatch=useDispatch();

    const videoTag=(tag)=>{
      if(active != tag){
       dispatch(setCategory(tag))
       setactive(tag)
      }
    }
    // console.log(active)


  return (
    <div className='mt-20 flex'>
     
        {
            buttonList.map((buttonName,index)=>  <button onClick={()=>{videoTag(buttonName)}} key={index} className={` px-4 py-2 rounded-lg capitalize ml-2 font-semibold ${active === buttonName? 'bg-zinc-800':'bg-zinc-900'}`}>{buttonName}</button>)
        }

     
       
    </div>
  )
}

export default ButttonList