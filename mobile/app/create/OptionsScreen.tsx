import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import useColorScheme from "@/common/hooks/useColorScheme";
import ScreenContainer from "@/components/ui/ScreenContainer";
import LabelSelector from "./(components)/LabelSelector";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Date from "./(components)/Date";
import Deadline from "./(components)/Deadline";
import HighPriority from "./(components)/HighPriority";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ErrorComponent from "@/components/ui/Error";
import { createTaskAction } from "@/store/actions/tasksActions";
import { DETAILS_SCREEN, HOME_SCREEN } from "@/constants/routes";
import Repeat from "@/components/calendar/Repeat";

const OptionsScreen = () => {
  const theme = useColorScheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const newTask = useSelector((state: RootState) => state.newTask);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoBack = () => {
    router.replace(DETAILS_SCREEN);
  };

  const handleCreateItem = async () => {
    try {
      setLoading(true);
      const { error } = await dispatch(createTaskAction(newTask));
      if (error) {
        setError(error);
        return;
      }

      setError(null);
      router.replace(HOME_SCREEN);
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={handleGoBack}>
          <ChevronLeft size={30} color={theme.colors.text} />
        </Pressable>
        <AnimatedButton
          label="Create"
          onPress={handleCreateItem}
          disabled={loading}
          isLoading={false}
          value="next"
          style={[
            styles.createButton,
            {
              backgroundColor: loading
                ? "transparent"
                : theme.colors.buttonBgColor,
            },
          ]}
        />
      </View>
      <View style={styles.slide}>
        <LabelSelector />
        <View>
          <Text style={[styles.label, { color: theme.colors.inactive }]}>
            Other (optional)
          </Text>
          <View style={styles.selectButtonsContainer}>
            <Date />
            <Deadline />
            <HighPriority />
            <Repeat />
          </View>
        </View>
      </View>
      <ErrorComponent message={error} setMessage={setError} isModal={true} />
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
    paddingHorizontal: 10,
    paddingBottom: 40,
    gap: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 18,
  },
  selectButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitles: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
});

export default OptionsScreen;
