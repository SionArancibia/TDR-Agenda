import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function RegisterScreen() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!rut) {
      Alert.alert('Error', 'Por favor ingrese su RUT.');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Por favor ingrese una Contraseña.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.8:3000/register', {
        rut,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Registro Exitoso', 'Usuario registrado con éxito');
      } else {
        Alert.alert('Error', 'No se pudo completar el registro.');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar la información.');
    }
  };

  const handleFilePicker = async () => {
    return 0;
  };

  return (
    <View style={styles.container}>
      <Icon name="user" size={120} color="#007acc" style={styles.userIcon} />
      <Text style={styles.title}>Registro</Text>

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
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.archivoButton} onPress={handleFilePicker}>
        <Icon name="file-text-o" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Subir Archivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Icon name="sign-in" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userIcon: {
    marginBottom: 20,
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
    width: '100%', // Esto asegura que el input ocupe todo el ancho disponible
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  archivoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%', // Esto asegura que el botón ocupe todo el ancho disponible
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000FF',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%', // Esto asegura que el botón ocupe todo el ancho disponible
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});
