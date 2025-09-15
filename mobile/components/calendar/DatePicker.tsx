import { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";

import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";
import { RootState } from "@/store/store";
import { getRawDate } from "@/utils/dateUtils";
import { RawDateType } from "@/types/date";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setSelectedDate: (selectedDate: RawDateType) => void;
};

const DatePicker = ({ isOpen, onClose, setSelectedDate }: Props) => {
  const theme = useColorScheme();
  const startYear = useSelector((state: RootState) => state.newTask.startYear);
  const startMonth = useSelector((state: RootState) => state.newTask.startMonth);
  const startDay = useSelector((state: RootState) => state.newTask.startDay);

  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [day, setDay] = useState<number>(startDay ?? currentDay);
  const [month, setMonth] = useState<number>(
    startMonth ?? currentMonth
  );
  const [year, setYear] = useState<number>(startYear ?? currentYear);

  const handleConfirm = () => {
    const date = new Date(year, month - 1, day);
    setSelectedDate(getRawDate(date));
    onClose();
  };

  const daysInMonth = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [year, month]);

  const getDayOptions = () => {
    const start =
      year === currentYear && month === currentMonth ? currentDay : 1;
    return Array.from({ length: daysInMonth - start + 1 }, (_, i) => {
      const val = start + i;
      return (
        <Picker.Item
          key={val}
          label={String(val).padStart(2, "0")}
          value={val}
        />
      );
    });
  };

  const getMonthOptions = () => {
    const start = year === currentYear ? currentMonth : 1;
    return Array.from({ length: 12 - start + 1 }, (_, i) => {
      const val = start + i;
      return (
        <Picker.Item
          key={val}
          label={String(val).padStart(2, "0")}
          value={val}
        />
      );
    });
  };

  const getYearOptions = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const y = currentYear + i;
      return <Picker.Item key={y} label={y.toString()} value={y} />;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Select a Date
      </Text>
      <View style={styles.pickerRow}>
        <Picker
          selectedValue={day}
          style={[styles.picker, { color: theme.colors.text }]}
          onValueChange={(value) => setDay(Number(value))}
        >
          {getDayOptions()}
        </Picker>
        <Picker
          selectedValue={month}
          style={[styles.picker, { color: theme.colors.text }]}
          onValueChange={(value) => {
            setMonth(Number(value));
            setDay(1);
          }}
        >
          {getMonthOptions()}
        </Picker>
        <Picker
          selectedValue={year}
          style={[styles.picker, { color: theme.colors.text }]}
          onValueChange={(value) => {
            setYear(Number(value));
            setMonth(currentMonth);
            setDay(currentDay);
          }}
        >
          {getYearOptions()}
        </Picker>
      </View>
      <Text
        style={[styles.confirm, { color: theme.colors.text }]}
        onPress={handleConfirm}
      >
        Confirm
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
  },
  picker: {
    flex: 1,
  },
  confirm: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});

export default DatePicker;
