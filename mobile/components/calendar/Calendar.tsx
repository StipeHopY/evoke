import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import ErrorComponent from "@/components/ui/Error";
import Reminder from "./Reminder";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { defaultDate, defaultTime, defaultReminder } from "@/constants/date";
import SelectDay from "./SelectDay";
import { ReminderType, TimeType } from "@/types/index";
import { TaskStartDateType } from "@/types/date";
import { TaskDeadlineType } from "@/types/date";
import { RawDateType } from "@/types/date";
import { handleDeadlineValues, handleStartValues } from "@/utils/dateUtils";

type CalendarProps<T extends "start" | "end"> = {
  type: T;
  label: string;
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  onSave: (
    date: T extends "start" ? TaskStartDateType : TaskDeadlineType
  ) => void;
};

const Calendar = <T extends "start" | "end">({
  label,
  isOpen,
  onClose,
  error,
  onSave,
  type,
}: CalendarProps<T>) => {
  const theme = useColorScheme();
  const reminder = useSelector((state: RootState) => state.newTask.reminder);
  const newTask = useSelector((state: RootState) => state.newTask);

  const startDate = handleStartValues(newTask);
  const deadlineDate = handleDeadlineValues(newTask);

  const selectedType = type === "start" ? startDate : deadlineDate;

  const [selectedDate, setSelectedDate] = useState<RawDateType>(
    selectedType?.date ?? defaultDate
  );
  const [selectedTime, setSelectedTime] = useState<TimeType>(
    selectedType?.time ?? defaultTime
  );
  const [selectedReminder, setSelectedReminder] = useState<ReminderType>(
    reminder ?? defaultReminder
  );
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = () => {
    const base = {
      date: selectedDate,
      time: selectedTime,
    };

    if (type === "start") {
      onSave({
        ...base,
        reminder: selectedReminder,
      } as any);
    } else if (type === "end") {
      onSave(base as any);
    }
  };

  const closeCalenadar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={label}>
      <View style={{ gap: 20 }}>
        <SelectDay
          setIsCalendarOpen={setIsCalendarOpen}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        {type === "start" && (
          <Reminder
            reminder={selectedReminder}
            setReminder={setSelectedReminder}
          />
        )}
        <TimePicker selectedTime={selectedTime} setTime={setSelectedTime} />
        <DatePicker
          isOpen={isCalendarOpen}
          onClose={closeCalenadar}
          setSelectedDate={setSelectedDate}
        />
        <ErrorComponent message={error} />
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
