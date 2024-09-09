import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RegisterScreen() {
  const [rut, setRut] = useState('');
  const [file, setFile] = useState(null);
  const [Password, setPassword] = useState('');

  const handleRegister = () => {
    if (!rut) {
      Alert.alert('Error', 'Por favor ingrese su RUT.');
      return;
    }
    if (!Password) {
      Alert.alert('Error', 'Por favor ingrese una Contraseña.');
      return;
    }

    if (!file) {
      Alert.alert('Error', 'Por favor seleccione un archivo.');
      return;
    }

    Alert.alert('Registro Exitoso', `RUT: ${rut}\nArchivo: ${file.name}\ncontraseña: ${Password}`);
  };

  const handleFilePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    } else {
      Alert.alert('Error', 'No se seleccionó ningún archivo.');
    }
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Text style={styles.label}>Ingrese su RUT:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 12345678-9"
        value={rut}
        onChangeText={setRut}
        keyboardType="default"
      />
      <TextInput
      style={styles.input}
      placeholder='Contraseña'
      value={Password}
      onChangeText={setPassword}   
      keyboardType='default'
      >
      </TextInput>



      <TouchableOpacity style={styles.archivoButton} onPress={handleFilePicker}>
        <Icon name="sign-in" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Subir Archivo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Icon name="sign-in" size={25} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Registrase</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#f2f2f2',  // Fondo suave
  },
  label: {
    fontSize: 22,
    color: '#333333',  // Texto oscuro para mejor contraste
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007acc',  // Azul accesible para bordes
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  archivoButton: {
    backgroundColor: '$fff',
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
  fileText: {
    fontSize: 16,
    color: '#333333',  // Texto oscuro
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
