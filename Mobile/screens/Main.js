import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ExitModal from '../components/ExitModal';

export default function MainScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal

    useEffect(() => {
        // Verificar si se pasó un mensaje desde LoginScreen
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GenericScreen')}>
                <Text style={styles.buttonText}>Agendar Hora</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horas')}>
                <Text style={styles.buttonText}>Mis Horas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
                <Text style={styles.buttonText}>Ayuda</Text>
            </TouchableOpacity>

            <ExitModal
                visible={modalVisible}
                onCancel={cancelExit}
                onExit={exitApplication}
            />

            <Toast />
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
