import React from 'react'
import { IoIosHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";

const Sidenav = () => {
    const sidebarItem =[
        {
            icons:<IoIosHome size={'40px'}/>,
            title:"Home",
            to:"/"
        }, 
        {
            icons:<SiYoutubeshorts size={'40px'}/>,
            title:"Shorts",
           
        }, 
        {
            icons:<FaHistory size={'40px'}/>,
            title:"history"
        },
        
        
    ]

    const open = useSelector((store)=>store.app.value) 
   
    return (
        <div className={` h-[calc(100vh-4.625rem)] mt-16  overflow-y-auto px-3 overflow-x-hidden sm:block hidden`}>
           {
            sidebarItem.map((item, index)=>{
                return  <Link to={item.to} key={index} className='flex items-center rounded-full hover:bg-zinc-800 gap-8 w-[100%]  px-5  py-1 my-2 cursor-pointer '>
                {item.icons }
                <h4 className={`font-bold ${open ?"": 'hidden'} capitalize`}>{item.title}</h4>
            </Link>
            })
           }
             
             
            
        </div>
    )
}

export default Sidenav