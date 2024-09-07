import MapProvider from "@/context/MapContext";
import { ROUTES } from "@/utils/data";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <MapProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name={ROUTES.HOME} options={{
                headerShown: false
              }} />
              <Stack.Screen name={ROUTES.DIRECTIONS} options={{
                headerShown: false
              }} />
              <Stack.Screen name={ROUTES.ROUTE} options={{
                headerShown: false
              }} />
            </Stack>
          </SafeAreaProvider>
        </MapProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
