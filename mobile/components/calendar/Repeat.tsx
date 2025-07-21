import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "../ui/SelectButton";
import Modal from "@/components/ui/Modal";

type RepeatProps = {
  setRepeatDays: React.Dispatch<React.SetStateAction<string[]>>;
  repeatDays: string[];
};

// NEXT: save task on mobile

const daysOfWeek = [
  { label: "Every Monday", value: "Mon" },
  { label: "Every Tuesday", value: "Tue" },
  { label: "Every Wednesday", value: "Wed" },
  { label: "Every Thursday", value: "Thu" },
  { label: "Every Friday", value: "Fri" },
  { label: "Every Saturday", value: "Sat" },
  { label: "Every Sunday", value: "Sun" },
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const Repeat = ({ setRepeatDays, repeatDays }: RepeatProps) => {
  const theme = useColorScheme();

  const [openModal, setOpenModal] = useState(false);
  const [label, setLabel] = useState("Never");
  const [tempSelected, setTempSelected] = useState<string[]>(repeatDays); 

  const onPress = () => {
    setTempSelected(repeatDays); 
    setOpenModal(true);
  };

  const onSelect = (dayValue: string) => {
    setTempSelected((prev) =>
      prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  const onClose = () => {
    setRepeatDays(tempSelected);
    setOpenModal(false);

    const sorted = [...tempSelected].sort();

    if (sorted.length === 0) {
      setLabel("Never");
    } else if (sorted.length === 7) {
      setLabel("Every day");
    } else if (
      weekdays.every((day) => sorted.includes(day)) &&
      sorted.length === 5
    ) {
      setLabel("Weekdays");
    } else if (sorted.length === 1) {
      setLabel(sorted[0]);
    } else {
      const last = sorted[sorted.length - 1];
      const rest = sorted.slice(0, -1);
      setLabel(`${rest.join(", ")} & ${last}`);
    }
  };

  return (
    <>
      <Text style={[styles.label, { color: theme.colors.inactive }]}>
        Repeat
      </Text>
      <View style={styles.container}>
        <SelectButton label={label} onPress={onPress} />
      </View>
      <Modal isOpen={openModal} onClose={onClose} label="Repeat">
        <View style={styles.repeatContainer}>
          {daysOfWeek.map(({ label: dayLabel, value }, index) => (
            <Pressable
              key={index}
              onPress={() => onSelect(value)}
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                marginVertical: 5,
                backgroundColor: tempSelected.includes(value)
                  ? theme.colors.selected
                  : "transparent",
                borderRadius: 10,
                borderColor: theme.colors.border,
                borderWidth: 1,
              }}
            >
              <Text style={{ color: theme.colors.text, fontSize: 18 }}>
                {dayLabel}
              </Text>
              <Check
                size={24}
                color={
                  tempSelected.includes(value)
                    ? theme.colors.text
                    : "transparent"
                }
              />
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  repeatContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Repeat;
