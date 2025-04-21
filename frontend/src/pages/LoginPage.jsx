import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-black/80 p-6 sm:p-8 rounded-lg text-white shadow-lg">
        <div className="text-center space-y-2">
          <img
            src="src/assets/lumi-logo-white.png"
            alt="Lumi Logo"
            className="mx-auto w-16 h-16 object-contain"
          />
          <h1 className="text-2xl font-bold tracking-tight">
            Lumi'de oturum aç
          </h1>
          <p className="text-sm text-gray-400">Devam etmek için giriş yapın.</p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Email login");
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              E‑posta adresi veya kullanıcı adı
            </label>
            <input
              type="text"
              id="email"
              placeholder="E‑posta adresi veya kullanıcı adı"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              placeholder="Şifre"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember-me"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-400">
                  Beni hatırla
                </label>
              </div>
            </div>

            <a
              href="#"
              className="text-sm text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Şifreni mi unuttun?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Giriş yap
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Hesabın yok mu?
          <a
            href="#"
            className="text-white underline hover:text-green-400 ml-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Lumi için kaydol
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
