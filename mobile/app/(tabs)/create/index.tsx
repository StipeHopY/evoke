import { Redirect } from "expo-router";

import { DETAILS_SCREEN } from "@/constants/routes";

const CreateScreen = () => {
  // TODO: check if user is logged in
  return <Redirect href={DETAILS_SCREEN} />;
};

export default CreateScreen;
