"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://triasoft.io:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // store tokens and user info
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("last_name", data.last_name);
        localStorage.setItem("current_route", "/home");
        router.push("/home");
      } else {
        const errData = await res.json();
        setError(errData.detail || "Login failed");
      }
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-20">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 flex flex-col"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-600 rounded-md px-3 py-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email address</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6750a4] text-white py-2 rounded-lg hover:bg-[#7a63c5] transition"
        >
          {loading ? "Loading..." : "Continue"}
        </button> */}
<button
  type="submit"
  disabled={loading}
  className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Loading..." : "Continue"}
</button>

        {/* Signup Link */}
        <p className="text-center text-sm mt-3">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-purple-700  hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>

      {/* Footer */}
      <div className="mt-6 flex gap-3 text-sm text-gray-600">
        <button className="hover:underline">Terms of Use</button>
        <span>|</span>
        <button className="hover:underline">Privacy Policy</button>
      </div>
    </div>
  );
}
