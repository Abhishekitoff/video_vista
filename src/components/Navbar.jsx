import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../assets/Video Vista.png'
import smalllogo from '../assets/small.png'
import profile from '../assets/profile.jpg'
import { IoIosNotifications, IoMdVideocam } from "react-icons/io";
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setsearchSuggestion, toggleSidebar } from '../utils/AppSlice';
import { FaMoon } from "react-icons/fa";
import axios from 'axios';
import { SUGGESTION_API } from '../constant/Youtube';
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const { searchSuggestion } = useSelector((store) => store.app)

  const [input, setinput] = useState('')

  const toggleHandler = () => {
    dispatch(toggleSidebar())
  }

  const searchVideo = () => {
    dispatch(setCategory(input))
    setinput('')
  }

  const showSuggestion = async () => {
    try {
      const res = await axios.get(SUGGESTION_API + input);
      // console.log(res?.data[1]);
      dispatch(setsearchSuggestion(res?.data[1]))
    } catch (error) {
      console.log("navbar search error", error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showSuggestion()
    }, 200);

    return () => {
      clearTimeout(timer)
    }

  }, [input])


  const search = (e) => {
    dispatch(setCategory(e))
    setinput('')
  }

  return (
    <div className='py-3 fixed w-full sm:w-full bg-zinc-900 '>
      <div className='flex gap-10 sm:justify-between sm:px-5 '>
        <div className='flex items-center'>
          <GiHamburgerMenu size={'25px'} className='cursor-pointer sm:block hidden' onClick={() => toggleHandler()} />
          <Link to='/' ><img className='pl-4 cursor-pointer sm:block hidden sm:w-[120px]' src={logo} alt="logo"  />  </Link>
          <Link to='/' ><img className='pl-4 cursor-pointer block sm:hidden w-[110px]' src={smalllogo} alt="logo"  />  </Link>

        </div>
        <div className='flex relative items-center  sm:w-[40%]'>
          <div className=' w-full border-[1px] border-gray-400 px-4 py-2 rounded-l-full' >
            <input type="text" value={input} onChange={(e) => { setinput(e.target.value) }} className=' bg-zinc-900 text-zinc-200 outline-none w-full font-semibold' placeholder='Search...' />

            {
              input != '' && <div className='absolute rounded-lg -left-1 sm:left-2 top-14 sm:top-12 w-[100%] sm:w-[90%] z-50 bg-red-900 shadow-lg'>
                <ul>
                  {searchSuggestion.map((text, index) => {
                    return (
                      <div onClick={() => search(text)} className='hover:bg-zinc-800 my-1 py-2 px-5 cursor-pointer rounded-lg flex gap-4 items-center'>
                        <IoSearchSharp size={30} />
                        <li key={index} className='font-bold'>{text}</li>
                      </div>


                    )
                  })}
                </ul>
              </div>
            }

          </div>
          <button onClick={searchVideo} className='py-2 border border-gray-400 rounded-r-full px-3'><CiSearch size={'24px'} /></button>



        </div>







        <div className='flex items-center  sm:gap-5'>
          <FaMoon size={'28px'} className='cursor-pointer sm:block hidden' />
          <IoIosNotifications size={'30px'} className='cursor-pointer sm:block hidden' />
          <IoMdVideocam size={'30px'} className='cursor-pointer sm:block hidden' />
          <Avatar src={profile} size={35} round={true} className='cursor-pointer' />

        </div>
      </div>
    </div>
  )
}

export default Navbar