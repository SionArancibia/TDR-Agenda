import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const goToUsuarios = () => {
        navigate('/usuarios');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <button 
                onClick={goToUsuarios}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Gestionar Usuarios
            </button>
        </div>
    );
};

export default Dashboard;