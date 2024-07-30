"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ContactRound, LogOut, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";

export const UserButton = () => {
  const user = useCurrentUser();
  const role = useCurrentRole();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          <ContactRound className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>
        {role === "ADMIN" && (
          <DropdownMenuItem>
            <UserPlus className="h-4 w-4 mr-2" />
            Add user
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <LogoutButton>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
