import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Pesan from './pages/Pesan'
import PageNotFound from './pages/PageNotFound'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pesan/:username" element={<Pesan />} />
          <Route path="/pesan" element={<PageNotFound />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
