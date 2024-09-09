import React, { useState } from 'react';
import { View,Image, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState('');

  const handleLogin = () => {
    console.log('RUT:', rut);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mun.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
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
        value={rut}
        onChangeText={setRut}
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Icon name="sign-in" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Icon name="user-plus" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',  // Fondo suave para reducir el brillo
  },
  label: {
    fontSize: 22,  // Texto más grande
    color: '#333333',  // Texto oscuro para contraste
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007acc',  // Borde azul accesible
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
    fontSize: 18,  // Fuente grande para mayor legibilidad
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007acc',
    paddingVertical: 20,
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
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 150,
    height: 150,
  },
});
