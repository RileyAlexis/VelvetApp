import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is my React Native Application</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});