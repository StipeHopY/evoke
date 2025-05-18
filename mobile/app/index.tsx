import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";

import { RootState } from "@/store/store";
import { createUser, deleteUser } from "@/store/user/userSlice";
import Username from "@/components/forms/username/UsernameForm";
import useUser from "@/common/hooks/useUser";
import useColorScheme from "@/common/hooks/useColorScheme";

const App = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const User = useSelector((state: RootState) => state.user);
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !User.username) {
      dispatch(createUser({username: user.username}));
    }
  }, [user]);

  // TODO: check loader, because I think is not showing

  if (loading) {
    return <ActivityIndicator color={theme.colors.text} size="large" />;
  }

  if (!user || (user && !user.username)) {
    return <Username />;
  }

  if (user && user.username) {
    return <Redirect href={"/(tabs)/home"} />;
  }
};

export default App;
