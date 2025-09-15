import { Highlighter } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";
import { RootState } from "@/store/store";
import { setHighPriority } from "@/store/slices/newTaskSlice";

const HighPriority = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch();
  const highPriority = useSelector(
    (state: RootState) => state.newTask.highPriority
  );

  const selectHighPriority = () => {
    dispatch(setHighPriority(!highPriority));
  };

  return (
    <SelectButton
      label="High Priority"
      isSelected={highPriority}
      onPress={selectHighPriority}
    >
      <Highlighter color={theme.colors.text} size={15} />
    </SelectButton>
  );
};

export default HighPriority;
