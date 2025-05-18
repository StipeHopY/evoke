import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";

import TabBar from "@/components/tabbar/TabBar";
import useColorScheme from "@/common/hooks/useColorScheme";

const tabbar = ["home", "chat", "create", "goals", "options"] ;

const TabLayout = () => {
  const theme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.main }]}>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabbar.map((tab) => (
          <Tabs.Screen key={tab} name={`${tab}/index`} />
        ))}
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
export default TabLayout;
