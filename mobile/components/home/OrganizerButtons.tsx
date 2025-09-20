import { Text, StyleSheet, Pressable } from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import { DataOrganizerType } from "@/types/task";

type OrganizerButtonsProps = {
  setSelected: (selected: DataOrganizerType) => void;
  active: boolean;
  option: DataOrganizerType;
};

const OrganizerButtons = ({
  active,
  setSelected,
  option,
}: OrganizerButtonsProps) => {
  const theme = useColorScheme();

  return (
    <Pressable
      onPress={() => {
        setSelected(option);
      }}
      style={[
        styles.container,
        {
          borderColor: active ? theme.colors.active : theme.colors.border,
          backgroundColor: active ? theme.colors.background : theme.colors.main,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: active ? theme.colors.text : theme.colors.inactive,
          },
        ]}
      >
        {option.value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default OrganizerButtons;
