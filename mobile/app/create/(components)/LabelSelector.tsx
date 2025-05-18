import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { Plus } from "lucide-react-native";
import { Theme } from "@/types";
import SelectButton from "@/components/ui/SelectButton";
import useColorScheme from "@/common/hooks/useColorScheme";
import Modal from "@/components/ui/Modal";

type LabelSelectorProps = {
  selectedLabel: string | null;
  setSelectedLabel: (label: string | null) => void;
};

const labels = [
  "Personal",
  "Work",
  "Family",
  "Travel",
  "Fitness",
  "Finance",
  "Important",
];

const LabelSelector = ({
  selectedLabel,
  setSelectedLabel,
}: LabelSelectorProps) => {
  const theme = useColorScheme();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onAddLabel = () => {
    setOpenModal(true);
  };

  // TODO: fix animation double opening

  return (
    <>
      <View style={{ marginVertical: 20 }}>
        <Text style={[styles.label, { color: theme.colors.inactive }]}>
          Label
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
        >
          <SelectButton
            label="Add Label"
            Icon={Plus}
            isSelected={false}
            onPress={onAddLabel}
            isAddButton
          />
          {labels.map((label) => (
            <SelectButton
              key={label}
              label={label}
              isSelected={selectedLabel === label}
              onPress={() =>
                setSelectedLabel(selectedLabel === label ? null : label)
              }
            />
          ))}
        </ScrollView>
      </View>
      {/* TODO: set input here for typing and when modal opens automatically set user to type */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        label="Add Label"
      >
        <Text style={[styles.label, { color: theme.colors.inactive }]}>
          Add a new label
        </Text>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
});

export default LabelSelector;
