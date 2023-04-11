import { auth } from "./fb";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUserPermissionLevel = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading || error || !user) return [null, loading];
  return ["MECHANIC", false];
  // TODO: check mechanic permission level
};

export const useUserEmail = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading || error || !user) return null;
  return user.email;
};
