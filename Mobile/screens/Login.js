import React, { useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

const loginSchema = z.object({
  rut: z.string().min(1, 'El RUT es obligatorio').regex(/^\d{7,8}-[kK0-9]$/, 'El RUT debe estar en el formato xxxxxxxx-x'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function LoginScreen({ navigation, route }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Verificar si se pasó un mensaje desde RegisterScreen
    if (route.params?.showToast) {
      Toast.show({
        type: route.params.messageType, // 'success' o 'error'
        text1: route.params.text1,
        text2: route.params.text2,
      });
    }
  }, [route.params]);

  const handleLogin = async () => {

    if (!rut) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, ingrese su rut',
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, ingrese una contraseña',
      });
      return;
    }

    const validationResult = loginSchema.safeParse({ rut, password });

    if (!validationResult.success) {
      validationResult.error.errors.forEach(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      });
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.20:3000/login', {
        rut,
        password,
      });

      const { token } = response.data;
      //console.log('Token recibido:', token);

      AsyncStorage.setItem('token', token);

      Toast.show({
        type: 'success',
        text1: 'Inicio de sesión exitoso',
        text2: 'Bienvenido',
      });

      navigation.navigate('Principal', { showToast: true, text1: 'Inicio de sesión exitoso', text2: 'Bienvenido', messageType: 'success' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'RUT o contraseña incorrectos',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al iniciar sesión',
        });
      }
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
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  recoverButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
  