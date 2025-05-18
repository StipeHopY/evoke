import { useState } from "react";
import { Target } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import CalendarComponent from "@/components/calendar/Calendar";
import { DateStateType } from "@/types";
import { isValidDateAndDeadline } from "@/utils/dateTimeHelpers";

type DeadlineProps = {
  setDeadline: React.Dispatch<React.SetStateAction<DateStateType>>;
  startDate: DateStateType;
};

const Deadline = ({ setDeadline, startDate }: DeadlineProps) => {
  const theme = useColorScheme();

  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openCalenadar = () => {
    setIsOpenCalendar(true);
    setError(null);
  };

  const closeCalenadar = () => {
    setIsOpenCalendar(false);
    setError(null);
  };

  const handleDeadlineSave = (deadline: DateStateType) => {
    const isDateValid = isValidDateAndDeadline(startDate, deadline);

    if (!isDateValid.isValid) {
      setError(isDateValid.message || "Invalid date");
      return;
    }

    setDeadline(deadline);
    setIsSelected(true);
    closeCalenadar();
  };

  return (
    <>
      <SelectButton
        label="Deadline"
        isSelected={isSelected}
        onPress={openCalenadar}
      >
        <Target color={theme.colors.text} size={15} />
      </SelectButton>
      {isOpenCalendar && (
        <CalendarComponent
          label="Select Deadline"
          isOpenCalendar={isOpenCalendar}
          onClose={closeCalenadar}
          onSave={handleDeadlineSave}
          error={error}
        />
      )}
    </>
  );
};

export default Deadline;
