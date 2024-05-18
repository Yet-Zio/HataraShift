import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'
import Home from "./pages/Home"

function App() {

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-slate-200">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
