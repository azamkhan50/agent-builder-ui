"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  agentName: string; // <-- receive agent name as prop
}

export default function Header({ agentName }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    if (!storedToken) {
      router.push("/");
      return;
    }

    const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
    setUserName(fullName || "User");
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#6750a4] text-white flex justify-between items-center px-6 py-4">
      {/* Dynamic title from props */}
      <h1 className="text-xl font-bold">{agentName}</h1>

      <div className="flex items-center gap-4 relative">
        <Bell className="w-6 h-6 cursor-pointer" />
        {userName ? (
          <div className="relative" ref={menuRef}>
            <User
              className="w-6 h-6 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-3">
                <p className="text-sm mb-2">
                  Welcome, <strong>{userName}</strong>
                </p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 w-full text-left text-sm text-violet-600 px-2 py-1 rounded hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-sm">Not logged in</span>
        )}
      </div>
    </header>
  );
}
