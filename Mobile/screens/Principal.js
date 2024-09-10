import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgendarHora')}>
                <Text style={styles.buttonText}>Agendar Hora</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MisHoras')}>
                <Text style={styles.buttonText}>Mis Horas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ayuda')}>
                <Text style={styles.buttonText}>Ayuda</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    button: {
        backgroundColor: '#49BA98', // Color verde para los botones
        paddingVertical: 20,
        borderRadius: 10,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 28, // Tamaño grande para texto
        fontWeight: 'bold',
    },
});
