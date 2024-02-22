import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Vibration } from "react-native";

import LiveAudioStream from 'react-native-live-audio-stream';

export const Home: React.FC = () => {

    const [buttonColor, setButtonColor] = useState<string>('green');
    const [recColor, setRecColor] = useState<string>('lightgreen');
    let micData = '0';

    const options = {
        sampleRate: 32000,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 6,
        bufferSize: 4096
    }


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
        recColor === 'lightgreen' ? LiveAudioStream.start() : LiveAudioStream.stop();
    }

    useEffect(() => {

        LiveAudioStream.init(options);
        micData = LiveAudioStream.on('data', data => {
        })
    }, []);

    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <View style={[styles.button, { backgroundColor: buttonColor }]} />
            </Pressable>
            <Pressable onPress={handleMic}>
                <View style={[styles.button, { backgroundColor: recColor }]} />
            </Pressable>
            <View>
                <Text>
                    {micData}
                </Text>
            </View>
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