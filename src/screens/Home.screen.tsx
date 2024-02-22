import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Vibration, TouchableHighlight } from "react-native";

export const Home: React.FC = () => {

    const [buttonColor, setButtonColor] = useState<string>('green');
    const [recColor, setRecColor] = useState<string>('lightgreen');

    const handlePress = () => {
        Vibration.vibrate(10);
        setButtonColor(() => (
            buttonColor === 'green' ? 'blue' : 'green'
        ));
    }

    const handleMic = () => {
        setRecColor(() => (
            recColor === 'lightgreen' ? 'red' : 'lightgreen'
        ));
    }

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <View style={[styles.button, { backgroundColor: buttonColor }]} />
            </Pressable>
            <Pressable onPress={handleMic}>
                <View style={[styles.button, { backgroundColor: recColor }]} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    button: {
        height: 50,
        width: 100,
        borderColor: 'black',
        borderWidth: 1
    }
})