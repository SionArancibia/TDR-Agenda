import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import Signup from "./pages/auth/Signup.tsx";
import { useAuthContext } from "./context/AuthContext";
import UpdateUsers from "./pages/admin/UpdateUsers.tsx";
import PasswordRecovery from "./pages/auth/PasswordRecovery.tsx";
import { Toaster } from "sonner";
import Users from "./pages/admin/Users.tsx";
import CreateUsers from "./pages/admin/CreateUsers.tsx";
import AdminDashboard from './pages/admin/Dashboard.tsx';
import History from "./pages/professional/History.tsx";
import Attendance from './pages/professional/Attendance.tsx';
import ProffesionalDashboard from './pages/professional/Dashboard.tsx';
import Navbar from './components/Nabvar.tsx'; 
import Footer from "./components/Footer.tsx"; 
import Agenda from "./pages/professional/Agenda.tsx";
 
function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);

  const DashboardRedirect = () => {
    if (authUser?.role === "admin") {
      return <Navigate to="/dashboardAdmin" />;
    } else if (authUser?.role === "professional") {
      return <Navigate to="/dashboardProfessional" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <div>
        <Toaster />
        <Navbar/>
        <Routes>
          {/* General */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
          <Route path="/" element={<DashboardRedirect />} /> 
          {/* Admin */}
          <Route path="/dashboardAdmin" element={authUser?.role === "admin" ? <AdminDashboard/> : <Navigate to={"/login"} />}/>
          <Route path="/users" element={authUser?.role === "admin" ? <Users /> : <Navigate to="/login" />} />
          <Route path="/createUser" element={<CreateUsers/>}/>
          <Route path="/updateUser/:id" element={authUser?.role === "admin" ? <UpdateUsers/> : <Navigate to={"/login"} />} />
          {/* Professional */}
          <Route path="/dashboardProfessional" element={authUser?.role === "professional" ? <ProffesionalDashboard/> : <Navigate to={"/login"} />}/>
          <Route path="/history" element={<History />} />
          <Route path="/agendaProfessional" element={<Agenda />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App;
