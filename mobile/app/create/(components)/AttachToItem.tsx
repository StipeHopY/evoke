import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Plus } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import Modal from "@/components/ui/Modal";
import AttachedItem from "./AttachedItem";
import ScrollContainer from "@/components/ui/ScrollContainer";

const screenHeight = Dimensions.get("window").height;

// NOTES: this file is not importing anywhere

const AttachToItem = () => {
  const theme = useColorScheme();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAttachToModalOpen, setIsAttachToModalOpen] =
    useState<boolean>(false);

  // TODO: finish saving
  const handleSaveButtonPress = () => {
    setIsAttachToModalOpen(false);
  };

  const openAttachToModal = () => {
    setIsAttachToModalOpen(true);
  };

  const closeAttachToModal = () => {
    setIsAttachToModalOpen(false);
  };

  // TODO: add filtering
  // TODO: try to make better UI

  return (
    <>
      <SelectButton
        label="Attach to Item"
        isSelected={isSelected}
        onPress={openAttachToModal}
      >
        <Plus color={theme.colors.text} size={15} />
      </SelectButton>
      {isAttachToModalOpen && (
        <Modal
          isOpen={isAttachToModalOpen}
          onClose={closeAttachToModal}
          label="Attach to Item"
        >
          <View style={styles.container}>
            <ScrollContainer type="row">
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
              <AttachedItem />
            </ScrollContainer>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={handleSaveButtonPress}
                style={{
                  backgroundColor: theme.colors.buttonBgColor,
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginBottom: 10,
                  width: 150,
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
                onPress={closeAttachToModal}
                style={{
                  paddingVertical: 12,
                  borderRadius: 8,
                  width: 150,
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.85,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 30,
  },
  itemsContainer: {
    width: "100%",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  attachButton: {
    padding: 10,
    borderRadius: 5,
  },
  scroll: {
    width: "100%",
    flex: 1,
  },
});

export default AttachToItem;
