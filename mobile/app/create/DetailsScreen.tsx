import { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

import ScreenContainer from "@/components/ui/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import AnimatedButton from "@/components/ui/AnimatedButton";
import DiscardChanges from "@/components/ui/DiscardChanges";
import { HOME_SCREEN, OPTIONS_SCREEN } from "@/constants/routes";
import { resetNewTask, setTitleAndDesc } from "@/store/slices/newTaskSlice";

const DetailsScreen = () => {
  const router = useRouter();
  const theme = useColorScheme();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("Clean room");
  const [description, setDescription] = useState<string>("You should clean your room.");
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const isInputFilled = (value: string) => {
    return value.trim() !== "";
  };

  const handleGoBack = () => {
    if (isInputFilled(title) || isInputFilled(description)) {
      setShowDiscardModal(true);
    } else {
      router.replace(HOME_SCREEN);
    }
  };

  const handleDiscardChanges = () => {
    dispatch(resetNewTask());
    router.replace(HOME_SCREEN);
  };

  const handleNextSlide = () => {
    if (title) {
      dispatch(setTitleAndDesc({ title, description }));
      router.replace(OPTIONS_SCREEN);
    }
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
          disabled={!isInputFilled(title)}
          isLoading={false}
          style={{
            backgroundColor: !isInputFilled(title)
              ? "transparent"
              : theme.colors.buttonBgColor,
          }}
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
