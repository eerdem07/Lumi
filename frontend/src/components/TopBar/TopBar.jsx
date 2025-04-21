import React from "react";
import SearchBar from "./SearchBar";
import UserProfileButton from "./UserProfileButton";

export default function TopBar() {
  return (
    <div className="sticky top-0 bg-zinc-900 bg-opacity-90 z-10 px-4 sm:px-6 py-2">
      <div className="grid grid-cols-3 items-center w-full gap-4">
        <div className="justify-self-center w-full max-w-xs sm:max-w-sm md:max-w-md">
          <SearchBar />
        </div>

        <div className="justify-self-end">
          <UserProfileButton />
        </div>
      </div>
    </div>
  );
}
