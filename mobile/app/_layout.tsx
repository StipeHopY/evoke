import * as Font from "expo-font";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import "../global.css";
import { store } from "@/store/store";
import Fonts from "@/constants/fonts";
import SplashScreen from "@/components/ui/SplashScreen";
import { dbName } from "@/constants/data";
import { handleError } from "@/utils/handleError";
import ScreenContainer from "@/components/ui/ScreenContainer";
import Error from "@/components/ui/Error";
import migrations from "@/drizzle/migrations";
import { db, tasks, labels } from "@/db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const RootLayout = () => {
  const { success, error: migrationError } = useMigrations(db, migrations);

  const [appIsReady, setAppIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetDb = async () => {
    const dbPath = FileSystem.documentDirectory + "SQLite/" + dbName;

    try {
      const info = await FileSystem.getInfoAsync(dbPath);
      if (info.exists) {
        await FileSystem.deleteAsync(dbPath, { idempotent: true });
        console.log("✅ Database deleted:", dbPath);
      } else {
        console.log("ℹ️ No existing database found at", dbPath);
      }
    } catch (err) {
      console.error("❌ Failed to delete DB:", err);
    }
  };

  // useEffect(() => {
  //   resetDb();
  // }, []);

  const handlePrepareApp = async () => {
    try {
      await Font.loadAsync(Fonts);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: remove this
      // await AsyncStorage.removeItem("labels");
      // await db.delete(labels);
      // await db.delete(tasks);

      setError(null);
    } catch (err) {
      const errMessage = handleError(err);
      setError(errMessage);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    if (success) {
      handlePrepareApp();
    }
    if (migrationError) {
      setError("Migration failed");
    }
  }, [success]);

  if (error) {
    return (
      <ScreenContainer>
        <Error message={error} setMessage={setError} isModal={true} />
      </ScreenContainer>
    );
  }

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <SQLiteProvider
      databaseName={dbName}
      options={{ enableChangeListener: true }}
    >
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </Provider>
    </SQLiteProvider>
  );
};

export default RootLayout;
