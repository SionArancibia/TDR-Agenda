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
    axios.get(`http://192.168.1.20:3000/mis-horas?usuario=${usuario}`)
      .then(response => {
        setHoras(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
  name: {
    fontSize: 22, // Increased font size
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Arial', // Changed font family
  },
  time: {
    fontSize: 20, // Increased font size
    color: '#666',
    fontFamily: 'Arial', // Changed font family
  },
  professional: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});
