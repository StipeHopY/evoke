import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { CalendarSync, Check } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "../ui/SelectButton";
import Modal from "@/components/ui/Modal";
import { weekdays } from "@/constants/date";
import { DayValueType } from "@/types";
import { formatRepeatLabel } from "@/utils/dateUtils";
import { RootState } from "@/store/store";
import { setRepeat } from "@/store/slices/newTaskSlice";

const Repeat = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  const repeat = useSelector((state: RootState) => state.newTask.repeat);

  const [openModal, setOpenModal] = useState(false);
  const [label, setLabel] = useState("Repeat");
  const [selectedRepeatDays, setSelectedRepeatDays] = useState<DayValueType[]>(
    repeat ?? []
  );

  const handleRepeatLabel = (days: DayValueType[]) => {
    const repeatLabel = formatRepeatLabel(days, weekdays);
    setLabel(repeatLabel);
  };

  const onSelect = (dayValue: DayValueType) => {
    setSelectedRepeatDays((prev) => {
      const updated = prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue];

      const weekOrder = weekdays.map((day) => day.value);
      return [...updated].sort(
        (a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b)
      );
    });
  };

  const onClose = () => {
    dispatch(setRepeat(selectedRepeatDays));
    setOpenModal(false);
    handleRepeatLabel(selectedRepeatDays);
  };
  

  useEffect(() => {
    if (repeat) {
      handleRepeatLabel(selectedRepeatDays);
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <SelectButton
          label={label}
          onPress={() => {
            setOpenModal(true);
          }}
        >
          <CalendarSync color={theme.colors.text} size={15} />
        </SelectButton>
      </View>
      <Modal isOpen={openModal} onClose={onClose} label="Repeat">
        <View style={styles.repeatContainer}>
          {weekdays.map(({ label: dayLabel, value }, index) => (
            <Pressable
              key={index}
              onPress={() => onSelect(value)}
              style={[
                styles.repeatDay,
                {
                  backgroundColor: selectedRepeatDays.includes(value)
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
                  selectedRepeatDays.includes(value)
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
