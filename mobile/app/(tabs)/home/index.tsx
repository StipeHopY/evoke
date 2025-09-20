import { View, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

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
      <Animatable.View style={{backgroundColor: "red"}} animation="bounceInLeft" duration={1000}>
        <Text>Animation Example!</Text>
      </Animatable.View>
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
