import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
const apiUrl = import.meta.env.VITE_API_URL;

import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Kayıt sırasında bir hata oluştu.");
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
            })
          );
        }
        setTimeout(() => navigate("/"), 1200);
      }
    } catch (err) {
      setError("Bağlantı hatası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 bg-black/80 p-8 rounded-lg text-white">
        <div className="text-center space-y-2">
          <img
            src="src/assets/lumi-logo-white.png"
            alt="Lumi Logo"
            className="mx-auto w-16"
          />
          <h1 className="text-2xl font-bold">Lumi için kaydol</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Adınız
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Adınızı girin"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E‑posta adresi
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E‑posta adresinizi girin"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Şifrenizi oluşturun"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Şifre (Tekrar)
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Şifrenizi tekrar girin"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "Kaydediliyor..." : "Kaydol"}
          </button>

          {error && (
            <div className="text-red-400 text-center text-sm mt-2">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-center text-sm mt-2">
              Kayıt başarılı! Yönlendiriliyorsunuz...
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-400">
          Zaten bir hesabınız var mı?
          <a
            href="/login"
            className="text-white underline hover:text-green-400 ml-1"
          >
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
