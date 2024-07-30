import { auth } from "@/auth";

export const currentUserId = async () => {
  const session = await auth();

  return session?.user.id;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
