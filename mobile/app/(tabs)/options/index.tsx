import { Text } from "react-native";

import ScreenContainer from "@/components/containers/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";

const OptionsScreen = () => {
  const theme = useColorScheme();
  return (
    <ScreenContainer>
      <Text style={{ color: theme.colors.text }}>Hello options</Text>
    </ScreenContainer>
  );
};

export default OptionsScreen;