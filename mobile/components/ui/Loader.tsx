import { View, ActivityIndicator, StyleSheet } from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

type LoaderType = {
    loading?: boolean
}

const Loader = ({ loading }: LoaderType) => {
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ActivityIndicator color={theme.colors.text} />
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
