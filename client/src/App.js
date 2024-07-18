import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formations from "./pages/clients/Formations";
import UpdateFormationForm from "./pages/administrations/UpdateFormations";
import AddFormationsForm from "./pages/administrations/AddFormation";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import CoursItem from "./pages/cours/CourseItem";
import CreateCourse from "./pages/cours/CreateCourse";
import ListingCourse from "./pages/cours/ListingCourse";
import UpdateCourse from "./pages/cours/UpdatingCourse";
import NavbarC from "./components/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addformation" element={<AddFormationsForm />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/updateFormation/:id" element={<UpdateFormationForm />} />
        <Route path="/*" element={<MainLayout />} />
        <Route path="/cours" element={<ListingCourse />} />
        <Route path="/cours/add" element={<CreateCourse />} />
        <Route path="/cours/:coursId" element={<CoursItem />} />
        <Route path="/cours/update/:coursId" element={<UpdateCourse />} />
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
          <Routes></Routes>
        </div>
      </div>
    </>
  );
}

export default App;
