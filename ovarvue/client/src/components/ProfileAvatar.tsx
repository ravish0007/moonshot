import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";

const ProfileAvatar: React.FC = () => {
  const navigate = useNavigate();
  const { email, firstName, lastName, removeUser } = useUserStore(
    (state) => state
  );

  const onLogout = () => {
    sessionStorage.clear();
    removeUser();
    navigate("/login");
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer w-14 h-14 text-black border-zinc-300 border  bg-white flex items-center justify-center rounded-full">
            <AvatarFallback className="text-xl bg-white">
              {firstName?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="flex space-x-2">
              <p className="text-center text-sm">{`${firstName} ${lastName}`}</p>
            </div>

            <div className="flex space-x-2 text-sm text-gray-500">
              <span>{email || "Guest"}</span>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={onLogout}
            className="text-red-600 flex justify-center"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;
