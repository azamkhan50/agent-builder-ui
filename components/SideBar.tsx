
// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";
// import { Agent } from "@/lib/api";

// type MenuItem = {
//   label: string;
//   icon: React.ElementType;
//   path: string;
// };
// interface SideBarProps {
//   agents?: Agent[];
//   agentId: string;   // required
//   agentName: string; // required
// }

// const menuItems: MenuItem[] = [
//   { label: "Topics", icon: Tags, path: "" }, // base
//   { label: "Actions", icon: Edit, path: "action" },
//   { label: "Tools", icon: Wrench, path: "tool" },
//   { label: "Data Library", icon: Library, path: "datalibrary" },
//   { label: "Event Log", icon: FileText, path: "eventlog" },
//   { label: "Connections", icon: Network, path: "connections" },
// ];

// export default function Sidebar({ agentId, agentName }: SideBarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleClick = (item: MenuItem) => {
//     if (item.label === "Topics") {
//       router.push(`/agentpage/${agentId}/${encodeURIComponent(agentName)}`);
//     } else {
//       router.push(`/agentpage/${agentId}/${encodeURIComponent(agentName)}/${item.path}`);
//     }
//   };

//   return (
//     <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
//       <nav className="flex flex-col gap-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname.includes(item.path) || 
//                           (item.label === "Topics" && pathname === `/agentpage/${agentId}/${agentName}`);

//           return (
//             <button
//               key={item.label}
//               onClick={() => handleClick(item)}
//               className={`flex flex-col items-center font-medium px-2 py-2 rounded-md transition-colors ${
//                 isActive
//                   ? "bg-purple-200 text-purple-800"
//                   : "text-gray-700 hover:text-purple-700 hover:bg-gray-200"
//               }`}
//             >
//               <Icon className="w-6 h-6 mb-1" />
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }
"use client";
import { usePathname, useRouter } from "next/navigation";
import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";
import { useEffect } from "react";
import { Agent } from "@/lib/api";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};
interface SideBarProps {
  agents?: Agent[];
  agentId?: string;
  agentName?: string;
}

const menuItems: MenuItem[] = [
  { label: "Topics", icon: Tags, path: "/agentpage" },
  { label: "Actions", icon: Edit, path: "/action" },
  { label: "Tools", icon: Wrench, path: "/tool" },
  { label: "Data Library", icon: Library, path: "/datalibrary" },
  { label: "Event Log", icon: FileText, path: "/eventlog" },
  { label: "Connections", icon: Network, path: "/connections" },
];

export default function Sidebar({ agentId, agentName }: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Save props to localStorage (so they survive navigation)
  useEffect(() => {
    if (agentId && agentName) {
      localStorage.setItem("agentId", agentId);
      localStorage.setItem("agentName", agentName);
    }
  }, [agentId, agentName]);

  // fallback if props are undefined
  const savedId = agentId || localStorage.getItem("agentId") || "";
  const savedName = agentName || localStorage.getItem("agentName") || "";

  const handleClick = (item: MenuItem) => {
    if (item.label === "Topics") {
      router.push(`/agentpage/${savedId}/${encodeURIComponent(savedName)}`);
    } else {
      router.push(item.path);
    }
  };

  return (
    <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
      <nav className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.label === "Topics"
              ? pathname.startsWith("/agentpage")
              : pathname.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center font-medium px-2 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-purple-200 text-purple-800"
                  : "text-gray-700 hover:text-purple-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

