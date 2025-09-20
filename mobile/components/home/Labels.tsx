import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SelectButton from "@/components/ui/SelectButton";
import ErrorComponent from "@/components/ui/Error";
import { LabelType } from "@/db/schema";
import { AppDispatch, RootState } from "@/store/store";
import { getLabelsAction } from "@/store/actions/labelsActions";

// TODO: acutally make pop up list on click
// TODO: try to make these things get on render of app labels and tasks etc...

const Labels = () => {
  const dispatch = useDispatch<AppDispatch>();
  const labels = useSelector((state: RootState) => state.labels);

  const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectLabel = (label: LabelType) => {
    setSelectedLabel(selectedLabel?.id === label.id ? null : label);
  };

  const handleActionModal = (label: LabelType) => {
    setSelectedLabel(label);
  };

  useEffect(() => {
    if (!labels || labels.length === 0) {
      loadLabels();
    }
  }, [labels]);

  const loadLabels = async () => {
    try {
      await dispatch(getLabelsAction());
      setError(null);
    } catch (err) {
      setError("Failed to load labels");
    }
  };

  if (labels.length === 0) return null;

  return (
    <View style={styles.container}>
      <ErrorComponent message={error} />
      {labels.map((label) => (
        <SelectButton
          key={label.id}
          label={label.value}
          isSelected={selectedLabel?.id === label.id}
          onPress={() => handleSelectLabel(label)}
          onLongPress={() => handleActionModal(label)}
        />
      ))}
    </View>
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

export default Labels;
