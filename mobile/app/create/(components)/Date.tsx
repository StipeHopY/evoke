import { useState } from "react";
import { Calendar } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import { TaskDateType } from "@/types/index";
import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import CalendarComponent from "@/components/calendar/Calendar";
import { isValidDateAndDeadline } from "@/utils/dateTimeHelpers";
import { setDate } from "@/store/slices/newTaskSlice";
import { RootState } from "@/store/store";

const Date = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const deadline = useSelector((state: RootState) => state.newTask.deadline);

  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openCalendar = () => {
    setIsOpenCalendar(true);
    setError(null);
  };

  const closeCalendar = () => {
    setIsOpenCalendar(false);
    setError(null);
  };

  // TODO: I think there is some error poping up before saving

  const handleCalendarSave = (newDate: TaskDateType) => {
    if (!newDate) {
      setError("Date is not selected.");
      return;
    }

    const isDateValid = isValidDateAndDeadline(newDate, deadline);
    if (!isDateValid.isValid) {
      setError(isDateValid.message || "Invalid date");
      return;
    }
    setError(null);
    dispatch(setDate(newDate));
    setIsSelected(true);
    closeCalendar();
  };

  return (
    <>
      <SelectButton label="Date" isSelected={isSelected} onPress={openCalendar}>
        <Calendar color={theme.colors.text} size={15} />
      </SelectButton>
      {isOpenCalendar && (
        <CalendarComponent
          type="start"
          label="Select Date"
          isOpen={isOpenCalendar}
          onClose={closeCalendar}
          onSave={handleCalendarSave}
          error={error}
        />
      )}
    </>
  );
};

export default Date;
