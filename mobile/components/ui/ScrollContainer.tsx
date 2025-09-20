import { ViewStyle, StyleSheet, ScrollView, View } from "react-native";
import React from "react";

type ScrollContainerType = {
  children: React.ReactNode;
  type: "row" | "column";
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  bounces?: boolean;
};

const ScrollContainer = ({
  children,
  style,
  type,
  contentContainerStyle,
  bounces = false,
}: ScrollContainerType) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={type === "row"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[styles.scroll, style]}
        bounces={bounces}
        contentContainerStyle={[
          styles.itemsContainer,
          contentContainerStyle,
          { flexDirection: type === "row" ? "row" : "column" },
        ]}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
  },
  itemsContainer: {
    gap: 10,
    alignItems: "center",
  },
  scroll: {
    flexGrow: 0,
  },
});

export default ScrollContainer;
