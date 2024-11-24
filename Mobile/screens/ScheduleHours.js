import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MesesAgenda from '../components/MesesAgenda';

export default function MainScreen2({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Seleccione un Servicio</Text>
            
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Psicologia' })}>
                    <Ionicons name="heart" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Psicología</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Kinesiologia' })}>
                    <Ionicons name="body" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Kinesiología</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Podologia' })}>
                    <Ionicons name="walk" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Podología</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Peluqueria' })}>
                    <Ionicons name="cut" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Peluquería</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Atencion Social' })}>
                    <Ionicons name="people" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Atención Social</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Atencion Juridica' })}>
                    <Ionicons name="briefcase" size={30} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Atención Jurídica</Text>
                </TouchableOpacity>
            </View>
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
    header: {
        fontSize: 36, // Increased font size
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Arial', // Changed font family
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#49BA98', 
        borderRadius: 12,
        width: '48%', // Ancho uniforme
        height: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, 
        paddingVertical: 10,   
        flexDirection: 'column', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Sombra
    },
    buttonText: {
        color: '#fff',
        fontSize: 24, // Increased font size
        fontWeight: 'bold',
        marginTop: 5, 
        textAlign: 'center',
        fontFamily: 'Arial', // Changed font family
    },
});