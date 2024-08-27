import { View, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className="mt-20 flex-1 items-center justify-center bg-white">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

