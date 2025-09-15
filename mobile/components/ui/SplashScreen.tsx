import { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

import blackIcon from "@/assets/images/evoke-icon-loader-black.png";
import whiteIcon from "@/assets/images/evoke-icon-loader-white.png";
import useColorScheme from "@/common/hooks/useColorScheme";

const SplashScreen = () => {
  const theme = useColorScheme();
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View
        style={{
          opacity: fadeAnimation,
        }}
      >
        <Image
          style={styles.image}
          source={theme.selectedTheme === "light" ? blackIcon : whiteIcon}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
