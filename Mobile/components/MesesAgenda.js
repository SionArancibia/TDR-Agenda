import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';

const MesesAgenda = () => {
  const [meses] = useState([
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]);

  const [mesSeleccionado, setMesSeleccionado] = useState(0);
  const [citas, setCitas] = useState([]);

  // Función para obtener las horas filtradas por mes
  const obtenerCitasPorMes = async (mes) => {
    try {
      const response = await fetch(`http://localhost:3000/horas?mes=${mes}`);
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  useEffect(() => {
    // Convierte el índice del mes seleccionado a un formato válido (por ejemplo, '01' para enero)
    const mesNumerico = (mesSeleccionado + 1).toString().padStart(2, '0');
    obtenerCitasPorMes(mesNumerico);
  }, [mesSeleccionado]);

  const seleccionarMes = (index) => {
    setMesSeleccionado(index);
  };

  const avanzarMes = () => {
    if (mesSeleccionado < meses.length - 1) {
      setMesSeleccionado(mesSeleccionado + 1);
    }
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {meses.map((mes, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.botonMes, mesSeleccionado === index && styles.mesSeleccionado]}
            onPress={() => seleccionarMes(index)}
          >
            <Text style={styles.textoMes}>{mes}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.botonAvanzar} onPress={avanzarMes}>
          <Text style={styles.flecha}>{'>'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Mostrar citas filtradas */}
      <FlatList
        data={citas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.citaCard}>
            <Text style={styles.citaText}>Hora: {item.hora}</Text>
            <Text style={styles.citaText}>Nombre: {item.nombre}</Text>
            <Text style={styles.citaText}>Fecha: {item.fecha}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay citas disponibles para este mes</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {},
  botonMes: {
    backgroundColor: '#49BA98',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  textoMes: {
    color: '#fff',
    fontSize: 16,
  },
  mesSeleccionado: {
    backgroundColor: '#369377',
  },
  botonAvanzar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#49BA98',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  flecha: {
    color: '#fff',
    fontSize: 18,
  },
  citaCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  citaText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MesesAgenda;
