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
import { dbName } from "@/constants/data";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: make this code better

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
    handleGetUser();
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
