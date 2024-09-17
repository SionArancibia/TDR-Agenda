import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import UpdateUsers from "./pages/updateUsers";
import PasswordRecovery from "./pages/PasswordRecovery";
import { Toaster } from "sonner";
import Usuarios from "./pages/Usuarios";
import CreateUsers from "./pages/CreateUsers";
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);
  return (
    <>
        <Toaster />
        <Routes>
          <Route path="/dashboardAdmin" element={<AdminDashboard/>}/>
          <Route path="/dashboardProfessional" element={authUser?.role === "professional" ? <Dashboard/> : <Navigate to={"/login"} />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/createUsers" element={<CreateUsers/>}/>
          <Route path="/updateUsers/:id" element={authUser?.role === "admin" ? <UpdateUsers/> : <Navigate to={"/login"} />} />
          <Route path="/usuarios" element={authUser?.role === "admin" ? <Usuarios /> : <Navigate to="/login" />} /> 
        </Routes>
    </>
  )
}

export default App
