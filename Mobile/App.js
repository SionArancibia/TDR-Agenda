import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ForgotPasswordScreen from './screens/Rpassword';
import MainScreen from './screens/Principal';
import MainScreen2 from './screens/AgendarHora';
import HorasScreen from './screens/HorasAgendada';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen name="Horas" component={HorasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
