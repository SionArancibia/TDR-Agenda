import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import { z } from 'zod';
import API_BASE_URL from "../utils/api";


const recoveryPasswordSchema = z.object({
  rut: z.string().min(1, "Por favor ingrese su RUT.").regex(/^\d{7,8}-[kK0-9]$/, 'El RUT debe estar en el formato xxxxxxxx-x'),
  email: z.string().email("Por favor ingrese un correo electrónico válido."),
});

export default function ForgotPasswordScreen() {
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!rut) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, ingrese su rut',
      });
      return;
    }
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, ingrese su email',
      });
      return;
    }

    const result = recoveryPasswordSchema.safeParse({ rut, email });

    if (!result.success) {
      result.error.errors.forEach(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      });
      return;
    }

    try {
      // Llamada a la API
      const response = await axios.post(`${API_BASE_URL}/passwordRecovery/reset-password-mobile`, {
        rut,
        email,
      });

      //const data = await response.json();

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Correo enviado exitosamente',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Hubo un problema al enviar el correo',
        });
      }
    } catch (error) {
      //console.log(error);
      if (error.response && error.response.status === 404) {
        // Si el RUT no está registrado, mostrar este mensaje:
        Toast.show({
          type: 'error',
          text1: 'Usuario no encontrado',
          text2: 'El RUT ingresado no está registrado.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error de conexión',
          text2: 'Hubo un problema de conexión',
        });
      }
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
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Arial', // Changed font family
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
    fontSize: 22, // Increased font size
    marginLeft: 10,
    fontFamily: 'Arial', // Changed font family
  },
});
