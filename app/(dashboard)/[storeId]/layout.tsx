import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Navbar from "@/components/navbar";
import { currentUserId } from "@/lib/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const ProtectedLayout = async ({ children, params }: ProtectedLayoutProps) => {
  const userId = await currentUserId();

  const store = await db.store.findFirst({
    where: {
      employees: {
        has: userId,
      },
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedLayout;
