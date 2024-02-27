import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Vibration, Alert } from "react-native";

import { Audio, } from "expo-av";

export const Home: React.FC = () => {

    const [buttonColor, setButtonColor] = useState<string>('green');
    const [recColor, setRecColor] = useState<string>('lightgreen');
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    const handlePress = () => {
        Vibration.vibrate(10);
        setButtonColor(() => (
            buttonColor === 'green' ? 'blue' : 'green'
        ));
    }

    const startRecording = async () => {
        try {
            if (permissionResponse?.status !== 'granted') {
                console.log('Requesting Permission');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting Recording');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording Started', recording);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    }

    const stopRecording = async () => {
        console.log('Stopping Recording');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    };

    const handleMic = () => {
        setRecColor(() => (
            recColor === 'lightgreen' ? 'red' : 'lightgreen'
        ));
        if (recording) stopRecording();
        else startRecording();
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