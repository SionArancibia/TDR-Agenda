import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import handleLogout from './handleLogOut'; // Importar la función handleLogout

const ButtonLogOut = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleLogout(navigation)} // Llamar a la función handleLogout
        >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ButtonLogOut;
