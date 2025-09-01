import { View, StyleSheet } from "react-native";
import { CalendarIcon } from "lucide-react-native";

import SelectButton from "@/components/ui/SelectButton";
import useColorScheme from "@/common/hooks/useColorScheme";
import { getRawDate, formatDateIntoUI } from "@/utils/dateUtils";
import { RawDateType } from "@/types/date";

type SelectDayType = {
  setIsCalendarOpen: (isCalendarOpen: boolean) => void;
  setSelectedDate: (selectedDate: RawDateType) => void;
  selectedDate: RawDateType;
};

const SelectDay = ({
  setSelectedDate,
  selectedDate,
  setIsCalendarOpen,
}: SelectDayType) => {
  const theme = useColorScheme();
  const selectToday = () => {
    setSelectedDate(getRawDate(new Date()));
  };

  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(getRawDate(tomorrow));
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const dateUI = formatDateIntoUI(selectedDate);

  return (
    <View style={styles.calendarContainer}>
      <SelectButton
        label="Today"
        isSelected={dateUI === "Today"}
        onPress={selectToday}
      />
      <SelectButton
        label="Tomorrow"
        isSelected={dateUI === "Tomorrow"}
        onPress={selectTomorrow}
      />
      <SelectButton
        isSelected={dateUI !== "Today" && dateUI !== "Tomorrow"}
        onPress={openCalendar}
      >
        <CalendarIcon
          size={20}
          color={
            dateUI !== "Today" && dateUI !== "Tomorrow"
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
