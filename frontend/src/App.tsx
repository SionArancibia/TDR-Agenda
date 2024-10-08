import {Route, Routes, Navigate} from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthContext } from "./context/AuthContext";
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/home.tsx';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Historial from './pages/historial.tsx';
import AgendaForm from './pages/agenda.tsx';
import Usuarios from "./pages/Usuarios";
import CreateUsers from "./pages/CreateUsers";
import RegistroAsistencia from './pages/asistencia.tsx';
import UpdateUsers from "./pages/updateUsers";
import PasswordRecovery from "./pages/PasswordRecovery";
import SimpleLayout from './layouts/SimpleLayout';
import MainLayout from './layouts/MainLayout';
 
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div>
        <Toaster />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/dashboardAdmin" element={authUser?.role === "admin" ? <AdminDashboard /> : <Navigate to={"/login"} />} />
            <Route path="/dashboardProfessional" element={authUser?.role === "professional" ? <Home /> : <Navigate to={"/login"} />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/agenda" element={<AgendaForm />} />
            <Route path="/asistencia" element={<RegistroAsistencia />} />
            <Route path="/usuarios" element={authUser?.role === "admin" ? <Usuarios /> : <Navigate to="/login" />} />
            <Route path="/createUsers" element={<CreateUsers />} />
            <Route path="/updateUsers/:id" element={authUser?.role === "admin" ? <UpdateUsers /> : <Navigate to={"/login"} />} />
          </Route>
          <Route element={<SimpleLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/passwordRecovery" element={<PasswordRecovery />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
