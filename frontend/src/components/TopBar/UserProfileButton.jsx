import { Link } from "react-router-dom";
import { User } from "lucide-react"; // Kullandığın ikona göre değiştir.

export default function UserProfileButton() {
  return (
    <div>
      <Link to="/profile-update">
        <button
          className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition"
          aria-label="Profil"
        >
          <User className="w-5 h-5 text-zinc-400" />
        </button>
      </Link>
    </div>
  );
}
