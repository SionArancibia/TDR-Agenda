import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import API_BASE_URL from '../utils/api';

const AppointmentsByService = ({route}) => {
  const { serviceId, patientId } = route.params;
  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mes actual
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    const fetchAppointmentsAndProfessionals = async () => {
      try {
        console.log("service id", serviceId);
  
        // Obtener citas disponibles filtradas por servicio
        const response = await axios.get(`${API_BASE_URL}/appointments/availableByService/${serviceId}`);
        const filteredAppointments = response.data.filter((appointment) => {
          const appointmentMonth = new Date(appointment.date).getMonth() + 1;
          return appointmentMonth === selectedMonth;
        });
  
        // Agregar datos del profesional a cada cita
        const updatedAppointments = await Promise.all(
          filteredAppointments.map(async (appointment) => {
            try {
              const professionalResponse = await axios.get(`${API_BASE_URL}/users/getUser/${appointment.professional.userId}`);
              return {
                ...appointment,
                professionalName: `${professionalResponse.data.firstName} ${professionalResponse.data.lastName}`, // Ajusta según el atributo correcto
              };
            } catch (error) {
              console.error('Error al obtener datos del profesional:', error);
              return { ...appointment, professionalName: 'Desconocido' };
            }
          })
        );
  
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error('Error al obtener citas:', error);
      }
    };
  
    fetchAppointmentsAndProfessionals();
  }, [selectedMonth, serviceId]);

  // Manejar la selección de una cita
  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
  };

  // Confirmar agendamiento de la cita
  const confirmAppointment = () => {
    if (selectedAppointment) {
      console.log("asignar cita selectedAppointment.id ",selectedAppointment.id)
      console.log("id paciente cita seleccionada: ", patientId)
      axios
        .put(`${API_BASE_URL}/appointments/assign-patient/${selectedAppointment.id}`, { patientId })
        .then((response) => {
          console.log('Cita asignada con éxito:', response.data);
          setModalVisible(false);
          setAppointments((prev) =>
            prev.filter((appointment) => appointment.id !== selectedAppointment.id)
          );
        })
        .catch((error) => {
          console.error('Error al asignar cita:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citas Disponibles</Text>

      {/* Filtro por Mes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthsContainer}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.monthButton,
              selectedMonth === index + 1 && styles.selectedMonthButton,
            ]}
            onPress={() => setSelectedMonth(index + 1)}
          >
            <Text
              style={[
                styles.monthText,
                selectedMonth === index + 1 && styles.selectedMonthText,
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Citas */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.appointmentCard}
            onPress={() => handleSelectAppointment(item)}
          >
            <Text style={styles.cardText}>Fecha: {new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.cardText}>Hora: {formatDate(item.date).split(",")[1]}</Text>
            <Text style={styles.cardText}>Profesional: {item.professionalName || 'Cargando...'}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noAppointments}>No hay citas disponibles para este mes</Text>}
      />

      {/* Modal para confirmar la cita */}
      {selectedAppointment && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Confirmar Cita</Text>
              <Text style={styles.modalText}>
                Fecha: {new Date(selectedAppointment.date).toLocaleDateString()}
              </Text>
              <Text style={styles.modalText}>Hora: {formatDate(selectedAppointment.date).split(",")[1]}</Text>
              <Text style={styles.modalText}>Profesional: {selectedAppointment.professionalName}</Text>

              {/* Botones */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmAppointment}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#49BA98' },
  monthsContainer: { flexDirection: 'row', marginBottom: 20 },
  monthButton: {
    paddingVertical: 15, // Aumentar padding
    paddingHorizontal: 20,
    height: 60, // Altura más grande
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  selectedMonthButton: { backgroundColor: '#49BA98' },
  monthText: { color: '#333', fontSize: 16 }, // Aumentar fuente
  selectedMonthText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  appointmentCard: {
    padding: 10, // Reducir padding
    marginVertical: 5, // Reducir margen entre citas
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  cardText: { fontSize: 16, marginBottom: 5 },
  noAppointments: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { width: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalText: { fontSize: 16, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  confirmButton: { padding: 10, backgroundColor: '#49BA98', borderRadius: 8 },
  confirmButtonText: { color: '#fff', fontSize: 16 },
  cancelButton: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 8 },
  cancelButtonText: { color: '#333', fontSize: 16 },
});

export default AppointmentsByService;
