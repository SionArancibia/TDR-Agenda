import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MesesAgenda = () => {
  const [meses, setMeses] = useState(['Agosto', 'Septiembre', 'Octubre', 'Noviembre']);
  const [mesSeleccionado, setMesSeleccionado] = useState(0);

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
      <Text style={styles.titulo}>Horas agendadas</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
  
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
   
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'medium',
    marginBottom: 10,

  },
  scroll: {


  },
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
});

export default MesesAgenda;
