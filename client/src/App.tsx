import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

// import { useEffect, useState } from 'react'
// import axios from 'axios'

function App() {
  // const [message, setMessage] = useState('')

  // useEffect(() => {
  //   axios.get('http://localhost:3000')
  //     .then(res => setMessage(res.data.message))
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
