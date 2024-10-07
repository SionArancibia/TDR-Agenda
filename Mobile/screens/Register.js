import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
      const response = await axios.post('http://192.168.1.10:3000/register', {
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
      <Icon name="user" size={120} color="#333333" style={styles.userIcon} />
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.label}>Ingrese su RUT:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 12345678-9"
        value={rut}
        onChangeText={setRut}
        keyboardType="default"
      />
      <Text style={styles.label}>Ingrese su Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.archivoButton} onPress={handleFilePicker}>
        <Icon name="file-text-o" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonTextD}>Subir Archivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Icon name="sign-in" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    justifyContent: 'center',
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: 22,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007acc',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  archivoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  buttonTextD: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    paddingVertical: 15,
  },
});
