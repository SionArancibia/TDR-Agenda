import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de tener instalada esta librería con 'npm install react-native-vector-icons'

const horas = [
  {
    id: '1',
    nombre: 'Mateo Vargas León',
    hora: '15:30-16:30',
    imagen: '', // Aquí backend
  },
  {
    id: '2',
    nombre: 'Sebastián Bravo Contreras',
    hora: '15:30-16:30',
    imagen: '',
  },
  {
    id: '3',
    nombre: 'Valeria Gómez Rivas',
    hora: '18:30-19:30',
    imagen: 'https://example.com/valeria.jpg',
  },
];

const fechas = ['Agosto 23', 'Agosto 24', 'Agosto 25', 'Agosto 26'];//ejemplos

export default function HorasScreen({ route }) {
  const { title } = route.params;
  const [selectedDate, setSelectedDate] = useState(fechas[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      
      {/* Sección de Fechas */}
      <View style={styles.dateContainer}>
        {fechas.map((fecha, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDate(fecha)} style={styles.dateButton}>
            <Text style={[styles.dateText, selectedDate === fecha && styles.selectedDate]}>{fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Lista de Psicólogos */}
      <FlatList
        data={horas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.time}>{item.hora}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Agendar</Text>
              <Icon name="schedule" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#49BA98',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#49BA98',
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedDate: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#49BA98',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginRight: 5,
  },
});
