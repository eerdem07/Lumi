import SearchBar from "./SearchBar";
import UserProfileButton from "./UserProfileButton";

export default function TopBar() {
  return (
    <div className="flex items-center p-4 sticky top-0 bg-zinc-900 bg-opacity-90 z-10">
      <div className="flex items-center justify-between gap-4">
        <SearchBar />
        <UserProfileButton />
      </div>
    </div>
  );
}
