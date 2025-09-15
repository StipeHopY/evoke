import { Text } from "react-native";

import ScreenContainer from "@/components/ui/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";

const ChatScreen = () => {
  const theme = useColorScheme();
  return (
    <ScreenContainer>
      <Text style={{ color: theme.colors.text }}>Hello Chat</Text>
    </ScreenContainer>
  );
};

export default ChatScreen;
