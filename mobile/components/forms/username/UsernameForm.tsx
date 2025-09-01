import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { isUsernameValid } from "@/utils/isUsernameValid";
import { createUserAction } from "@/store/actions/userActions";
import ScreenContainer from "@/components/ui/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import UsernameInput from "./UsernameInput";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { AppDispatch } from "@/store/store";

// TODO: create seperated folder (username) for these two components
// TODO: start coding create title and desc part
// TODO: set username max 20 letters

type UsernameType = {
  username: string
}

const Username = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme();
  const { control, handleSubmit } = useForm<UsernameType>();

  const [submittedData, setSubmittedData] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // TODO: hanle loading

  const onSubmit = async (data: UsernameType) => {
    const validUsername = isUsernameValid(data.username);

    if (!validUsername.isValid) {
      setError(validUsername.message);
      setSubmittedData(undefined);
      return;
    }

    await dispatch(createUserAction(data.username));
    setError(undefined);
    setSubmittedData(data.username);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // TODO: check disabled color for light mode
  // TODO: set loading UI

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.usernameContainer}>
          <View style={styles.centerContainer}>
            <View>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Hey 👋
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                Please enter your name to continue.
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Controller
                control={control}
                render={({ field }) => (
                  <UsernameInput field={field} setInputValue={setInputValue} />
                )}
                name="username"
              />
              <Text style={[styles.errorText, { opacity: error ? 1 : 0 }]}>
                {error}
              </Text>
              <AnimatedButton
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                value={inputValue}
                onSubmit={onSubmit}
                label="Save"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  centerContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  usernameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Username;
