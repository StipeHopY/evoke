import { Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenContainer from "@/components/ui/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/store/slices/userSlice";

// NOTES: we should have achievements and goals in the different screens

const GoalsScreen = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  const deleteUsername = async () => {
    await AsyncStorage.removeItem("username");
    dispatch(deleteUser());
  };

  return (
    <ScreenContainer>
      <Pressable onPress={deleteUsername}>
        <Text style={{ color: theme.colors.text }}>Delete username</Text>
      </Pressable>
    </ScreenContainer>
  );
};

export default GoalsScreen;
