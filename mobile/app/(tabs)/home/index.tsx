import { View, StyleSheet } from "react-native";

import ScreenContainer from "@/components/ui/ScreenContainer";
import Header from "@/components/home/Header";
import TasksContainer from "@/components/tasks/TasksContainer";

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Header />
        <TasksContainer />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    textAlign: "left",
    paddingHorizontal: 20,
    gap: 20,
  },
});

export default HomeScreen;
