import { StyleSheet, Text, View, Button } from "react-native";
import { useSelector } from "react-redux";

import ScreenContainer from "@/components/ui/ScreenContainer";
import { RootState } from "@/store/store";
import useColorScheme from "@/common/hooks/useColorScheme";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const { theme, colors, toggleTheme } = useColorScheme();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
         {user ? `What's up ${user.username}` : "Hi 👋"}
        </Text>
        <Button
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onPress={toggleTheme}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});

export default HomeScreen;
