import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './user/Registration';
import Login from './user/Login';
import NavbarC from './Navbar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <>
      <NavbarC />
      <div className="container">
        <Sidebar className="sidebar" />
        <div className="content">
          <Routes>


          
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
