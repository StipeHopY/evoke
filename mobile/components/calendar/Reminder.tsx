import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { AlarmClock } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import { ReminderType } from "@/types";
import Modal from "@/components/ui/Modal";

type ReminderProps = {
  reminder: ReminderType;
  setReminder: (reminder: ReminderType) => void;
};

const Reminder = ({ reminder, setReminder }: ReminderProps) => {
  const theme = useColorScheme();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openReminderModal = () => {
    setIsModalOpen(true);
  };

  const closeReminderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Text style={[styles.label, { color: theme.colors.inactive }]}>
        Reminder
      </Text>
      <SelectButton label={reminder.type} onPress={openReminderModal}>
        <AlarmClock color={theme.colors.text} size={15} />
      </SelectButton>
      <Modal isOpen={isModalOpen} onClose={closeReminderModal} label="Reminder">
        <Text style={[styles.label, { color: theme.colors.inactive }]}>
          Type of reminder
        </Text>
        <View style={styles.container}>
          <SelectButton
            label="Notification"
            isSelected={reminder.type === "Notification"}
            onPress={() => {
              setReminder({
                ...reminder,
                type: "Notification",
              });
            }}
          />
          <SelectButton
            label="Alarm"
            isSelected={reminder.type === "Alarm"}
            onPress={() => {
              setReminder({
                ...reminder,
                type: "Alarm",
              });
            }}
          />
          <SelectButton
            label="None"
            isSelected={reminder.type === "None"}
            onPress={() => {
              setReminder({
                type: "None",
                reminderOffset: "None",
              });
            }}
          />
        </View>
        <Text style={[styles.label, { color: theme.colors.inactive }]}>
          Reminder offset
        </Text>
        <View style={styles.container}>
          <SelectButton
            label="At start time"
            isSelected={reminder.reminderOffset === "At start time"}
            disabled={reminder.type === "None"}
            onPress={() => {
              setReminder({
                ...reminder,
                reminderOffset: "At start time",
              });
            }}
          />
          <SelectButton
            label="5 minutes before start"
            isSelected={reminder.reminderOffset === "5 minutes before start"}
            disabled={reminder.type === "None"}
            onPress={() => {
              setReminder({
                ...reminder,
                reminderOffset: "5 minutes before start",
              });
            }}
          />
          <SelectButton
            label="15 minutes before start"
            isSelected={reminder.reminderOffset === "15 minutes before start"}
            disabled={reminder.type === "None"}
            onPress={() => {
              setReminder({
                ...reminder,
                reminderOffset: "15 minutes before start",
              });
            }}
          />
        </View>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: theme.colors.buttonBgColor },
          ]}
          onPress={closeReminderModal}
        >
          <Text
            style={[styles.buttonText, { color: theme.colors.buttonTextColor }]}
          >
            Save
          </Text>
        </Pressable>
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
    height: 100,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 5,
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

export default Reminder;
