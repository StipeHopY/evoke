import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import useColorScheme from "@/common/hooks/useColorScheme";
import ScreenContainer from "@/components/containers/ScreenContainer";
import LabelSelector from "./(components)/LabelSelector";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { DateStateType } from "@/types";
import Date from "./(components)/Date";
import Deadline from "./(components)/Deadline";
import AttachToItem from "./(components)/AttachToItem";
import HighPriority from "./(components)/HighPriority";

const OptionsScreen = () => {
  const theme = useColorScheme();
  const router = useRouter();

  const [isCreateDisabled, setIsCreatedDisabled] = useState<boolean>(false);

  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isHighPriority, setIsHighPriority] = useState<boolean>(false);
  const [date, setDate] = useState<DateStateType>({
    time: null,
    date: null,
  });
  const [deadline, setDeadline] = useState<DateStateType>({
    time: null,
    date: null,
  });

  const handleGoBack = () => {
    router.replace("/create/DetailsScreen");
  };

  const handleCreateItem = () => {
    console.log("Task created");
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
          disabled={isCreateDisabled}
          isLoading={false}
          value="next"
          style={[
            styles.createButton,
            {
              backgroundColor: isCreateDisabled
                ? "transparent"
                : theme.colors.buttonBgColor,
            },
          ]}
        />
      </View>
      <View style={styles.slide}>
        <LabelSelector
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
        <View>
          <Text style={[styles.label, { color: theme.colors.inactive }]}>
            Other (optional)
          </Text>
          <View style={styles.selectButtonsContainer}>
            <Date setDate={setDate} date={date} deadline={deadline} />
            <Deadline setDeadline={setDeadline} startDate={date} />
            <AttachToItem />
            <HighPriority
              isHighPriority={isHighPriority}
              setIsHighPriority={setIsHighPriority}
            />
          </View>
        </View>
      </View>
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
    paddingLeft: 10,
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
