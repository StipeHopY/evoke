import { View, StyleSheet, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useColorScheme from "@/common/hooks/useColorScheme";

type ScreenContainerType = ViewProps & {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: ScreenContainerType) => {
  const { top } = useSafeAreaInsets();
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingTop: top },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default ScreenContainer;
