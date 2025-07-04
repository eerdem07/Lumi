import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
// const apiUrl = import.meta.env.VITE_API_BASE_URL;

const apiUrl = "https://lumi-287286640888.europe-west1.run.app/api";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  console.log(apiUrl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.email || !form.password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Giriş sırasında bir hata oluştu.");
      } else {
        setSuccess(true);

        if (data.token && data.user) {
          dispatch(
            setCredentials({
              user: {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
                // profilePictureUrl ve başka alanlar da olabilir
              },
              token: data.token,
            })
          );
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              // profilePictureUrl: data.user.profilePictureUrl,
            })
          );
        }

        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setError("Bağlantı hatası!");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              E‑posta adresi
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E‑posta adresi"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
              disabled={loading}
              autoComplete="username"
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
              value={form.password}
              onChange={handleChange}
              placeholder="Şifre"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-500"
              disabled={loading}
              autoComplete="current-password"
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
                  disabled={loading}
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
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş yap"}
          </button>
          {error && (
            <div className="text-red-400 text-center text-sm mt-2">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-center text-sm mt-2">
              Giriş başarılı! Yönlendiriliyorsunuz...
            </div>
          )}
        </form>
        <p className="text-center text-sm text-gray-400">
          Hesabın yok mu?
          <a
            href="/signup"
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
