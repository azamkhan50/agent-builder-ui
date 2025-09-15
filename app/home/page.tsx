
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Bell, User, LogOut, Plus, Edit, Trash2 } from "lucide-react";
// import Image from "next/image";



// interface Agent {
//     id: string;
//     name: string;
//     description?: string;
// }

// export default function HomePage() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const [agents, setAgents] = useState<Agent[]>([]);
//     const [token, setToken] = useState<string | null>(null);
//     const [userName, setUserName] = useState<string | null>(null);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const menuRef = useRef<HTMLDivElement>(null);


//     useEffect(() => {
//         const storedToken = localStorage.getItem("access_token");
//         const firstName = localStorage.getItem("first_name");
//         const lastName = localStorage.getItem("last_name");

//         if (!storedToken) {
//             router.push("/"); // not logged in, go back to login
//             return;
//         }

//         setToken(storedToken);
//         setUserName(`${firstName ?? ""} ${lastName ?? ""}`.trim());

//         const fetchAgents = async () => {
//             try {
//                 const res = await fetch("http://triasoft.io:8000/api/agents/", {
//                     headers: {
//                         Authorization: `Bearer ${storedToken}`,
//                     },
//                 });

//                 if (!res.ok) throw new Error("Failed to fetch agents");
//                 const data = await res.json();
//                 setAgents(data);
//             } catch (err) {
//                 console.error("Error fetching agents:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAgents();
//     }, [router]);

//     const handleClick = () => {
//          router.push("/agentbuilder");
//          // 👈 This navigates to /AgentBuilder
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         function handleClickOutside(event: MouseEvent) {
//             if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//                 setMenuOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleLogout = () => {
//         localStorage.clear();
//         router.push("/");
//     };
// const handleEdit = (id: string) => {
//   router.push(`/agentbuilder/${id}`);
// };
//     const handleDelete = async (id: string, name: string, ) => {
//         const confirmDelete = window.confirm(`Are you sure you want to delete agent ${name}?`);

//         if (!confirmDelete) return;

//         try {
//             const response = await fetch(`http://triasoft.io:8000/api/agents/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 alert(`Agent ${name} deleted successfully.`);
//                 // 🔄 Optionally refresh or update state here
//                 // e.g. setAgents(prev => prev.filter(agent => agent.id !== id));
//             } else {
//                 const errorData = await response.json();
//                 alert(`Failed to delete agent: ${errorData.message || "Unknown error"}`);
//                 console.log(errorData)
//             }
//         } catch (error) {
//             console.error("Delete error:", error);
//             alert("An error occurred while deleting the agent.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col">
//             {/* Header */}
//             <header className="w-full bg-[#6750a4] text-white flex justify-between items-center px-6 py-4">
//                 <h1 className="text-xl font-bold">Agent Builder</h1>

//                 <div className="flex items-center gap-4 relative">
//                     <Bell className="w-6 h-6 cursor-pointer" />

//                     {userName ? (
//                         <div className="relative" ref={menuRef}>
//                             <User
//                                 className="w-6 h-6 cursor-pointer"
//                                 onClick={() => setMenuOpen(!menuOpen)}
//                             />

//                             {/* Dropdown */}
//                             {menuOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-3">
//                                     <p className="text-sm mb-2">
//                                         Welcome, <strong>{userName}</strong>
//                                     </p>
//                                     <button
//                                         onClick={handleLogout}
//                                         className="flex items-center gap-1 w-full text-left text-sm text-violet-600 px-2 py-1 rounded hover:bg-gray-100"
//                                     >
//                                         <LogOut className="w-4 h-4" />
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <span className="text-sm">Not logged in</span>
//                     )}
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="flex-1 p-6">
//                 {loading ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                 ) : agents.length === 0 ? (
//                     <div className="relative flex flex-col items-center justify-center">
//                         {/* Button top-right */}
//                         <div className="absolute top-15 right-4">
//                             <button
//                                 onClick={handleClick}
//                             className="flex items-center gap-2 bg-[#6750a4] text-white px-3  py-1.5 rounded-full shadow hover:bg-[#5a3798]">
//                                 <Plus className="w-4 h-4" /> New Agent
//                             </button>
//                         </div>

//                         {/* Center content */}
//                         <Image
//                             src="/image1.jpg"
//                             alt="No agents"
//                             width={300}
//                             height={300}
//                             className="mb-4"
//                         />
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold">Your Agents</h2>
//                             {/* <button className="flex items-center gap-2 bg-[#6750a4] text-white px-4 py-2 rounded-lg shadow hover:bg-[#6750a4]">
//                 <Plus className="w-5 h-5" /> New Agent
//               </button> */}
//                             <button
//                                 onClick={handleClick}
//                                 className="flex items-center gap-2 bg-[#6a44b1] text-white px-3 py-1.5 rounded-full shadow hover:bg-[#5a3798]"
//                             >
//                                 <Plus className="w-4 h-4" /> New Agent
//                             </button>


//                         </div>

//                         {/* Table */}
//                         <div className="overflow-x-auto bg-white rounded-lg shadow">
//                             <table className="w-full border-collapse">
//                                 <thead>
//                                     <tr className="bg-[#6750a4] text-white">
//                                         <th className="px-4 py-2 text-left">Name</th>
//                                         <th className="px-4 py-2 text-left">Description</th>
//                                         <th className="px-4 py-2 text-left">Created By</th>
//                                         {/* <th className="px-4 py-2 text-left">Modified By</th> */}
//                                         <th className="px-4 py-2 text-center">Modified By</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {agents.map((agent, index) => (
//                                         <tr
//                                             key={agent.id}
//                                             className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                                                 } hover:bg-gray-100`}
//                                         >
//                                             <td className="px-4 py-2 text-violet-700 font-semibold">
//                                                 {agent.name}
//                                             </td>
//                                             <td className="px-4 py-2">
//                                                 {agent.description ?? "No description"}
//                                             </td>
//                                             <td className="px-4 py-2">{userName}</td>
//                                             {/* <td className="px-4 py-2">{userName}</td> */}
//                                             <td className="px-4 py-2 flex justify-center gap-3">
//                                                 <button
//                                                     onClick={() => handleEdit(agent.id)}
//                                                     className="text-blue-600 hover:text-blue-800"
//                                                 >
//                                                     <Edit className="w-5 h-5" />
//                                                 </button>
//                                                <button
//                                                     onClick={() => handleDelete(agent.id, agent.name,)}
//                                                     className="text-red-600 hover:text-red-800"
//                                                 >
//                                                     <Trash2 className="w-5 h-5" />
//                                                 </button>

//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AgentTable from "@/components/AgentTable";
import { fetchAgents, deleteAgent, Agent } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    if (!storedToken) {
      router.push("/");
      return;
    }

    setToken(storedToken);
    setUserName(`${firstName ?? ""} ${lastName ?? ""}`.trim());

    const loadAgents = async () => {
      try {
        const data = await fetchAgents(storedToken);
        setAgents(data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, [router]);

  const handleDelete = async (id: string, name: string) => {
    if (!token) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      await deleteAgent(id, token);
      alert(`Agent ${name} deleted successfully.`);
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header  agentName="Agent Builder" />
      <main className="flex-1 p-6">
        <AgentTable agents={agents} userName={userName} loading={loading} onDelete={handleDelete} />
      </main>
    </div>
  );
}
