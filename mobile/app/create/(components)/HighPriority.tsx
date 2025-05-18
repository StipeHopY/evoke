import { useState } from "react";
import { Highlighter } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";

type HighPriorityProps = {
  isHighPriority: boolean;
  setIsHighPriority: (isHighPriority: boolean) => void;
};

const HighPriority = ({
  isHighPriority,
  setIsHighPriority,
}: HighPriorityProps) => {
  const theme = useColorScheme();

  const selectHighPriority = () => {
    setIsHighPriority(!isHighPriority);
  };

  return (
    <SelectButton
      label="High Priority"
      isSelected={isHighPriority}
      onPress={selectHighPriority}
    >
      <Highlighter color={theme.colors.text} size={15} />
    </SelectButton>
  );
};

export default HighPriority;
