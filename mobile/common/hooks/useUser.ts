import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UsernameType } from "@/types/index";

const useUser = () => {
  const [user, setUser] = useState<UsernameType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getuser = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (username) {
        setUser({ username });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  return { user, loading, error };
};

export default useUser;
