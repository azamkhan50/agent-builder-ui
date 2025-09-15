// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";

// type MenuItem = {
//   label: string;
//   icon: React.ElementType;
//   path?: string; // optional, because some items might not have navigation
// };

// const menuItems: MenuItem[] = [
//   { label: "Topics", icon: Tags },
//   { label: "Actions", icon: Edit, path: "/action" },
//   { label: "Tools", icon: Wrench, path: "/tool" },
//   { label: "Data Library", icon: Library },
//   { label: "Event Log", icon: FileText },
//   { label: "Connections", icon: Network },
// ];

// export default function Sidebar() {
//   const router = useRouter();
//   const [selected, setSelected] = useState("Topics"); // Default selected

//   const handleClick = (item: MenuItem) => {
//     setSelected(item.label);
//     if (item.path) {
//       router.push(item.path);
//     }
//   };

//   return (
//     <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
//       <nav className="flex flex-col gap-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = selected === item.label;
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


// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";

// type MenuItem = {
//   label: string;
//   icon: React.ElementType;
//   path: string;
// };

// const menuItems: MenuItem[] = [
//   { label: "Topics", icon: Tags, path: "/agentpage" },
//   { label: "Actions", icon: Edit, path: "/action" },
//   { label: "Tools", icon: Wrench, path: "/tool" },
//   { label: "Data Library", icon: Library, path: "/data-library" },
//   { label: "Event Log", icon: FileText, path: "/event-log" },
//   { label: "Connections", icon: Network, path: "/connections" },
// ];

// export default function Sidebar() {
//   const router = useRouter();
//   const pathname = usePathname(); // current route

//   const handleClick = (item: MenuItem) => {
//     router.push(item.path);
//   };

//   return (
//     <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
//       <nav className="flex flex-col gap-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.path; // highlight based on route
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

// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";

// type MenuItem = {
//   label: string;
//   icon: React.ElementType;
//   path: string;
// };

// const menuItems: MenuItem[] = [
//   { label: "Topics", icon: Tags, path: "/agentpage/id" }, // default path with id
//   { label: "Actions", icon: Edit, path: "/action" },
//   { label: "Tools", icon: Wrench, path: "/tool" },
//   { label: "Data Library", icon: Library, path: "/data-library" },
//   { label: "Event Log", icon: FileText, path: "/event-log" },
//   { label: "Connections", icon: Network, path: "/connections" },
// ];

// export default function Sidebar() {
//   const router = useRouter();
//   const pathname = usePathname(); // current route

//   const handleClick = (item: MenuItem) => {
//     router.push(item.path);
//   };

//   return (
//     <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
//       <nav className="flex flex-col gap-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           // ✅ allow active if pathname starts with the item path
//           const isActive = pathname.startsWith(item.path);

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
import { useParams, usePathname, useRouter } from "next/navigation";
import { Tags, Edit, Wrench, Library, FileText, Network } from "lucide-react";
import { Agent } from "@/lib/api";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  path: string;
};
interface SideBarProps {
    agents: Agent[];
  agentId?: string;
  agentName?: string;
}


const menuItems: MenuItem[] = [
  { label: "Topics", icon: Tags, path: "/agentpage" }, // path not used for Topics
  { label: "Actions", icon: Edit, path: "/action" },
  { label: "Tools", icon: Wrench, path: "/tool" },
  { label: "Data Library", icon: Library, path: "/datalibrary" },
  { label: "Event Log", icon: FileText, path: "/eventlog" },
  { label: "Connections", icon: Network, path: "/connections" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // current route

  const handleClick = (item: MenuItem) => {
    if (item.label === "Topics") {
      router.push("/agentpage"); // ⬅ go back instead of push
    } else {
      router.push(item.path);
    }
  };

  return (
    <aside className="w-30 bg-gray-100 border-r p-4 space-y-6">
      <nav className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Highlight active based on current pathname (Topics uses "startsWith /agentpage")
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
