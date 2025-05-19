import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import { Plus } from "lucide-react-native";

import SelectButton from "@/components/ui/SelectButton";
import useColorScheme from "@/common/hooks/useColorScheme";
import Modal from "@/components/ui/Modal";

type LabelSelectorProps = {
  selectedLabel: string | null;
  setSelectedLabel: (label: string | null) => void;
};

const screenHeight = Dimensions.get("window").height;

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
  const [newLabel, setNewLabel] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  const onAddLabel = () => {
    setOpenModal(true);
  };

  const handleSaveLabel = () => {
    // TODO: finish this with saving it to state label
    console.log("Label saved");
    onClose();
  };

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [openModal]);

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
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        label="Add Label"
      >
        <View style={styles.container}>
          <Text style={[styles.label, { color: theme.colors.inactive }]}>
            Add a new label
          </Text>
          <View
            style={{
              height: screenHeight * 0.85,
              justifyContent: "flex-start",
            }}
          >
            <TextInput
              ref={inputRef}
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder="Enter label"
              style={[
                styles.input,
                {
                  borderBottomColor: theme.colors.border,
                  color: theme.colors.text,
                },
              ]}
            />
            <Pressable
              onPress={handleSaveLabel}
              style={{
                backgroundColor: theme.colors.buttonBgColor,
                paddingVertical: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: theme.colors.buttonTextColor,
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Save
              </Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              style={{
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: theme.colors.inactive,
                  textAlign: "center",
                }}
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LabelSelector;
