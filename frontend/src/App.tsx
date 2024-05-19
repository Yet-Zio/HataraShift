import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/dashboard/Dashboard"

function App() {

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-slate-200">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard pagetorender="Home"/>}/>
          <Route path="/dashboard/home" element={<Dashboard pagetorender="Home"/>}/>
          <Route path="/dashboard/trending" element={<Dashboard pagetorender="Trending"/>}/>
          <Route path="/dashboard/explore" element={<Dashboard pagetorender="Explore"/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
