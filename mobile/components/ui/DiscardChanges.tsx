import { View, Text, Pressable } from "react-native";

import Modal from "./Modal";
import useColorScheme from "@/common/hooks/useColorScheme";

type DiscardChangesProps = {
  isOpen: boolean;
  onClose: () => void;
  handleDiscardChanges: () => void;
};

const DiscardChanges = ({
  isOpen,
  onClose,
  handleDiscardChanges,
}: DiscardChangesProps) => {
  const theme = useColorScheme();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 16,
            color: theme.colors.text,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Discard your changes?
        </Text>
        <Pressable
          onPress={handleDiscardChanges}
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
            Discard
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
    </Modal>
  );
};

export default DiscardChanges;
