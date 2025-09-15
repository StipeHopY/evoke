import { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Square, SquareCheck } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

const AttachedItem = () => {
  const theme = useColorScheme();

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const toggleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <Pressable
      onPress={toggleSelect}
      style={[styles.item, { borderColor: theme.colors.border }]}
    >
      <Text
        style={[styles.itemTitle, { color: theme.colors.text }]}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        Some content here to attach to an item. You can add more
      </Text>
      {isSelected ? (
        <SquareCheck size={26} color={theme.colors.text} />
      ) : (
        <Square size={26} color={theme.colors.buttonBgColor} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    maxWidth: "100%",
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    gap: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default AttachedItem;
