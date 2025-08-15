import { View, StyleSheet } from "react-native";
import { CalendarIcon } from "lucide-react-native";

import SelectButton from "../ui/SelectButton";
import useColorScheme from "@/common/hooks/useColorScheme";
import { formatDate } from "@/utils/dateTimeHelpers";
import { DateType } from "@/types";

type SelectDayType = {
  setIsCalendarOpen: (isCalendarOpen: boolean) => void;
  setSelectedDate: (selectedDate: DateType) => void;
  selectedDate: DateType;
};

const SelectDay = ({
  setSelectedDate,
  selectedDate,
  setIsCalendarOpen,
}: SelectDayType) => {
  const theme = useColorScheme();
  const selectToday = () => {
    setSelectedDate(formatDate(new Date()));
  };

  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(formatDate(tomorrow));
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  return (
    <View style={styles.calendarContainer}>
      <SelectButton
        label="Today"
        isSelected={selectedDate.ui === "Today"}
        onPress={selectToday}
      />
      <SelectButton
        label="Tomorrow"
        isSelected={selectedDate.ui === "Tomorrow"}
        onPress={selectTomorrow}
      />
      <SelectButton
        isSelected={
          selectedDate.ui !== "Today" && selectedDate.ui !== "Tomorrow"
        }
        onPress={openCalendar}
      >
        <CalendarIcon
          size={20}
          color={
            selectedDate.ui !== "Today" && selectedDate.ui !== "Tomorrow"
              ? theme.colors.buttonTextColor
              : theme.colors.text
          }
        />
      </SelectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
  },
});

export default SelectDay;
