import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { store } from "@/store/store";
import Fonts from "@/constants/fonts";

import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  // TODO: remove after testing
  // const [keys, setKeys] = useState<string[]>([]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleRenderFonts = async () => {
    await Font.loadAsync(Fonts);
  };

  const handlePrepareApp = async () => {
    try {
      // TODO: remove this when you finish testing
      // await AsyncStorage.removeItem("labels");
      // await AsyncStorage.removeItem("tasks");
      // await AsyncStorage.removeItem("user");
      // const keysStore = await AsyncStorage.getAllKeys();
      // if (keysStore) {
      //   setKeys(Array.from(keysStore));
      // }
      await handleRenderFonts();

      // NOTES: remove timeout

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      throw new Error("Something went wrong");
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    handlePrepareApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
