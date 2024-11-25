import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function MyHours() {
  const [horas, setHoras] = useState([]); // Estado para guardar las citas

  const obtenerCitas = async () => {
    try {
      const response = await fetch('http://localhost:3000/horas'); // Ajusta el endpoint
      const data = await response.json(); // Asegúrate que devuelve un array de objetos
      setHoras(data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  useEffect(() => {
    obtenerCitas(); // Llama a la función cuando se monta el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Horas Agendadas</Text>
      <FlatList
        data={horas} // Lista de citas
        keyExtractor={(item) => item.id.toString()} // Ajusta el identificador según tu base de datos
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Imagen */}
            <Image
              source={{ uri: item.imagen || 'https://via.placeholder.com/70' }}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#49BA98',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
