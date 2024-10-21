import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import MesesAgenda from './MesesAgenda';

export default function ScheduledHours({ route }) {
  const { title } = route.params;
  const section = title; // Usar el título como la sección
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  useEffect(() => {
    axios.get(`http://172.16.167.175:3000/fechas?seccion=${section}`) // Cambiar por su ip para que funcione en expogo etc
      .then(response => {
        setDates(response.data);
        setSelectedDate(response.data[0]); // Selecciona la primera fecha por defecto
      })
      .catch(error => {
        console.error(error);
      });
  }, [section]);

  useEffect(() => {
    if (selectedDate) {
      axios.get(`http://172.16.167.175:3000/horas?seccion=${section}`) // Cambiar por su ip para que funcione en expogo etc
        .then(response => {
          setHours(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedDate, section]);

  const openModal = (hour) => {
    setSelectedHour(hour);
    setModalVisible(true);
  };

  const confirmBooking = () => {
    const user = 'usuario_demo'; 

    axios.post('http://172.16.167.175:3000/agendar', {
      fecha: new Date(selectedHour.fecha).toISOString(), // Convertir la fecha a ISO-8601
      hora: selectedHour.hora,
      profesional: selectedHour.nombre,
      usuario: user,
    })
    .then(response => {
      console.log('Cita agendada:', response.data);
      setModalVisible(false);
    })
    .catch(error => {
      console.error('Error al agendar la cita:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <MesesAgenda />
      {/* Sección de Fechas con Scroll Horizontal */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        {dates.map((date, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDate(date)} style={[
            styles.dateButton, selectedDate === date && styles.selectedDateButton]}>
            <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Psicólogos */}
      <FlatList
        data={hours.filter(hour => hour.fecha === selectedDate)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.time}>{item.hora}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
              <Text style={styles.buttonText}>Agendar</Text>
              <Icon name="schedule" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para confirmar la hora */}
      {selectedHour && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Confirmar Cita</Text>
              <Text style={styles.modalText}>Fecha: {selectedHour.fecha}</Text>
              <Text style={styles.modalText}>Hora: {selectedHour.hora}</Text>
              <Text style={styles.modalText}>Profesional: {selectedHour.nombre}</Text>

              {/* Botones de Confirmar y Cerrar */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#49BA98',
  },
  dateScroll: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#E0F7EF',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#49BA98',
  },
  dateText: {
    color: '#49BA98',
    fontSize: 14,
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#49BA98',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#49BA98',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});