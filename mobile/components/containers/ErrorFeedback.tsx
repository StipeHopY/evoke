import { View, Text } from "react-native";

type ErrorFeedbackType = {
  message: string;
  onClick: () => void;
};

// NOTES: finish this component

const ErrorFeedback = ({ message, onClick }: ErrorFeedbackType) => {
  return (
    <View>
      <Text>ErrorFeedback</Text>
    </View>
  );
};

export default ErrorFeedback;
