import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function HorasAgendada({ route }) {
  const { title } = route.params;
  const seccion = title; // Usar el título como la sección
  const [selectedDate, setSelectedDate] = useState(null);
  const [fechas, setFechas] = useState([]);
  const [horas, setHoras] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHora, setSelectedHora] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/fechas?seccion=${seccion}`)
      .then(response => {
        setFechas(response.data);
        setSelectedDate(response.data[0]); // Selecciona la primera fecha por defecto
      })
      .catch(error => {
        console.error(error);
      });
  }, [seccion]);

  useEffect(() => {
    if (selectedDate) {
      axios.get(`http://localhost:3000/horas?seccion=${seccion}`)
        .then(response => {
          setHoras(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedDate, seccion]);

  const openModal = (hora) => {
    setSelectedHora(hora);
    setModalVisible(true);
  };

  const confirmBooking = () => {
    // Aquí puedes agregar la lógica para confirmar la reserva (API call, etc.)
    console.log(`Reserva confirmada para ${selectedHora.nombre} el ${selectedHora.fecha} a las ${selectedHora.hora}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      {/* Sección de Fechas con Scroll Horizontal */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        {fechas.map((fecha, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDate(fecha)} style={[
            styles.dateButton, selectedDate === fecha && styles.selectedDateButton]}>
            <Text style={[styles.dateText, selectedDate === fecha && styles.selectedDateText]}>{fecha}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Psicólogos */}
      <FlatList
        data={horas.filter(hora => hora.fecha === selectedDate)}
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
      {selectedHora && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Confirmar Cita</Text>
              <Text style={styles.modalText}>Fecha: {selectedHora.fecha}</Text>
              <Text style={styles.modalText}>Hora: {selectedHora.hora}</Text>
              <Text style={styles.modalText}>Profesional: {selectedHora.nombre}</Text>

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
    flex: 1,
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
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E0F7EF',
    marginHorizontal: 5,
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
