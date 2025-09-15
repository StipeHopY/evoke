import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

type LoaderProps = {
  style?: ViewStyle;
};

const Loader = ({ style }: LoaderProps) => {
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ActivityIndicator size={16} color={theme.colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Loader;
