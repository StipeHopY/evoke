import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "@/components/ui/Modal";
import useColorScheme from "@/common/hooks/useColorScheme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
};

const DatePicker = ({ isOpen, onClose, onSelectDate }: Props) => {
  const theme = useColorScheme();
  const now = new Date();

  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [year, setYear] = useState(currentYear.toString());
  const [month, setMonth] = useState(currentMonth.toString().padStart(2, "0"));
  const [day, setDay] = useState(currentDay.toString());

  const selectedYear = Number(year);
  const selectedMonth = Number(month);

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }, [selectedYear, selectedMonth]);

  const getDayOptions = () => {
    const start =
      selectedYear === currentYear && selectedMonth === currentMonth
        ? currentDay
        : 1;
    return Array.from({ length: daysInMonth - start + 1 }, (_, i) => {
      const val = (start + i).toString();
      return <Picker.Item key={val} label={val.padStart(2, "0")} value={val} />;
    });
  };

  const getMonthOptions = () => {
    const start = selectedYear === currentYear ? currentMonth : 1;
    return Array.from({ length: 12 - start + 1 }, (_, i) => {
      const val = (start + i).toString().padStart(2, "0");
      return <Picker.Item key={val} label={val} value={val} />;
    });
  };

  const getYearOptions = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const y = currentYear + i;
      return (
        <Picker.Item
          key={y.toString()}
          label={y.toString()}
          value={y.toString()}
        />
      );
    });
  };

  const handleConfirm = () => {
    onSelectDate(new Date(Number(year), Number(month) - 1, Number(day)));
    onClose();
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
          onValueChange={setDay}
        >
          {getDayOptions()}
        </Picker>
        <Picker
          selectedValue={month}
          style={[styles.picker, { color: theme.colors.text }]}
          onValueChange={(value) => {
            setMonth(value);
            setDay("1");
          }}
        >
          {getMonthOptions()}
        </Picker>
        <Picker
          selectedValue={year}
          style={[styles.picker, { color: theme.colors.text }]}
          onValueChange={(value) => {
            setYear(value);
            setMonth(currentMonth.toString().padStart(2, "0"));
            setDay(currentDay.toString());
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
