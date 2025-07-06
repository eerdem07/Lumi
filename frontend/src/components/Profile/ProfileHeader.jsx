export default function ProfileHeader() {
  return (
    <div className="pt-8 px-6 sm:px-8 md:px-12 lg:px-24 pb-6 flex items-center gap-4 sm:gap-6">
      <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-zinc-700 flex-shrink-0">
        <img
          src="/placeholder.svg?height=192&width=192"
          alt="Profile picture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-sm text-zinc-400 mb-1 sm:mb-2">Profil</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6">
          Emre Erdem
        </h1>
        <div className="text-sm text-zinc-400">
          Herkese Açık 10 Çalma Listesi • Takip Edilen: 1
        </div>
      </div>
    </div>
  );
}
