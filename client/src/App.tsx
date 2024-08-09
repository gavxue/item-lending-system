import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import Loan from './pages/Loan'
import Return from './pages/Return'

function App() {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/loan' element={<Loan />} />
          <Route path='/return' element={<Return />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

    </>
  )
}

export default App
