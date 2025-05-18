import { useState } from "react";
import { Plus } from "lucide-react-native";

import useColorScheme from "@/common/hooks/useColorScheme";
import SelectButton from "@/components/ui/SelectButton";

const AttachToItem = () => {
  const theme = useColorScheme();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAttachToModalOpen, setIsAttachToModalOpen] =
    useState<boolean>(false);

  const openAttachToModal = () => {
    if (!isAttachToModalOpen) {
      setIsAttachToModalOpen(true);
    }
  };

  const closeAttachToModal = () => {
    if (isAttachToModalOpen) {
      setIsAttachToModalOpen(false);
    }
  };

  return (
    <SelectButton
      label="Attach to Task"
      isSelected={isSelected}
      onPress={openAttachToModal}
    >
      <Plus color={theme.colors.text} size={15} />
    </SelectButton>
  );
};

export default AttachToItem;
