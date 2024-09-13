import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import UpdateUsers from "./pages/updateUsers";
import PasswordRecovery from "./pages/PasswordRecovery";
import { Toaster } from "sonner";
import Usuarios from "./pages/Usuarios";

function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);

  return (
    <>
    <div>
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={authUser?.role === "admin" ? <Dashboard/> : <Navigate to={"/login"} />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/updateUsers/:id" element={authUser?.role === "admin" ? <UpdateUsers/> : <Navigate to={"/login"} />} />
        <Route path="/usuarios" element={authUser?.role === "admin" ? <Usuarios /> : <Navigate to="/login" />} /> 
      </Routes>
    </div>
    </>
  )
}

export default App
