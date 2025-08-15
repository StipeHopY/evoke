import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import { getUserAction } from "@/store/actions/userActions";
import Username from "@/components/forms/username/UsernameForm";
import { handleError } from "@/utils/handleError";
import ScreenContainer from "@/components/ui/ScreenContainer";
import Error from "@/components/ui/Error";
import Loader from "@/components/ui/Loader";
import { HOME_SCREEN } from "@/constants/routes";
import { getTasksAction } from "@/store/actions/tasksActions";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const tasks = useSelector((state: RootState) => state.tasks);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initializeApp = async () => {
    if (!user) {
      await handleGetUser();
    }
    if (tasks.length === 0) {
      await handleGetTasks();
    }
  };

  const handleGetTasks = async () => {
    try {
      setLoading(true);
      const { error: err } = await dispatch(getTasksAction());

      if (err) {
        setError(err);
        return;
      }

      setError(null);
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
    }
  };

  const handleGetUser = async () => {
    try {
      setLoading(true);
      const { error: err } = await dispatch(getUserAction());

      if (err) {
        setError(err);
        return;
      }

      setError(null);
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ScreenContainer>
        <Error message={error} setMessage={setError} isModal={true} />
      </ScreenContainer>
    );
  }

  if (!user && !loading && !error) {
    return <Username />;
  }

  if (user && !loading && !error) {
    return <Redirect href={HOME_SCREEN} />;
  }
};

export default App;
