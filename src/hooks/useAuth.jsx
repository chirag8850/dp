import { useUser } from "@clerk/nextjs";

export const useAuth = () => {
  const { user, isSignedIn } = useUser();
  return { user, isSignedIn };
};
