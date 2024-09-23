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
import Historial from './pages/historial.tsx'; 
import RegistroAsistencia from './pages/asistencia.tsx';
import Home from './pages/home.tsx';
import Navbar from './components/nabvar.tsx'; 
import Footer  from './components/footer.tsx'; 
import AgendaForm from './pages/agenda.tsx';
import Mensajes from './pages/mensajes.tsx';
 
function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);
  return (
    <>
      <div>
        <Toaster />
        <Navbar/>
        <Routes>
          <Route path="/dashboardAdmin" element={<AdminDashboard/>}/>
          <Route path="/dashboardProfessional" element={authUser?.role === "professional" ? <Dashboard/> : <Navigate to={"/login"} />}/>
          <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/dashboard"}/>}/>
          <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/createUsers" element={<CreateUsers/>}/>
          <Route path="/updateUsers/:id" element={authUser?.role === "admin" ? <UpdateUsers/> : <Navigate to={"/login"} />} />
          <Route path="/usuarios" element={authUser?.role === "admin" ? <Usuarios /> : <Navigate to="/login" />} /> 
          <Route path="/historial" element={<Historial />} />
          <Route path="/agenda" element={<AgendaForm />} />
          <Route path="/mensajes" element={<Mensajes />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App;
