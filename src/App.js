import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Notfound from './pages/Notfound'

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar title={"Github Finder"} />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/notfound' element={<Notfound />} />
            <Route path='/*' element={<Notfound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
