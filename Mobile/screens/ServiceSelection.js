import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import API_BASE_URL from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceSelection({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Obtener servicios desde el backend
    axios.get(`${API_BASE_URL}/services`) //http://192.168.1.6:3000 `${API_BASE_URL}/services`
      .then(response => setServices(response.data))
      .catch(error => console.error('Error al obtener servicios:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seleccione un Servicio</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={async () => {
              const patientId = await AsyncStorage.getItem('patientId'); // O la clave que estés utilizando
              console.log("patientid ", patientId)
              navigation.navigate('Horas', { serviceId: item.id, patientId });
            }}
          >
            <Text style={styles.serviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay servicios disponibles</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  serviceButton: {
    padding: 35,
    backgroundColor: '#49BA98',
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
