import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  const [rut, setRut] = useState('');

  const handleLogin = () => {
    console.log('RUT:', rut);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/muni.png')}
          style={styles.logoHeader}
          resizeMode="contain"
          
        />
      </View>
      
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
          value={rut}
          onChangeText={setRut}
          keyboardType="default"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Principal')}>
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
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logoHeader: {
    paddingTop:0,
    width: 120,
    height: 150,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
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
