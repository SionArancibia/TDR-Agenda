import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import PasswordRecovery from "./pages/PasswordRecovery";
import { Toaster } from "sonner";
import Historial from './pages/historial.tsx'; 
import RegistroAsistencia from './pages/asistencia.tsx'
import Home from './pages/home.tsx';
import Navbar from './components/nabvar.tsx'; 
import Footer  from './components/footer.tsx'; 
import AgendaForm from './pages/agenda.tsx'; 
function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);
  return (
    <>
    <div>


      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={authUser?.role === "admin" ? <Dashboard/> : <Navigate to={"/login"} />}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/dashboard"}/>}/>
        <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/agenda" element={<AgendaForm />} />
        <Route path="/asistencia" element={<RegistroAsistencia />} />

       
      </Routes>
      <Footer />
    </div>

    </>
  )
}

export default App;
