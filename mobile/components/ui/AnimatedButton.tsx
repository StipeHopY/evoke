import { useRef } from "react";
import { Text, Animated, Pressable, StyleSheet, ViewStyle } from "react-native";
import { UseFormHandleSubmit } from "react-hook-form";

import useColorScheme from "@/common/hooks/useColorScheme";

type UsernameType = {
  username: string;
};

type AnimatedButtonProps = {
  label: string;
  isForm?: boolean;
  disabled?: boolean;
  isLoading: boolean;
  value?: string[] | string | undefined;
  handleSubmit?: UseFormHandleSubmit<UsernameType>;
  onSubmit?: (data: UsernameType) => void;
  onPress?: () => void;
  style?: ViewStyle;
};

const AnimatedButton = ({
  label,
  disabled = false,
  handleSubmit,
  isLoading,
  value,
  onSubmit,
  onPress,
  style,
}: AnimatedButtonProps) => {
  const theme = useColorScheme();
  const animated = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onPressButton = () => {
    if (handleSubmit && onSubmit) {
      handleSubmit(onSubmit)();
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={onPressButton}
      disabled={isLoading || disabled}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale: animated }],
            backgroundColor:
              isLoading || disabled
                ? theme.colors.disabled
                : theme.colors.buttonBgColor,
          },
          style,
        ]}
      >
        <Text
          style={[styles.buttonText, { color: theme.colors.buttonTextColor }]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "red",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AnimatedButton;
