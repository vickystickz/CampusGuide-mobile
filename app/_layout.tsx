import MapProvider from "@/context/MapContext";
import { ROUTES } from "@/utils/data";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <MapProvider>
          <Stack>
            <Stack.Screen name={ROUTES.HOME} />
            <Stack.Screen name={ROUTES.DIRECTIONS} />
            <Stack.Screen name={ROUTES.ROUTE} />
          </Stack>
        </MapProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
