import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserState } from "@/types/index";
import { handleError } from "@/utils/handleError";

const useUser = () => {
  const [user, setUser] = useState<UserState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetUser = async () => {
    try {
      const userItem = await AsyncStorage.getItem("user");
      if (userItem) {
        const parseUser = JSON.parse(userItem);
        setUser(parseUser);
      }
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage);
    } finally {
      
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return { user, loading, error };
};

export default useUser;
