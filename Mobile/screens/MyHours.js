import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function MyHours() {
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    // Datos simulados
    const fakeData = [
      {
        id: 1,
        imagen: 'https://via.placeholder.com/70',
        profesional: 'Víctor Baldes',
        fecha: '03/10/2025',
        hora: '16:30-17:30',
        servicio: 'Peluquería',
      },
      {
        id: 2,
        imagen: 'https://via.placeholder.com/70',
        profesional: 'Víctor Baldes',
        fecha: '03/04/2025',
        hora: '15:30-16:30',
        servicio: 'Podólogo',
      },
    ];
    setHoras(fakeData);
  }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.header}>Mis Horas Agendadas</Text>

      {/* Lista de Horas */}
      <FlatList
        data={horas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Imagen */}
            <Image
              source={{ uri: item.imagen }}
              style={styles.image}
            />
            {/* Información */}
            <View style={styles.info}>
              <Text style={styles.date}>{item.fecha}</Text>
              <Text style={styles.time}>{item.hora}</Text>
              <Text style={styles.service}>Hora: {item.servicio}</Text>
              <Text style={styles.professional}>Profesional: {item.profesional}</Text>
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
    padding: 16,
  },
  header: {
    fontSize: 32, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#49BA98',
    fontFamily: 'Arial', // Changed font family
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  service: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  professional: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});
