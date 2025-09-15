import { Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import { DataOrganizerType } from "@/types/task";
import { RootState } from "@/store/store";
import Loader from "../ui/Loader";

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
  const loading = useSelector((state: RootState) => state.tasks.loading);

  const handlePress = () => {
    if (!loading) {
      setSelected(option);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={loading}
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
            color: active
              ? loading
                ? "transparent"
                : theme.colors.text
              : theme.colors.inactive,
          },
        ]}
      >
        {option.value}
      </Text>
      {active && loading && <Loader style={styles.loaderOverlay} />}
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
  loaderOverlay: {
    position: "absolute",
    width: 16,
    height: 16,
  },
});

export default OrganizerButtons;
