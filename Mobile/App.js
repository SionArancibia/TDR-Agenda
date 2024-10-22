import React from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Button, Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de que esté correctamente importado
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ForgotPasswordScreen from './screens/Rpassword';
import MainScreen from './screens/Main';
import MainScreen2 from './screens/ScheduleHours';
import ScheduledHours from './components/ScheduleC';
import MyHours from './screens/MyHours';
import HelpScreen from './screens/Help';
const Stack = createStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require('./assets/muni.png')}
                style={{ width: 100, height: 55 }} // Ajusta el tamaño
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center', // Centra la imagen en el header
          }}
        />

<Stack.Screen 
            name="Principal" 
            component={MainScreen} 
            options={{
              headerTitle: () => (
                <Image
                  source={require('./assets/muni.png')}
                  style={{ width: 100, height: 50 }} // Ajusta el tamaño 
                  resizeMode="contain"
                />
              ),
              headerTitleAlign: 'center', // Centra la imagen en el header
              gestureEnabled: false,
              headerLeft: () => null, // No mostrar flecha para volver atrás
            }}
          />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require('./assets/muni.png')}
                style={{ width: 100, height: 50 }} // Ajusta el tamaño
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Rpassword"
          component={ForgotPasswordScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require('./assets/muni.png')}
                style={{ width: 100, height: 50 }} // Ajusta el tamaño
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="GenericScreen"
          component={MainScreen2}
          options={{
            headerTitle: () => (
              <Image
                source={require('./assets/muni.png')}
                style={{ width: 100, height: 50 }} // Ajusta el tamaño
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center', // Centra la imagen en el header
          }}
        />
                  <Stack.Screen 
            name="Help"  
            component={HelpScreen}  
            options={{
              headerTitle: () => (
                <Image
                  source={require('./assets/muni.png')}
                  style={{ width: 100, height: 50 }} // Ajusta el tamaño 
                  resizeMode="contain"
                />
              ),
              headerTitleAlign: 'center', // Centra la imagen en el header
            }}
          />

        <Stack.Screen name="Horas" component={ScheduledHours} />
        <Stack.Screen name="MyHours" component={MyHours} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
