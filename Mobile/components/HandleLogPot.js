import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogout = async (navigation) => {
    try {
        // Elimina el token almacenado (autenticación)
        await AsyncStorage.removeItem('token');

        // Redirige al login y reemplaza la ruta para evitar volver atrás
        navigation.navigate('Login');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

export default handleLogout;