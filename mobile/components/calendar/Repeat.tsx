import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Check } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "../ui/SelectButton";
import Modal from "@/components/ui/Modal";
import { daysOfWeek, weekdays } from "@/constants/date";
import { DayValueType } from "@/types";
import { formatRepeatLabel } from "@/utils/dateTimeHelpers";

type RepeatProps = {
  setRepeatDays: React.Dispatch<React.SetStateAction<DayValueType[]>>;
  repeatDays: DayValueType[];
};

// NEXT: save task on mobile

const Repeat = ({ setRepeatDays, repeatDays }: RepeatProps) => {
  const theme = useColorScheme();

  const [openModal, setOpenModal] = useState(false);
  const [label, setLabel] = useState("Never");
  const [tempSelected, setTempSelected] = useState<DayValueType[]>(repeatDays);

  const onPress = () => {
    setTempSelected(repeatDays);
    setOpenModal(true);
  };

  const onSelect = (dayValue: DayValueType) => {
    setTempSelected((prev) =>
      prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  const onClose = () => {
    setRepeatDays(tempSelected);
    setOpenModal(false);

    const sortedDays = [...tempSelected].sort();
    const repeatLabel = formatRepeatLabel(sortedDays, weekdays);

    setLabel(repeatLabel);
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
              style={[
                styles.repeatDay,
                {
                  backgroundColor: tempSelected.includes(value)
                    ? theme.colors.selected
                    : "transparent",
                  borderColor: theme.colors.border,
                },
              ]}
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
  repeatDay: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Repeat;
