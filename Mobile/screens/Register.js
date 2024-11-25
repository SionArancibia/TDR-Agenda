import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { z } from 'zod';
import { validateRut } from '@fdograph/rut-utilities';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import API_BASE_URL from '../utils/api';

const registerSchema = z.object({
  rut: z.string().min(1, { message: 'El RUT es requerido' }).refine(value => validateRut(value), {
    message: 'RUT inválido',
  }).refine(value => /^\d{7,8}-[kK0-9]$/.test(value), {
    message: 'El RUT debe estar en el formato xxxxxxxx-x',
  }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export default function RegisterScreen({ navigation }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState(null); // Archivo en Base64

  const handleRegister = async () => {
    // Validar RUT y contraseña
    const validationResult = registerSchema.safeParse({ rut, password });

    if (!validationResult.success) {
      validationResult.error.errors.forEach(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      });
      return;
    }

    if (!document) {
      Toast.show({
        type: 'error',
        text1: 'Debe subir un documento en formato PDF.',
      });
      return;
    }


    console.log("dentro de send request rut= ",rut)

    await axios.post(`${API_BASE_URL}/requests/createRegistrationRequest`, {
      rut,
      password,
      document,
    })
    .then(response => {        
      navigation.navigate('Login', {
        showToast: true,
        text1: 'Registro exitoso',
        text2: 'Te has registrado correctamente.',
        messageType: 'success',
      });
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error de registro',
        text2: 'Hubo un problema con el registro. Inténtalo de nuevo.',
      });
      console.log(error);
    });
    

    
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Solo permite PDF
      });
  
      console.log("result", result);
  
      if (!result.canceled) {
        // Asegúrate de acceder correctamente al `uri` del primer archivo
        const uri = result.assets && result.assets[0] && result.assets[0].uri;
  
        if (uri) {
          // Convertir el archivo a Base64
          const base64Data = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
  
          setDocument(base64Data); // Guarda el archivo en Base64
          Toast.show({
            type: 'success',
            text1: 'Documento cargado exitosamente.',
          });
        } else {
          throw new Error("No se pudo obtener el URI del archivo.");
        }
      } else {
        Toast.show({
          type: 'info',
          text1: 'Carga de documento cancelada.',
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error al cargar el documento.',
        text2: error.message,
      });
    }
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
    backgroundColor: '#007acc',
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%', // Esto asegura que el botón ocupe todo el ancho disponible
  },
  buttonText: {
    color: '#fff',
    fontSize: 22, // Increased font size
    marginLeft: 10,
    fontFamily: 'Arial', // Changed font family
  },
});