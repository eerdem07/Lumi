import { User } from "lucide-react";

function UserProfileButton() {
  return (
    <div>
      <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
        <User className="w-5 h-5 text-zinc-400" />
      </button>
    </div>
  );
}

export default UserProfileButton;
