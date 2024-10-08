import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.8:3000/login', {
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
      <View style={styles.formContainer}>
        <Icon name="user" size={120} color="#007acc" style={styles.userIcon} />

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
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Icon name="sign-in" size={25} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Icon name="user-plus" size={25} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.recuperarButton} onPress={() => navigation.navigate('Rpassword')}>
          <Icon name="key" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.recuperarButtonT}>Recuperar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  userIcon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 22,
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007acc',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007acc',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  recuperarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  recuperarButtonT: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});