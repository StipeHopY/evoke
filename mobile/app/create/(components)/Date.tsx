import { useState } from "react";
import { Calendar } from "lucide-react-native";

import { DateStateType } from "@/types/index";
import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import CalendarComponent from "@/components/calendar/Calendar";
import { isValidDateAndDeadline } from "@/utils/dateTimeHelpers";

type checkDateProps = {
  isValid: boolean;
  message?: string;
};

type DateProps = {
  setDate: React.Dispatch<React.SetStateAction<DateStateType>>;
  date?: DateStateType;
  deadline: DateStateType;
};

// TODO: add cancel button here and on deadline component

const Date = ({ setDate, deadline }: DateProps) => {
  const theme = useColorScheme();

  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openCalendar = () => {
    setIsOpenCalendar(true);
    setError(null);
  };

  const handleCalendarSave = (newDate: DateStateType) => {
    const isDateValid = isValidDateAndDeadline(newDate, deadline);
    console.log("isDateValid", isDateValid);

    if (!isDateValid.isValid) {
      setError(isDateValid.message || "Invalid date");
      return;
    }

    setDate(newDate);
    setIsSelected(true);
    setError(null);
    closeCalendar();
  };

  const closeCalendar = () => {
    setIsOpenCalendar(false);
    setError(null);
  };

  return (
    <>
      <SelectButton label="Date" isSelected={isSelected} onPress={openCalendar}>
        <Calendar color={theme.colors.text} size={15} />
      </SelectButton>
      {isOpenCalendar && (
        <CalendarComponent
          label="Select Date"
          isOpenCalendar={isOpenCalendar}
          onClose={closeCalendar}
          onSave={handleCalendarSave}
          error={error}
        />
      )}
    </>
  );
};

export default Date;
