import { View, TextInput, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { ControllerRenderProps } from "react-hook-form";

import useColorScheme from "@/common/hooks/useColorScheme";
import { isUsernameValid } from "@/utils/isUsernameValid";

type UsernameInputProps = {
  field: ControllerRenderProps<{ username: string }, "username">;
  setInputValue: (value: string | undefined) => void;
};

const UsernameInput = ({ field, setInputValue }: UsernameInputProps) => {
  const theme = useColorScheme();
  const validUsername = isUsernameValid(field.value);

  const onChangeText = (text: string) => {
    const value = text === "" ? undefined : text;
    field.onChange(value);
    setInputValue(value);
  };

  return (
    <View style={{ flexDirection: "row", position: "relative" }}>
      <TextInput
        {...field}
        style={[
          styles.input,
          {
            borderBottomColor: theme.colors.border,
            color: theme.colors.text,
          },
        ]}
        placeholder="Your name"
        onChangeText={onChangeText}
      />
      <Check
        style={styles.check}
        color={validUsername.isValid ? theme.colors.text : "transparent"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 0, 
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  check: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default UsernameInput;
