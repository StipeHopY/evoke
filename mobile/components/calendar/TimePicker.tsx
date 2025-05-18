import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { getRoundedCurrentTime } from "@/utils/dateTimeHelpers";

type TimePickerProps = {
  setTime: (time: string) => void;
};

const TimePicker = ({ setTime }: TimePickerProps) => {
  const currentTime = getRoundedCurrentTime();
  const [hour, setHour] = useState(currentTime.hour);
  const [minute, setMinute] = useState(currentTime.minute);

  useEffect(() => {
    setTime(`${hour}:${minute}`);
  }, [hour, minute]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <Picker
          style={styles.picker}
          selectedValue={hour}
          onValueChange={setHour}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const h = i.toString().padStart(2, "0");
            return <Picker.Item key={h} label={h} value={h} />;
          })}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={minute}
          onValueChange={setMinute}
        >
          {["00", "15", "30", "45"].map((m) => (
            <Picker.Item key={m} label={m} value={m} />
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
  warning: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});

export default TimePicker;
