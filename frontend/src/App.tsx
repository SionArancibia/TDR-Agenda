import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.tsx";
import { useAuthContext } from "./context/AuthContext";
import UpdateUsers from "./pages/admin/UpdateUsers.tsx";
import PasswordRecovery from "./pages/auth/PasswordRecovery.tsx";
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
import CommunityCenters from "./pages/admin/CommunityCenters.tsx";
import Services from "./pages/admin/Services.tsx";
import CreateCommunityCenter from "./components/forms/CreateCommunityCenter.tsx";
import CreateService from "./components/forms/CreateService.tsx";
import ManageCategories from "./components/forms/ManageCategories.tsx";
import AgendaAdmin from "./pages/admin/AgendaAdmin.tsx";

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
              path="/communityCenters" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CommunityCenters />
                </ProtectedRoute>} 
            />
            <Route 
              path="/services" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Services />
                </ProtectedRoute>} 
            />
            <Route 
              path="/createCommunityCenter" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateCommunityCenter />
                </ProtectedRoute>} 
            />
            <Route 
              path="/createService" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateService />
                </ProtectedRoute>} 
            />

            <Route 
              path="/manageCategories" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageCategories />
                </ProtectedRoute>} 
            />
            
            <Route 
              path="/agendaAdmin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AgendaAdmin />
                </ProtectedRoute>} 
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
