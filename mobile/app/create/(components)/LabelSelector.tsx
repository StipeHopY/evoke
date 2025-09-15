import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import LabelList from "@/components/labels/LabelList";
import { RootState, AppDispatch } from "@/store/store";
import { getLabelsAction } from "@/store/actions/labelsActions";
import Error from "@/components/ui/Error";

const LabelSelector = () => {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useColorScheme();
  const labels = useSelector((state: RootState) => state.labels);

  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <Error message={error} setMessage={setError} isModal={true} />
      <View style={{ marginVertical: 20 }}>
        <Text style={[styles.label, { color: theme.colors.inactive }]}>
          Label
        </Text>
        <LabelList labels={labels} />
      </View>
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
