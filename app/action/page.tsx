"use client";

import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";


export default function ActionPage() {


  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <main className="flex-1 bg-purple-50 p-6">
          <h1 className="text-xl font-bold mb-4">
            Action
          </h1>




          <p className="center"> Action</p>




        </main>

        {/* Right Preview */}
        <ChatPreview />

      </div>
    </div>
  );
}




// import { useState } from "react";
// import { Plus, Search, Database, ClipboardList, FileText, Calendar, Info } from "lucide-react";
// import ChatPreview from "@/components/ChatPreview";
// import Header from "@/components/Header";
// import Sidebar from "@/components/SideBar";
// import { JSX } from "react/jsx-dev-runtime";

// type ActionItem = {
//   id: number;
//   icon: JSX.Element;
//   label: string;
// };

// const initialActions: ActionItem[] = [
//   { id: 1, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Identify Object by Name" },
//   { id: 2, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Query Records (Beta)" },
//   { id: 3, icon: <Database className="w-5 h-5 text-pink-500" />, label: "Identify Record by Name" },
//   { id: 4, icon: <Database className="w-5 h-5 text-blue-500" />, label: "Query Records with Aggregate (Beta)" },
//   { id: 5, icon: <ClipboardList className="w-5 h-5 text-purple-500" />, label: "Summarize Record" },
//   { id: 6, icon: <Calendar className="w-5 h-5 text-blue-500" />, label: "Create Booking" },
//   { id: 7, icon: <Info className="w-5 h-5 text-blue-500" />, label: "Get Activity Details" },
//   { id: 8, icon: <FileText className="w-5 h-5 text-blue-500" />, label: "Get Record Details" },
// ];

// export default function ActionPage() {
//   const [actions] = useState<ActionItem[]>(initialActions);
//   const [search, setSearch] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const filtered = actions.filter((a) =>
//     a.label.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Top Header */}
//       <Header agentName="Agent Builder" />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-64 bg-white border-r overflow-y-auto">
//           <Sidebar />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 bg-purple-50 p-6 overflow-y-auto">
//           {/* Header section */}
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-xl ">Manage the actions assigned to your topic. To add or remove actions, your agent must be deactivated.</h1>
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
//               >
//                 <Plus className="w-4 h-4" /> New
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
//                   <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
//                     🌐 Add from Asset Library
//                   </button>
//                   <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
//                     ➕ Add Action
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Search actions..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded-md px-3 py-2 mb-4"
//           />

//           {/* Table Header */}
//           <div className="flex justify-between items-center text-sm font-semibold text-gray-600 border-b pb-2 mb-2">
//             <span>Agent Action Label</span>
//             <span>⋮</span>
//           </div>

//           {/* Action List */}
//           <div className="border rounded-md divide-y bg-white">
//             {filtered.map((action) => (
//               <div
//                 key={action.id}
//                 className="flex justify-between items-center p-3 hover:bg-gray-50"
//               >
//                 <div className="flex items-center gap-2">
//                   {action.icon}
//                   <span>{action.label}</span>
//                 </div>
//                 <button className="px-2 py-1 border rounded hover:bg-gray-100">⋮</button>
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Right Chat Preview */}
//         <aside className="hidden lg:block w-80 bg-white border-l overflow-y-auto">
//           <ChatPreview />
//         </aside>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { Plus, Search, Database, ClipboardList, FileText, Calendar, Info } from "lucide-react";
// import ChatPreview from "@/components/ChatPreview";
// import Header from "@/components/Header";
// import Sidebar from "@/components/SideBar";
// import { useRouter } from "next/navigation"; // ✅ import router
// import { JSX } from "react/jsx-dev-runtime";

// type ActionItem = {
//   id: number;
//   icon: JSX.Element;
//   label: string;
// };

// const initialActions: ActionItem[] = [
//   { id: 1, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Identify Object by Name" },
//   { id: 2, icon: <Search className="w-5 h-5 text-blue-500" />, label: "Query Records (Beta)" },
//   { id: 3, icon: <Database className="w-5 h-5 text-pink-500" />, label: "Identify Record by Name" },
//   { id: 4, icon: <Database className="w-5 h-5 text-blue-500" />, label: "Query Records with Aggregate (Beta)" },
//   { id: 5, icon: <ClipboardList className="w-5 h-5 text-purple-500" />, label: "Summarize Record" },
//   { id: 6, icon: <Calendar className="w-5 h-5 text-blue-500" />, label: "Create Booking" },
//   { id: 7, icon: <Info className="w-5 h-5 text-blue-500" />, label: "Get Activity Details" },
//   { id: 8, icon: <FileText className="w-5 h-5 text-blue-500" />, label: "Get Record Details" },
// ];

// export default function ActionPage() {
//   const [actions] = useState<ActionItem[]>(initialActions);
//   const [search, setSearch] = useState("");
//   const router = useRouter(); // ✅ use router

//   const filtered = actions.filter((a) =>
//     a.label.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Top Header */}
//       <Header agentName="Agent Builder" />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-64 bg-white border-r overflow-y-auto">
//           <Sidebar />
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 bg-purple-50 p-6 overflow-y-auto">
//           {/* Header section */}
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-xl font-bold">Manage Actions</h1>
//             <button
//               onClick={() => router.push("/action/createaction")} // ✅ navigate to ActionModal page
//               className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
//             >
//               <Plus className="w-4 h-4" /> Add Action
//             </button>
//           </div>

//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Select actions..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded-md px-3 py-2 mb-4"
//           />
//           <input
//             type="text"
//             placeholder="Search actions..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded-md px-3 py-2 mb-4"
//           />

//           {/* Action List */}
//           <div className="border rounded-md divide-y bg-white">
//             {filtered.map((action) => (
//               <div
//                 key={action.id}
//                 className="flex justify-between items-center p-3 hover:bg-gray-50"
//               >
//                 <div className="flex items-center gap-2">
//                   {action.icon}
//                   <span>{action.label}</span>
//                 </div>
//                 <button className="px-2 py-1 border rounded hover:bg-gray-100">⋮</button>
//               </div>
//             ))}
//           </div>
//         </main>

//         {/* Right Chat Preview */}
//         <aside className="hidden lg:block w-80 bg-white border-l overflow-y-auto">
//           <ChatPreview />
//         </aside>
//       </div>
//     </div>
//   );
// }


