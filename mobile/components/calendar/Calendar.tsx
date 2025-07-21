import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar as CalendarIcon } from "lucide-react-native";

import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";
import { formatDate } from "@/utils/dateTimeHelpers";
import TimePicker from "./TimePicker";
import SelectButton from "@/components/ui/SelectButton";
import DatePicker from "./DatePicker";
import { getRoundedCurrentTime } from "@/utils/dateTimeHelpers";
import { DateStateType, ReminderType } from "@/types/index";
import ErrorComponent from "@/components/ui/Error";
import Reminder from "./Reminder";
import Repeat from "@/components/calendar/Repeat";

type CalendarProps = {
  label: string;
  isOpenCalendar: boolean;
  onClose: () => void;
  error?: string | null;
  onSave: (date: DateStateType) => void;
};

type SelectedTimeState = "Today" | "Tomorrow" | string;

// TODO: try to add functionality where when user click Save button then only get the selected time from time picker
// because right now it couses to much re-rendering

const Calendar = ({
  label,
  isOpenCalendar,
  onClose,
  error,
  onSave,
}: CalendarProps) => {
  const theme = useColorScheme();
  const getCurrTime = getRoundedCurrentTime();

  const [selectedTime, setSelectedTime] = useState<string>(
    `${getCurrTime.hour}:${getCurrTime.minute}`
  );
  const [selectedDate, setSelectedDate] = useState<SelectedTimeState>("Today");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [reminder, setReminder] = useState<ReminderType>({
    type: "Notification",
    reminderOffset: "At start time",
  });
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  const selectToday = () => {
    setSelectedDate(formatDate(new Date()));
  };

  const selectTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(formatDate(tomorrow));
  };

  const onSelectDate = (date: Date) => {
    setSelectedDate(formatDate(date));
  };

  const handleDateChange = () => {
    console.log("Selected Date: ", selectedDate);
    console.log("Selected Time: ", selectedTime);
    const newDate = {
      date: selectedDate,
      time: selectedTime,
    };

    onSave(newDate);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const closeCalenadar = () => {
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    console.log("Repeat Days: ", repeatDays);
  }, [repeatDays]);

  // TODO: add cancel button

  return (
    <Modal isOpen={isOpenCalendar} onClose={onClose} label={label}>
      <View style={{ gap: 20 }}>
        <View style={styles.calendarContainer}>
          <SelectButton
            label="Today"
            isSelected={selectedDate === "Today"}
            onPress={selectToday}
          />
          <SelectButton
            label="Tomorrow"
            isSelected={selectedDate === "Tomorrow"}
            onPress={selectTomorrow}
          />
          <SelectButton
            isSelected={selectedDate !== "Today" && selectedDate !== "Tomorrow"}
            onPress={openCalendar}
          >
            <CalendarIcon
              size={20}
              color={
                selectedDate !== "Today" && selectedDate !== "Tomorrow"
                  ? theme.colors.buttonTextColor
                  : theme.colors.text
              }
            />
          </SelectButton>
        </View>
        <Reminder reminder={reminder} setReminder={setReminder} />
        <Repeat repeatDays={repeatDays} setRepeatDays={setRepeatDays} />
        <TimePicker setTime={setSelectedTime} />
        <DatePicker
          isOpen={isCalendarOpen}
          onClose={closeCalenadar}
          onSelectDate={onSelectDate}
        />
        <ErrorComponent error={error} />
        <Pressable
          style={[
            styles.button,
            { backgroundColor: theme.colors.buttonBgColor },
          ]}
          onPress={handleDateChange}
        >
          <Text
            style={[styles.buttonText, { color: theme.colors.buttonTextColor }]}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </Modal>
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
  label: {
    fontSize: 13,
    fontWeight: "500",
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

export default Calendar;
