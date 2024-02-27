import React, { useEffect, useState } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import * as Application from 'expo-application';
import { Audio } from 'expo-av';
import Meyda from 'meyda';

export function Voice() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [RMS, setRMS] = useState<number | undefined>(undefined);
    let ZCR: number | undefined;

    useEffect(() => {
        const requestAudioPermission = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access the microphone is required!');
            }
        };
        requestAudioPermission();

        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });
    }, []);

    useEffect(() => {
        if (recording && isAnalyzing) {
            recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
        }
    }, [recording, isAnalyzing]);

    const startRecording = async () => {
        try {
            const recordingStream = new Audio.Recording();
            await recordingStream.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            recordingStream.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
            await recordingStream.startAsync();
            setRecording(recordingStream);
            console.log('Recording Stream', recordStream);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                setRecording(null);
            }
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    };

    const onRecordingStatusUpdate = async (status: Audio.RecordingStatus) => {
        if (status.isRecording && isAnalyzing) {
            const audioData = status.data;
            // Perform real-time audio analysis using Meyda or other libraries
            const features = Meyda.extract(['rms', 'zcr'], audioData);
            console.log('Audio features:', features);
            setRMS(features?.rms);
            ZCR = features?.zcr;
            console.log('Features', features.rms);
        }
    };

    const toggleAnalyzing = () => {
        setIsAnalyzing((prev) => !prev);
    };

    useEffect(() => {
        console.log('UseEffecrt Recording', recording)
    }, [recording])

    const appName = Application.applicationName;

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title={isAnalyzing ? 'Stop Analyzing' : 'Start Analyzing'}
                    onPress={toggleAnalyzing}
                    disabled={!recording}
                />
                <Button title="Start Recording" onPress={startRecording} disabled={recording !== null} />
                <Button title="Stop Recording" onPress={stopRecording} disabled={recording === null} />
            </View>
            <View>
                <Text>
                    {appName}
                </Text>
            </View>

            <View>
                <Text>RMS Levels: {RMS}</Text>
                <Text>ZCR: {ZCR}</Text>
                <Text>IsAnalyzing: {isAnalyzing ? 'true' : 'false'}</Text>
            </View>
        </>
    );
}
