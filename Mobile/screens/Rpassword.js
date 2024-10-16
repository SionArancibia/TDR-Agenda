import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

export default function ForgotPasswordScreen() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!rut) {
      Alert.alert("Error", "Por favor ingrese su RUT.");
      return;
    }
    if (!email) {
      Alert.alert("Error", "Por favor ingrese su correo electrónico.");
      return;
    }

    try {
      // Llamada a la API
      const response = await axios.post('http://192.168.1.10:3000/reset-password', {
        rut,
        email,
      });

      //const data = await response.json();

      if (response.status === 200) {
        Alert.alert("Correo enviado", "Se ha enviado un correo para recuperar su contraseña.");
      } else {
        Alert.alert("Error", response.data.message || "Hubo un problema al enviar el correo.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un problema de conexión.");
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="lock" size={120} color="#007acc" style={styles.lockIcon} />
      <Text style={styles.title}>Recuperar Contraseña</Text>

      <View style={styles.inputContainer}>
        <Icon name="id-card" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su RUT"
          value={rut}
          onChangeText={setRut}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Icon name="paper-plane" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Enviar Correo</Text>
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
  lockIcon: {
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
    width: '100%',
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
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});
