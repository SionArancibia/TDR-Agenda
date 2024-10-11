import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default function ForgotPasswordScreen() {
    const [idNumber, setIdNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        if (!idNumber) {
            Alert.alert("Error", "Por favor ingrese su RUT.");
            return;
        }
        if (!email) {
            Alert.alert("Error", "Por favor ingrese su correo electrónico.");
            return;
        }

        Alert.alert("Solicitud Enviada", `RUT: ${idNumber}\nCorreo: ${email}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.label}>Ingrese su RUT:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: 12345678-9"
                value={idNumber}
                onChangeText={setIdNumber}
                keyboardType="default"
            />
            <Text style={styles.label}>Ingrese su Correo Electrónico:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: usuario@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
            >
                <Icon name="envelope" size={25} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Enviar Solicitud</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        justifyContent: "center",
        fontSize: 40,
        textAlign: "center",
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
    },
    label: {
        fontSize: 22,
        color: "#333333",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#007acc",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: "#fff",
        fontSize: 18,
    },
    resetButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#28a745",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});