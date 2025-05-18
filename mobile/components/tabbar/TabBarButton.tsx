import { Pressable, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RouteName } from "@/types";
import Icons from "./Icons";
import useColorScheme from "@/common/hooks/useColorScheme";

type TabBarButtonProps = {
  isFocused: boolean;
  label: string;
  routeName: RouteName;
  onPress: () => void;
  onLongPress: () => void;
};

const TabBarButton = (props: TabBarButtonProps) => {
  const { isFocused, routeName } = props;
  const scale = useSharedValue(0);
  const theme = useColorScheme();

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.25]) }],
      top: interpolate(scale.value, [0, 1], [0, 4]),
    };
  });

  return (
    <Pressable {...props} style={styles.button}>
      <Animated.View style={animatedIconStyle}>
        <Icons
          color={isFocused ? theme.colors.active : theme.colors.inactive}
          routeName={routeName}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBarButton;
