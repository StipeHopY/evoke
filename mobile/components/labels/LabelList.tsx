import { useState } from "react";
import { View, StyleSheet } from "react-native";

import SelectButton from "@/components/ui/SelectButton";
import CreateLabel from "./CreateLabel";
import { LabelType, LabelsType } from "@/types";
import ActionModal from "./ActionModal";

const LabelList = ({ labels }: LabelsType) => {
  const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);

  const onLongPressLabel = (label: LabelType) => {
    setOpenActionModal(true);
    setSelectedLabel(label);
  };

  const onCloseActionModal = () => {
    setOpenActionModal(false);
    setSelectedLabel(null);
  };

  return (
    <>
      <View style={styles.container}>
        <CreateLabel labels={labels} />
        {labels.map((label) => (
          <SelectButton
            key={label.id}
            label={label.value}
            isSelected={selectedLabel?.id === label.id}
            onPress={() =>
              setSelectedLabel(selectedLabel?.id === label.id ? null : label)
            }
            onLongPress={() => onLongPressLabel(label)}
          />
        ))}
      </View>
      <ActionModal
        isOpen={openActionModal}
        onClose={onCloseActionModal}
        selectedLabel={selectedLabel}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});

export default LabelList;
