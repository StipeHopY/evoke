import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { isUsernameValid } from "@/utils/isUsernameValid";
import { createUser } from "@/store/user/userSlice";
import { UsernameType } from "@/types/index";
import ScreenContainer from "@/components/containers/ScreenContainer";
import useColorScheme from "@/common/hooks/useColorScheme";
import UsernameInput from "./UsernameInput";
import AnimatedButton from "../../ui/AnimatedButton";

const Username = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const { control, handleSubmit } = useForm<UsernameType>();

  const [submittedData, setSubmittedData] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // TODO: hanle loading

  const onSubmit = (data: UsernameType) => {
    const validUsername = isUsernameValid(data.username);

    if (!validUsername.isValid) {
      setError(validUsername.message);
      setSubmittedData(undefined);
      return;
    }

    setError(undefined);
    setSubmittedData(data.username);
    setIsLoading(true);
    dispatch(createUser({ username: data.username }));

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
