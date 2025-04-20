import { Plus, ArrowRight } from "lucide-react";

function CreatePlaylistButton({ setIsModalOpen }) {
  return (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white"
      >
        <Plus className="w-5 h-5 p-0.5 bg-zinc-400 text-zinc-800 rounded-sm" />
        Oluştur
      </button>
      <a href="#" className="text-zinc-400 hover:text-white">
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}

export default CreatePlaylistButton;
