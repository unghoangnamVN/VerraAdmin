import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { db } from "@/lib/db";
import { UserButton } from "./auth/user-button";
import { currentUserId } from "@/lib/auth";

const Navbar = async () => {
  const userId = await currentUserId();

  const stores = await db.store.findMany({
    where: {
      employees: {
        has: userId,
      },
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
