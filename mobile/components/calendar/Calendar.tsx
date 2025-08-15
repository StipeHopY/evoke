import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import ErrorComponent from "@/components/ui/Error";
import Reminder from "./Reminder";
import Repeat from "@/components/calendar/Repeat";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { defaultDate, defaultTime, defaultReminder } from "@/constants/date";
import SelectDay from "./SelectDay";
import {
  TaskDateType,
  DateType,
  ReminderType,
  DayValueType,
  TimeType,
} from "@/types/index";

type CalendarProps = {
  type: "start" | "end";
  label: string;
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  onSave: (date: TaskDateType) => void;
};

const Calendar = ({
  label,
  isOpen,
  onClose,
  error,
  onSave,
  type,
}: CalendarProps) => {
  const theme = useColorScheme();
  const startDate = useSelector((state: RootState) => state.newTask.date);
  const deadline = useSelector((state: RootState) => state.newTask.deadline);
  const selectedType = type === "start" ? startDate : deadline;

  const [selectedDate, setSelectedDate] = useState<DateType>(
    selectedType?.date ?? defaultDate
  );
  const [selectedTime, setSelectedTime] = useState<TimeType>(
    selectedType?.time ?? defaultTime
  );
  const [selectedReminder, setSelectedReminder] = useState<ReminderType>(
    selectedType?.reminder ?? defaultReminder
  );
  const [selectedRepeatDays, setSelectedRepeatDays] = useState<DayValueType[]>(
    selectedType?.repeat ?? []
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = () => {
    const newDate: TaskDateType = {
      date: selectedDate,
      time: selectedTime,
      repeat: selectedRepeatDays,
      reminder: selectedReminder,
    };

    onSave(newDate);
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
        <Reminder
          reminder={selectedReminder}
          setReminder={setSelectedReminder}
        />
        {type === "start" && (
          <Repeat
            repeatDays={selectedRepeatDays}
            setRepeatDays={setSelectedRepeatDays}
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
