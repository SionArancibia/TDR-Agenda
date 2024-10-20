import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import { useAuthContext } from "./context/AuthContext";
import UpdateUsers from "./pages/admin/UpdateUsers.tsx";
import PasswordRecovery from "./pages/auth/PasswordRecovery.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import { Toaster } from "sonner";
import Users from "./pages/admin/Users.tsx";
import CreateUsers from "./pages/admin/CreateUsers.tsx";
import AdminDashboard from './pages/admin/Dashboard.tsx';
import History from "./pages/professional/History.tsx";
import Attendance from './pages/professional/Attendance.tsx';
import ProfessionalDashboard from './pages/professional/Dashboard.tsx';
import Agenda from "./pages/professional/Agenda.tsx";
import { ProtectedRoute } from "./pages/auth/ProtectedRoute.tsx";
import Unauthorized from "./pages/Unauthorized.tsx";
import SimpleLayout from './layouts/SimpleLayout';
import MainLayout from './layouts/MainLayout';
import Requests from "./pages/admin/Requests.tsx";
import RegistroAsistencia from './pages/professional/appointment_register.tsx';
import AdminProfile from "./pages/admin/AdminProfile.tsx";
import ProfessionalProfile from "./pages/professional/ProfessionalProfile.tsx";


function App() {
  const {authUser} = useAuthContext();
  console.log("authuser: ", authUser);

  const DashboardRedirect = () => {
    if (authUser?.role === "admin") {
      return <Navigate to="/dashboardAdmin" />;
    } 
    
    if (authUser?.role === "professional") {
      return <Navigate to="/dashboardProfessional" />;
    } 
  };

  return (
    <>
      <div>
        <Toaster />
        <Routes>
          {/* General */}
          <Route element={<SimpleLayout />}>
            <Route path="/login" element={!authUser ? <Login/> : <DashboardRedirect />}/>
            <Route path="/passwordRecovery" element={<PasswordRecovery/>}/>
            <Route path="/resetPassword/:token" element={<ResetPassword />} /> 
            <Route path="/" element={<DashboardRedirect />} />
            <Route path="/unauthorized" element={<Unauthorized />} />  
          </Route>
          {/* Admin */}
          <Route element={<MainLayout />}>
            <Route 
              path="/dashboardAdmin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>}
            />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Users />
                </ProtectedRoute>} 
            />
            <Route 
              path="/createUser"
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateUsers/>
                </ProtectedRoute>}
            />
            <Route 
              path="/updateUser/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UpdateUsers/>
                </ProtectedRoute>}
            />
            <Route 
              path="/requests" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Requests />
                </ProtectedRoute>} 
            />
            <Route
              path="/adminProfile"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminProfile />
                </ProtectedRoute>
              }
            />
            {/* Professional */}
            <Route
              path="/dashboardProfessional"
              element={
                <ProtectedRoute requiredRole="professional">
                  <ProfessionalDashboard/>
                </ProtectedRoute>}
            />
            <Route
              path="/professionalProfile"
              element={
                <ProtectedRoute requiredRole="professional">
                  <ProfessionalProfile />
                </ProtectedRoute>
              }
            />
          <Route path="/registro/:patientId" element={<RegistroAsistencia />} />
          <Route
              path="/history"
              element={   
                <ProtectedRoute requiredRole="professional">
                  <History />
                </ProtectedRoute>}
            />
            <Route 
              path="/agendaProfessional"
              element={
                <ProtectedRoute requiredRole="professional">
                  <Agenda />
                </ProtectedRoute>}
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute requiredRole="professional">
                  <Attendance />
                </ProtectedRoute>} 
            />
            </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
