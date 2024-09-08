import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function RegisterScreen() {
  const [rut, setRut] = useState('');
  const [file, setFile] = useState(null);

  const handleRegister = () => {
    if (!rut) {
      Alert.alert('Error', 'Por favor ingrese su RUT.');
      return;
    }

    if (!file) {
      Alert.alert('Error', 'Por favor seleccione un archivo.');
      return;
    }

    Alert.alert('Registro Exitoso', `RUT: ${rut}\nArchivo: ${file.name}`);
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
      <Text style={styles.label}>Ingrese su RUT:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 12345678-9"
        value={rut}
        onChangeText={setRut}
        keyboardType="default"
      />

      <Button title="Subir Archivo" onPress={handleFilePicker} color="#007acc" />
      {file && <Text style={styles.fileText}>Archivo seleccionado: {file.name}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Registrarse" onPress={handleRegister} color="#28a745" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  fileText: {
    fontSize: 16,
    color: '#333333',  // Texto oscuro
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
