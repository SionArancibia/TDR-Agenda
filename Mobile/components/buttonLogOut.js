import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import handleLogout from './HandleLogPot';

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
        //top: 20,
        //right: 20,
        backgroundColor: '#FF6B6B', // Rojo para el botón de logout
        borderRadius: 50, // Botón circular
        padding: 10,
        elevation: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ButtonLogOut;