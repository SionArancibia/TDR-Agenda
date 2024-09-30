import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MesesAgenda from '../components/MesesAgenda';

export default function MainScreen2({ navigation }) {
    return (
        
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Psicologia' })}>
                    <Text style={styles.buttonText}>Psicologia</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Kinesiologia' })}>
                    <Text style={styles.buttonText}>Kinesiologia</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Podologia' })}>
                    <Text style={styles.buttonText}>Podologia</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Peluqueria' })}>
                    <Text style={styles.buttonText}>Peluqueria</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Atencion Social' })}>
                    <Text style={styles.buttonText}>Atencion Social</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas', { title: 'Atencion Juridica' })}>
                    <Text style={styles.buttonText}>Atencion Juridica</Text>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#49BA98', // Color verde para los botones
        paddingVertical: 20,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 28, // Tamaño grande para texto
        fontWeight: 'bold',
    },
});