import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/signup');
    };

    const handleGetClick = () => {
        navigate('/getUsers');
    };

    const handleDeleteClick = () => {
        navigate('/deleteUsers');
    };

    const handleUpdateClick = () => {
        navigate('/updateUsers');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <button
                onClick={handleRegisterClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Registrar Usuario
            </button>
            <button
                onClick={handleDeleteClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Eliminar Usuario
            </button>
            <button
                onClick={handleGetClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Visualizar Usuario
            </button>
            <button
                onClick={handleUpdateClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Actualizar Usuario
            </button>
        </div>
    );
};

export default Dashboard;