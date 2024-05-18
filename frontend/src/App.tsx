import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-slate-200">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
