import { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import ScreenContainer from "@/components/containers/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import AnimatedButton from "@/components/ui/AnimatedButton";
import DiscardChanges from "@/components/ui/DiscardChanges";

const DetailsScreen = () => {
  const router = useRouter();
  const theme = useColorScheme();

  // TODO: delete placeholders
  const [title, setTitle] = useState<string>("Clean room");
  const [description, setDescription] = useState<string>(
    "You shold clean your room!"
  );
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const hasTitle = title.trim() === "";
  const hasUnsavedChanges = title.trim() !== "" || description.trim() !== "";

  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      setShowDiscardModal(true);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleDiscardChanges = () => {
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
          disabled={hasTitle}
          isLoading={false}
          style={[
            styles.nextButton,
            {
              backgroundColor: hasTitle
                ? "transparent"
                : theme.colors.buttonBgColor,
            },
          ]}
        />
      </View>
      <View style={styles.slide}>
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
      <DiscardChanges
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        handleDiscardChanges={handleDiscardChanges}
      />
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
