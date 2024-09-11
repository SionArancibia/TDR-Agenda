import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import GetUsers from "./pages/getUsers";
import PasswordRecovery from "./pages/PasswordRecovery";
import { Toaster } from "sonner";

function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);

  return (
    <>
    <div>
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={authUser?.role === "admin" ? <Dashboard/> : <Navigate to={"/login"} />}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/dashboard"}/>}/>
        <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
        <Route path="/signup" element={authUser?.role === "admin" ? <Signup/> : <Navigate to={"/login"} />}/>
        <Route path="/getUsers" element={<GetUsers/>} />
      </Routes>
    </div>

    </>
  )
}

export default App
