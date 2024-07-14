import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formations from "./pages/clients/Formations";
import UpdateFormationForm from "./pages/administrations/UpdateFormations";
import AddFormationsForm from "./pages/administrations/AddFormation";
import Registration from './pages/Registration';
import Login from './pages/Login';
import NavbarC from './Navbar';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path='/addformation' element={<AddFormationsForm/>}/>
        <Route path='/formations' element={<Formations/>}/>
        <Route path='/updateFormation/:id' element={<UpdateFormationForm/>}/>
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
