"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // validate email
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // validate name
  const isValidName = (name: string) => /^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(name.trim());

  // password strength checker
  const getPasswordStrength = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#\$&*~]/.test(password);
    const isLong = password.length >= 8;

    if (isLong && hasUpper && hasLower && hasDigit && hasSpecial) return "Strong";
    if (password.length >= 6 && (hasUpper || hasDigit || hasSpecial)) return "Medium";
    return "Weak";
  };

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage(null);

    // client-side validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setResponseMessage("Please fill all fields");
      setIsError(true);
      return;
    }
    if (!isValidName(firstName) || !isValidName(lastName)) {
      setResponseMessage("Please enter valid names");
      setIsError(true);
      return;
    }
    if (!validateEmail(email)) {
      setResponseMessage("Please enter a valid email");
      setIsError(true);
      return;
    }
    if (passwordStrength === "Weak") {
      setResponseMessage("Password is too weak");
      setIsError(true);
      return;
    }
    if (password !== confirmPassword) {
      setResponseMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://triasoft.io:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      if (res.ok) {
        setResponseMessage("Signup successful. Please login.");
        setIsError(false);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errData = await res.json();
        setResponseMessage(errData.detail || "Signup failed");
        setIsError(true);
      }
    } catch (err: any) {
      setResponseMessage("Error: " + err.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-lg bg-white shadow-md rounded-xl p-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>

        {responseMessage && (
          <div
            className={`flex items-center gap-2 rounded-md px-3 py-2 mb-4 ${
              isError
                ? "bg-red-100 border border-red-400 text-red-600"
                : "bg-green-100 border border-green-400 text-green-600"
            }`}
          >
            {isError ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            <span className="text-sm">{responseMessage}</span>
          </div>
        )}

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email address</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p
            className={`mt-2 text-sm font-semibold ${
              passwordStrength === "Strong"
                ? "text-green-600"
                : passwordStrength === "Medium"
                ? "text-orange-500"
                : "text-red-600"
            }`}
          >
            Password strength: {passwordStrength}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Use at least 8 characters, one uppercase, one lowercase, one special character and one number.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full  bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg  transition disabled:bg-[#6954a3] "
        >
          {loading ? "Signing up..." : "Continue"}
        </button>

        {/* Already have account */}
        <p className="text-center text-sm mt-3">
          Do you have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-purple-700 hover:underline"
          >
            Login
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
