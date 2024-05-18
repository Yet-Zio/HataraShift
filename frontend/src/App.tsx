import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './shared/Header'

function App() {

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-slate-200">
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<span>Hello! Welcome to HataraShift</span>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
