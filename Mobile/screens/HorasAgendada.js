import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const horas = [
  { id: '1', hora: '08:00 AM' },
  { id: '2', hora: '09:00 AM' },
  { id: '3', hora: '10:00 AM' },
  { id: '4', hora: '11:00 AM' },
  { id: '5', hora: '12:00 PM' },
  { id: '6', hora: '01:00 PM' },
  { id: '7', hora: '02:00 PM' },
  { id: '8', hora: '03:00 PM' },
  { id: '9', hora: '04:00 PM' },
  { id: '10', hora: '05:00 PM' },
];

export default function HorasScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={horas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.hora}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#49BA98',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});