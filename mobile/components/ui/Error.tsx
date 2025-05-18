import { View, Text } from "react-native";

type ErrorProps = {
  error: string | undefined | null;
};
const Error = ({ error }: ErrorProps) => {
  return (
    <View style={{ opacity: error ? 1 : 0 }}>
      <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
        {error}
      </Text>
    </View>
  );
};

export default Error;
