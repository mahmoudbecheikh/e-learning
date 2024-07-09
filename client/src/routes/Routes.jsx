import React from "react";
import AddFormationsForm from "../pages/dirigeant/AddFormation";
import { Routes, Route, Navigate, useNavigate,useParams } from "react-router-dom";
import Formations from "../pages/clients/Formations";
import UpdateFormationForm from "../pages/dirigeant/UpdateFormations";
const Routers=()=>{
return (
    <Routes>
        <Route path='/addformation' element={<AddFormationsForm/>}/>
        <Route path='/formations' element={<Formations/>}/>
        <Route path='/updateFormation/:id' element={<UpdateFormationForm/>}/>
    </Routes>
)
}
export default Routers;