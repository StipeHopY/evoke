import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

type SelectButtonProps = {
  label?: string;
  Icon?: React.ElementType;
  children?: React.ReactNode;
  isSelected?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  isAddButton?: boolean;
};

const SelectButton = ({
  isSelected,
  label,
  Icon,
  children,
  onPress,
  onLongPress,
  disabled,
  isAddButton = false,
}: SelectButtonProps) => {
  const theme = useColorScheme();
  return (
    <Pressable
      style={[
        styles.shortcutCalendar,
        {
          opacity: disabled ? 0.5 : 1,
          borderColor: isSelected && !disabled ? "transparent" : theme.colors.border,
          borderStyle: isAddButton ? "dashed" : "solid",
          backgroundColor: isSelected && !disabled
            ? theme.colors.buttonBgColor
            : "transparent",
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children && children}
      {label && (
        <>
          {Icon && <Icon size={15} color={theme.colors.text} />}
          <Text
            style={[
              styles.label,
              {
                color: isSelected && !disabled
                  ? theme.colors.buttonTextColor
                  : theme.colors.text,
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shortcutCalendar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default SelectButton;
