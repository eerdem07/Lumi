import React from "react";
import { MoreHorizontal } from "lucide-react";

function ProfileOptionsButton() {
  return (
    <button className="p-2 rounded-full hover:bg-zinc-800">
      <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
    </button>
  );
}

export default ProfileOptionsButton;
