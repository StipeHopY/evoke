import { View, Text, StyleSheet } from "react-native";
import {
  ClipboardList,
  FileBadge,
  FolderKanban,
  ListChecks,
  BellRing,
} from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import ScrollContainer from "@/components/ui/ScrollContainer";

type TypeSelectorSliderProps = {
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
};

const Options = [
  { label: "Task", icon: ClipboardList },
  { label: "Goal", icon: FileBadge },
  { label: "Project", icon: FolderKanban },
  { label: "Reminder", icon: BellRing },
  { label: "Group of Tasks", icon: ListChecks },
];

const TypeSelectorSlider = ({
  selectedValue,
  setSelectedValue,
}: TypeSelectorSliderProps) => {
  const theme = useColorScheme();

  return (
    <View style={{ marginVertical: 20, marginLeft: 10 }}>
      <Text style={[styles.label, { color: theme.colors.inactive }]}>
        Type of item
      </Text>
      <ScrollContainer type="row">
        {Options.map((option) => (
          <SelectButton
            key={option.label}
            label={option.label}
            Icon={option.icon}
            isSelected={selectedValue === option.label}
            onPress={() => setSelectedValue(option.label)}
          />
        ))}
      </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
});

export default TypeSelectorSlider;
