import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formations from "./pages/clients/Formations";
import UpdateFormationForm from "./pages/administrations/UpdateFormations";
import AddFormationsForm from "./pages/administrations/AddFormation";
import CoursItem from "./pages/cours/CourseItem";
import CreateCourse from "./pages/cours/CreateCourse";
import ListingCourse from "./pages/cours/ListingCourse";
import UpdateCourse from "./pages/cours/UpdatingCourse";
import NavbarC from "./components/Navbar";
import Home from "./components/Home";
import Registration from "./pages/user/Registration";
import Login from "./pages/user/Login";
import ResetPasswordRequestForm from "./pages/user/ResetPasswordRequestForm";
import ResetPasswordForm from "./pages/user/ResetPasswordForm";
import Users from "./pages/user/users/userspage";
import UserList from "./pages/user/users/listuser";
import ClientList from "./pages/user/users/listclient";
import EmployeurList from "./pages/user/users/listemployeur";
import AdminList from "./pages/user/users/listadmin";
import Messagesection from "./pages/message";
import FormationDetails from "./pages/clients/FormationDetails";
import EvaluationsList from "./pages/evaluation/EvaluationsList";
import EvaluationForm from "./pages/evaluation/EvaluationForm";
import EvaluationDetails from "./pages/evaluation/EvaluationDetails";
import QuizzList from "./pages/evaluation/QuizzList";
import QuizzForm from "./pages/evaluation/QuizzForm";
import QuizzDetails from "./pages/evaluation/QuizzDetails";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password-request" element={<ResetPasswordRequestForm />}  />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />}  />
        <Route path="/addformation" element={<AddFormationsForm />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/updateFormation/:id" element={<UpdateFormationForm />} />
        <Route path="/*" element={<MainLayout />} />
        <Route path="/cours" element={<ListingCourse />} />
        <Route path="/cours/add/:niveauIndex" element={<CreateCourse />} />
        <Route path="/cours/:coursId" element={<CoursItem />} />
        <Route path="/cours/update/:coursId" element={<UpdateCourse />} />
        <Route path="/message" element={<Messagesection />} />
        <Route path="/formationdetails/:id/message" element={<Messagesection />} />
        <Route path="/formationdetails/:id" element={<FormationDetails />} />


        <Route path="/evaluations" element={<EvaluationsList/>} />
        <Route path="/evaluations/new" element={<EvaluationForm isEdit={false} />} />
        <Route path="/evaluations/:id/edit" element={<EvaluationForm isEdit={true} />} />
        <Route path="/evaluations/:id" element={<EvaluationDetails />} />

        <Route path="/quizz" element={<QuizzList/>} />
                <Route path="/quizz" element={<QuizzList/>} />

      <Route path="/quizz/create" element={<QuizzForm/>} />
      <Route path="/quizz/edit/:id" element={<QuizzForm/>} />
      <Route path="/quizz/:id" element={<QuizzDetails />} />

      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <>
      <NavbarC />
      <div className="main-container" 
        style={{display: "flex",
        height: "100vh"
        }}>
        <Sidebar className="sidebar" />
        <div className="content">
          <Routes>
          <Route path="/users" element={<Users />} />
            <Route path="/listuser" element={<UserList />} />
        <Route path="/listclient" element={<ClientList />} />
        <Route path="/listemployeur" element={<EmployeurList />} />
        <Route path="/listadmin" element={<AdminList />} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
