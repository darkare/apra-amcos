import { Route, Routes } from 'react-router-dom'
import { GENERIC_ERROR_MESSAGE } from './shared/config'
import ErrorPage from './titleSearch/pages/Error/Error'
import PhotoListing from './titleSearch/pages/PhotoList/PhotoList'
import './App.css'

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/error" element={<ErrorPage message={GENERIC_ERROR_MESSAGE} />} />
         <Route path="/" element={<PhotoListing />} />
       </Routes>
       </div>
  )
}

export default App
