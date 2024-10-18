import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/axios';

interface AuthUserType {
  id: string;
  rut: string;
  firstName: string;
  lastName: string;
  address: string;
  age: number;
  email: string;
  phoneNumber: number;
  createAt: Date;
  gender: string;
  role: string;
  professional?: any;
  administrator?: any;
  patient?: any;
}

interface AuthContextType {
  authUser: AuthUserType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;
  login: (userData: AuthUserType) => void;
  logout: () => void;
  fetchUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      setAuthUser(response.data);
    } catch (error) {
      console.log('An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = (userData: AuthUserType) => {
    setAuthUser(userData);
    if (userData.role === 'admin') {
      navigate('/dashboardAdmin');
    } else if (userData.role === 'professional') {
      navigate('/dashboardProfessional');
    } else {
      navigate('/');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setAuthUser(null);
      localStorage.removeItem("user"); // Eliminar el usuario del localStorage
      navigate('/login');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, login, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};