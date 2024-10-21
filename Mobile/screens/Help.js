import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';  

const HelpScreen = () => {
  const [selectedHelp, setSelectedHelp] = useState(null);

  const renderContent = () => {
    switch (selectedHelp) {
      case 'agendar':
        return (
          <View>
            <Text style={styles.helpTitle}>Pasos para agendar:</Text>
            <Text style={styles.helpText}>1. Abre la app.</Text>
            <Text style={styles.helpText}>2. Ve a la sección de agendar.</Text>
            <Text style={styles.helpText}>3. Selecciona una hora disponible.</Text>
            <Text style={styles.helpText}>4. Confirma tu agendamiento.</Text>
          </View>
        );
      case 'registrarse':
        return (
          <View>
            <Text style={styles.helpTitle}>Pasos para registrarse:</Text>
            <Text style={styles.helpText}>1. Abre la app y selecciona "Registrarse".</Text>
            <Text style={styles.helpText}>2. Ingresa tu información personal.</Text>
            <Text style={styles.helpText}>3. Verifica tu correo electrónico.</Text>
          </View>
        );
      case 'cambiarHora':
        return (
          <View>
            <Text style={styles.helpTitle}>Pasos para cambiar la hora:</Text>
            <Text style={styles.helpText}>1. Ve a la sección "Mis Agendamientos".</Text>
            <Text style={styles.helpText}>2. Selecciona el agendamiento que deseas modificar.</Text>
            <Text style={styles.helpText}>3. Elige una nueva hora disponible.</Text>
            <Text style={styles.helpText}>4. Confirma el cambio.</Text>
          </View>
        );
      default:
        return <Text style={styles.instructionText}>Selecciona una opción de ayuda para ver los pasos.</Text>;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="help-circle-outline" size={60} color="#66A68B" />
        <Text style={styles.headerText}>Apartado de Ayuda</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('agendar')}>
        <View style={styles.buttonContent}>  
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cómo agendar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('registrarse')}>
        <View style={styles.buttonContent}>  
          <Ionicons name="person-add-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cómo registrarse</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('cambiarHora')}>
        <View style={styles.buttonContent}>  
          <Ionicons name="time-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cómo cambiar hora</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#66A68B',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#66C2A5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',  
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10, 
  },
  contentContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    lineHeight: 24,
  },
  instructionText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  content: {
    marginBottom: 15,
  },
});

export default HelpScreen;