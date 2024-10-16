import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.10:3000/login', {
        rut,
        password,
      });

      const { token } = response.data;
      console.log('Token recibido:', token);

      AsyncStorage.setItem('token', token);

      navigation.navigate('Principal');
    } catch (error) {
      console.log('Error de inicio de sesión:', error);
      Alert.alert('Error', 'RUT o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user" size={120} color="#007acc" style={styles.userIcon} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ingrese su RUT"
            value={rut}
            onChangeText={setRut}
            keyboardType="default"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ingrese su Contraseña"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.recoverButton} onPress={() => navigation.navigate('Rpassword')}>
          <Text style={styles.recoverButtonText}>Recuperar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Fondo azul claro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userIcon: {
    marginBottom: 20, // Espacio entre el ícono y el texto "Bienvenido"
  },
  formContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Para sombreado en Android
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007acc',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  recoverButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  recoverButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
  