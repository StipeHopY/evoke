import { useState } from "react";
import { Target } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import CalendarComponent from "@/components/calendar/Calendar";
import { handleStartValues, isValidStartAndDeadline } from "@/utils/dateUtils";
import { RootState } from "@/store/store";
import { setDeadline } from "@/store/slices/newTaskSlice";
import { TaskDeadlineType } from "@/types/date";

const Deadline = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const newTask = useSelector((state: RootState) => state.newTask);
  const startDate = handleStartValues(newTask);

  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const openCalenadar = () => {
    setError(null);
    setIsOpenCalendar(true);
  };

  const closeCalenadar = () => {
    setError(null);
    setIsOpenCalendar(false);
  };

  const handleDeadlineSave = (deadline: TaskDeadlineType) => {
    if (!startDate) {
      setError("Please select a start date before setting the deadline.");
      return;
    }

    const isDateValid = isValidStartAndDeadline(startDate, deadline);

    if (!isDateValid.isValid) {
      setError(isDateValid.message || "Invalid date");
      return;
    }

    setError(null);
    dispatch(setDeadline(deadline));
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
          type="end"
          label="Select Deadline"
          isOpen={isOpenCalendar}
          onClose={closeCalenadar}
          onSave={handleDeadlineSave}
          error={error}
        />
      )}
    </>
  );
};

export default Deadline;
