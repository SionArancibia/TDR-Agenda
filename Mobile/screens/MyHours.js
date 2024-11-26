import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_BASE_URL from '../utils/api';

export default function MyHours() {
  const [horas, setHoras] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar carga

  useEffect(() => {
    const fetchAppointmentsAndProfessionals = async () => {
      try {
        const storedPatientId = await AsyncStorage.getItem('patientId');
        if (!storedPatientId) {
          console.error('No se encontró patientId en el almacenamiento.');
          return;
        }

        // Obtener citas del paciente
        const response = await axios.get(`${API_BASE_URL}/appointments/patient/${storedPatientId}`);

        // Obtener los nombres de los profesionales para cada cita
        const updatedAppointments = await Promise.all(
          response.data.map(async (appointment) => {
            try {
              const professionalResponse = await axios.get(
                `${API_BASE_URL}/users/getUser/${appointment.professional.userId}`
              );
              return {
                ...appointment,
                professionalName: `${professionalResponse.data.firstName} ${professionalResponse.data.lastName}`,
              };
            } catch (error) {
              console.error('Error al obtener datos del profesional:', error);
              return { ...appointment, professionalName: 'Desconocido' };
            }
          })
        );

        setHoras(updatedAppointments);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndProfessionals();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Horas Agendadas</Text>
      <FlatList
        data={horas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Profesional: {item.professionalName}</Text>
              <Text style={styles.time}>
                {new Date(item.date).toLocaleDateString()} - {new Date(item.date).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#49BA98',
    fontFamily: 'Arial',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Arial',
  },
  time: {
    fontSize: 20,
    color: '#666',
    fontFamily: 'Arial',
  },
});
