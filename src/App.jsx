import React from 'react'
import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'
import Main from './components/Main'
import { Route, Routes } from 'react-router-dom'
import Watch from './components/Watch'


const App = () => {
  return (
    <div className='bg-zinc-900 w-full h-full text-zinc-200'>
        <Navbar/>
        <div className='flex'>
          <Sidenav />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/watch' element={<Watch/>}/>
          </Routes>
        </div>
    </div>

  )
}

export default App