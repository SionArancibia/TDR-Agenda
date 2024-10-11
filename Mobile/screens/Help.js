import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
        <Text style={styles.headerText}>Apartado de ayuda</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('agendar')}>
        <Text style={styles.buttonText}>como agendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('registrarse')}>
        <Text style={styles.buttonText}>como registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSelectedHelp('cambiarHora')}>
        <Text style={styles.buttonText}>como cambiar hora</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66A68B',
  },
  button: {
    backgroundColor: '#66C2A5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  contentContainer: {
    marginTop: 20,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default HelpScreen;