import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { X } from "lucide-react-native";

import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";
import { LabelCustomType } from "@/types/task"; 
import Error from "@/components/ui/Error";
import { AppDispatch } from "@/store/store";
import {
  removeLabelAction,
  updateLabelAction,
} from "@/store/actions/labelsActions";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLabel: LabelCustomType | null;
}

const screenHeight = Dimensions.get("window").height;

const ActionModal = ({ isOpen, onClose, selectedLabel }: ActionModalProps) => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  const [labelValue, setLabelValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (selectedLabel?.value) {
      setLabelValue(selectedLabel.value);
    }
  }, [selectedLabel]);

  const handleSaveLabel = async () => {
    if (!labelValue.trim()) {
      setError("Label cannot be empty");
      return;
    }

    if (selectedLabel) {

      // TODO: try to make this without trim function
      try {
        const { error } = await dispatch(
          updateLabelAction(selectedLabel, labelValue.trim())
        );
        if (error) {
          setError(error);
          return;
        }
        setError(null);
        onClose();
      } catch (error) {
        setError("Failed to update label");
      }
    } else {
      setError("No label selected to update");
    }
  };

  const handleDeleteLabel = async () => {
    if (!selectedLabel) {
      setError("No label selected to delete");
      return;
    }

    try {
      const { error } = await dispatch(removeLabelAction(selectedLabel.id));
      if (error) {
        setError(error);
        return;
      }
      setError(null);
      onClose();
    } catch (error) {
      setError("Failed to delete label");
    }
  };

  const onCloseActionModal = () => {
    setLabelValue("");
    setError(null);
    onClose();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const clearInput = () => {
    setLabelValue("");
    setError(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Edit Label">
      <View style={{ padding: 20 }}>
        <View
          style={{
            height: screenHeight * 0.85,
            justifyContent: "flex-start",
          }}
        >
          <View
            style={[
              styles.inputContainer,
              { borderColor: theme.colors.border },
            ]}
          >
            <TextInput
              ref={inputRef}
              value={labelValue}
              onChangeText={setLabelValue}
              placeholder="Enter label"
              style={[styles.input, { color: theme.colors.text }]}
            />
            {labelValue.length > 0 && (
              <Pressable onPress={clearInput} style={{ padding: 4 }}>
                <X size={20} color={theme.colors.text} />
              </Pressable>
            )}
          </View>
          <Error message={error} />
          <Pressable
            onPress={handleSaveLabel}
            style={[
              styles.saveButton,
              {
                backgroundColor: !labelValue.trim()
                  ? "transparent"
                  : theme.colors.buttonBgColor,
              },
            ]}
          >
            <Text
              style={[
                {
                  color: !labelValue.trim()
                    ? theme.colors.inactive
                    : theme.colors.text,
                },
                styles.saveButtonText,
              ]}
            >
              Save
            </Text>
          </Pressable>
          <Pressable onPress={handleDeleteLabel} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
          <Pressable
            onPress={onCloseActionModal}
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ color: theme.colors.inactive, textAlign: "center" }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10,
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
  deleteButton: {
    backgroundColor: "tomato",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default ActionModal;
