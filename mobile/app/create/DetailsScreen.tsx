import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import ScreenContainer from "@/components/containers/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import TypeSelectorSlider from "./(components)/TypeSelectorSlider";
import Modal from "@/components/ui/Modal"; // Adjust the path if needed
import AnimatedButton from "@/components/ui/AnimatedButton";

const DetailsScreen = () => {
  const router = useRouter();
  const theme = useColorScheme();

  // TODO: delete placeholders
  const [selectedValue, setSelectedValue] = useState<string | null>("Task");
  const [title, setTitle] = useState<string>("Clean room");
  const [description, setDescription] = useState<string>(
    "You shold clean your room!"
  );
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const isNextDisabled = !selectedValue || title.trim() === "";
  const hasUnsavedChanges = title.trim() !== "" || description.trim() !== "";

  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleDiscardChanges = () => {
    setShowDiscardModal(false);
    router.replace("/(tabs)/home");
  };

  const handleNextSlide = () => {
    router.push("/create/OptionsScreen");
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack}>
          <ChevronLeft size={30} color={theme.colors.text} />
        </Pressable>
        <AnimatedButton
          label="Next"
          onPress={handleNextSlide}
          disabled={isNextDisabled}
          isLoading={false}
          style={[
            styles.nextButton,
            {
              backgroundColor: isNextDisabled
                ? "transparent"
                : theme.colors.buttonBgColor,
            },
          ]}
        />
      </View>
      <View style={styles.slide}>
        <TypeSelectorSlider
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={theme.colors.inactive}
            multiline
            style={[
              styles.titleInput,
              {
                color: theme.colors.text,
              },
            ]}
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="body text (optional)"
            placeholderTextColor={theme.colors.inactive}
            multiline
            style={[
              styles.descriptionInput,
              {
                color: theme.colors.text,
              },
            ]}
          />
        </View>
      </View>
      <Modal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
      >
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
            onPress={() => setShowDiscardModal(false)}
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
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  nextButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  slide: {
    flex: 1,
    width: "100%",
    paddingBottom: 40,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
    maxHeight: 120,
  },
  descriptionInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    textAlignVertical: "top",
  },
});

export default DetailsScreen;
