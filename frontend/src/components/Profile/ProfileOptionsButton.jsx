import React from "react";
import { MoreHorizontal } from "lucide-react";

function ProfileOptionsButton() {
  return (
    <div className="px-8 py-4">
      <button className="p-2 rounded-full hover:bg-zinc-800">
        <MoreHorizontal className="w-6 h-6 text-zinc-400" />
      </button>
    </div>
  );
}

export default ProfileOptionsButton;
