import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import { store } from "@/store/store";
import Fonts from "@/constants/fonts";

import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const renderFonts = async () => {
    await Font.loadAsync(Fonts);
  };

  const prepare = async () => {
    try {
      await renderFonts();

      // NOTES: remove timeout

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.warn(error);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
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
