import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import ExitModal from '../components/ExitModal';
import ButtonLogOut from '../components/buttonLogOut';

export default function MainScreen({ navigation, route}) {
        const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal

        useEffect(() => {
            // Verificar si se pasó un mensaje desde LoginScreen
            console.log(route.params)
            if (route.params?.showToast) {
                Toast.show({
                    type: route.params.messageType, // 'success' o 'error'
                    text1: route.params.text1,
                    text2: route.params.text2,
                });
            }
        }, [route.params]);
    
        useFocusEffect(
            React.useCallback(() => {
                const onBackPress = () => {
                    setModalVisible(true); // Mostrar modal cuando el usuario presiona atrás
                    return true; // Bloquear comportamiento por defecto
                };
    
                BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
                return () =>
                    BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            }, [])
        );
    
        const exitApplication = () => {
            BackHandler.exitApp(); // Cerrar la aplicación
        };
    
        const cancelExit = () => {
            setModalVisible(false); // Cerrar el modal sin salir
        };
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <ButtonLogOut 
                style={styles.logoutButton}
                navigation={navigation} 
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GenericScreen')}>
                <Ionicons name="calendar-outline" size={28} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Agendar Hora</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyHours')}>
                <Ionicons name="time-outline" size={28} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Mis Horas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
                <Ionicons name="help-circle-outline" size={28} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Ayuda</Text>
                </TouchableOpacity>
                <ExitModal
                visible={modalVisible}
                onCancel={cancelExit}
                onExit={exitApplication}
            />

            <TouchableOpacity style={styles.logoutContainer}>
                <ButtonLogOut navigation={navigation} /> 
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
    title: {
        fontSize: 36, // Increased font size
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333', 
        fontFamily: 'Arial', // Changed font family
    },
    button: {
        backgroundColor: '#49BA98', // Color verde para los botones
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 12,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra
    },
    buttonText: {
        color: '#fff',
        fontSize: 32, // Increased font size
        fontWeight: 'bold',
        fontFamily: 'Arial', // Changed font family
    },
    logoutContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
        flex: 1,
    }
});
