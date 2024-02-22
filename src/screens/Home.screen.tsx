import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Vibration, TouchableHighlight } from "react-native";


export const Home: React.FC = () => {

    const [buttonColor, setButtonColor] = useState<string>('green');
    const handlePress = () => {
        Vibration.vibrate(10);
        setButtonColor(() => (
            buttonColor === 'green' ? 'blue' : 'green'
        ));
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <View style={[styles.button, { backgroundColor: buttonColor }]} />
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