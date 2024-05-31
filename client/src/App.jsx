import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Error from './pages/error/Error'
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
      <Router>
        <Toaster />
        <Routes>
          <Route path = "/" element ={<Home />} />
          <Route path = "*" element = {<Error />} />
        </Routes>
      </Router>  
  )
}

export default App
