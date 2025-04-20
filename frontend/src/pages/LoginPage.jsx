import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 bg-black/80 p-8 rounded-lg text-white">
        <div className="text-center space-y-2">
          <img
            src="src/assets/lumi-logo-white.png"
            alt="Lumi Logo"
            className="mx-auto w-16"
          />
          <h1 className="text-2xl font-bold">Lumi'de oturum aç</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Email login");
          }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E‑posta adresi veya kullanıcı adı
            </label>
            <input
              type="text"
              id="email"
              placeholder="E‑posta adresi veya kullanıcı adı"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Şifre
            </label>
            <input
              type="text"
              id="password"
              placeholder="Şifre"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-full"
          >
            Giriş yap
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Hesabın yok mu?
          <a
            href="#"
            className="text-white underline hover:text-green-400 ml-1"
          >
            Lumi için kaydol
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
