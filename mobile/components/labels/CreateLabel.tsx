import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { Plus } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import Modal from "@/components/ui/Modal";
import { createLabelAction } from "@/store/actions/labelsActions";
import { AppDispatch } from "@/store/store";
import { LabelsType } from "@/types";
import Error from "../ui/Error";

const screenHeight = Dimensions.get("window").height;

const CreateLabel = ({ labels }: LabelsType) => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  const [createLabelModal, setCreateLabelModal] = useState<boolean>(false);
  const [newLabelValue, setNewLabelValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<TextInput>(null);

  const openModal = () => {
    setCreateLabelModal(true);
  };

  // TODO: I was just thinking how should user set deadline for reminder like journaling for 50 days, 
  // or if its everyday then like 5/30 

  const onClose = () => {
    setNewLabelValue("");
    setError(null);
    setCreateLabelModal(false);
  };

  const handleSaveLabel = async () => {
    const trimmed = newLabelValue.trim();
    if (!trimmed) {
      setError("Label cannot be empty.");
      return;
    }

    try {
      const { error } = await dispatch(createLabelAction(trimmed));
      if (error) {
        setError(error);
        return;
      }
      setError(null);
      onClose();
    } catch (err) {
      setError("Failed to save label.");
    }
  };

  useEffect(() => {
    if (createLabelModal) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [createLabelModal]);

  return (
    <>
      <SelectButton
        label="Add Label"
        Icon={Plus}
        isSelected={false}
        onPress={openModal}
        isAddButton
      />
      <Modal isOpen={createLabelModal} onClose={onClose} label="Label">
        <View style={styles.container}>
          <View
            style={{
              height: screenHeight * 0.85,
              justifyContent: "flex-start",
            }}
          >
            <TextInput
              ref={inputRef}
              value={newLabelValue}
              onChangeText={setNewLabelValue}
              placeholder="Enter label"
              style={[
                styles.input,
                {
                  borderBottomColor: theme.colors.border,
                  color: theme.colors.text,
                },
              ]}
            />
            <Error message={error} />
            <Pressable
              onPress={handleSaveLabel}
              style={[
                styles.saveButton,
                {
                  backgroundColor: !newLabelValue.trim()
                    ? "transparent"
                    : theme.colors.buttonBgColor,
                },
              ]}
            >
              <Text
                style={[
                  {
                    color: !newLabelValue.trim()
                      ? theme.colors.inactive
                      : theme.colors.text,
                  },
                  styles.saveButtonText,
                ]}
              >
                Save
              </Text>
            </Pressable>
            <Pressable onPress={onClose} style={{ paddingVertical: 12 }}>
              <Text
                style={{ color: theme.colors.inactive, textAlign: "center" }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
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
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CreateLabel;
