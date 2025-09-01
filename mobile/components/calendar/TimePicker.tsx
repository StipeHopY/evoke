import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { minutes } from "@/constants/date";
import { TimeType } from "@/types";
import useColorScheme from "@/common/hooks/useColorScheme";

type TimePickerProps = {
  selectedTime: TimeType;
  setTime: (time: TimeType) => void;
};

const TimePicker = ({ selectedTime, setTime }: TimePickerProps) => {
  const theme = useColorScheme();
  const now = new Date();

  const [hour, setHour] = useState<number>(
    selectedTime?.hour ?? now.getHours()
  );
  const [minute, setMinute] = useState<number>(
    selectedTime?.minute ?? now.getMinutes()
  );

  useEffect(() => {
    setHour(selectedTime?.hour ?? now.getHours());
    setMinute(selectedTime?.minute ?? now.getMinutes());
  }, [selectedTime]);

  const handleChangeHour = (newHour: number) => {
    setHour(newHour);
    setTime({ hour: newHour, minute });
  };

  const handleChangeMinute = (newMinute: number) => {
    setMinute(newMinute);
    setTime({ hour, minute: newMinute });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <Picker
          style={styles.picker}
          selectedValue={hour}
          onValueChange={(value) => handleChangeHour(Number(value))}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item
              key={i}
              label={String(i).padStart(2, "0")}
              value={i}
              color={theme.colors.text}
            />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={minute}
          onValueChange={(value) => handleChangeMinute(Number(value))}
        >
          {minutes.map((m) => (
            <Picker.Item
              key={m}
              label={String(m).padStart(2, "0")}
              value={Number(m)}
              color={theme.colors.text}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  pickerRow: {
    flexDirection: "row",
    gap: 10,
  },
  picker: {
    width: 100,
  },
});

export default TimePicker;
