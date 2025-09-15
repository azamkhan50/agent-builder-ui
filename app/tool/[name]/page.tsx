
// "use client";

// import { useState } from "react";
// import { Eye } from "lucide-react";
// import ChatPreview from "@/components/ChatPreview";
// import Header from "@/components/Header";
// import Sidebar from "@/components/SideBar";

// type Collection = {
//   id: number;
//   name: string;
// };

// export default function ToolView() {
//   const [tab, setTab] = useState<"request" | "response" | "auth">("request");
//   const [activeCollection, setActiveCollection] = useState<Collection | null>(
//     null
//   );
//   const [selected, setSelected] = useState<number[]>([]);

//   // Mock collections
//   const collections: Collection[] = [
//     { id: 1, name: "Users API" },
//     { id: 2, name: "Orders API" },
//     { id: 3, name: "Products API" },
//   ];

//   // Mock data
//   const mockRequest = {
//     method: "GET",
//     url: "https://api.example.com/data",
//     headers: { "Content-Type": "application/json" },
//   };

//   const mockResponse = {
//     status: 200,
//     message: "Data retrieved successfully",
//     data: [{ id: 1, name: "Product A", price: 29.99, category: "Electronics" }],
//   };

//   const mockAuth = {
//     type: "Bearer",
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   };

//   // ✅ Toggle row selection
//   const toggleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   // ✅ Download selected as JSON
//   const handleDownload = () => {
//     const selectedCollections = collections.filter((c) =>
//       selected.includes(c.id)
//     );

//     const blob = new Blob([JSON.stringify(selectedCollections, null, 2)], {
//       type: "application/json",
//     });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "selected_collections.json";
//     link.click();
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <Header agentName="Agent Builder" />

//       <div className="flex flex-1">
//         <Sidebar />

//         <main className="flex-1 bg-purple-50 p-6">
//           <h1 className="text-xl font-bold mb-4">Tools</h1>

//           {/* Table of Collections */}
//           <table className="w-full bg-white shadow rounded mb-6">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="px-4 py-2 border">Select</th>
//                 <th className="px-4 py-2 border">Collection</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {collections.map((col) => (
//                 <tr key={col.id} className="even:bg-gray-50">
//                   <td className="px-4 py-2 border text-center">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(col.id)}
//                       onChange={() => toggleSelect(col.id)}
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">{col.name}</td>
//                   <td className="px-2 py-2 border">
//                    <td className="px-2 py-2 border text-center w-16">
//   <button
//     title="View endpoints"
//     className="p-1.5 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition"
//     onClick={() => setActiveCollection(col)}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       className="w-4 h-4"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//       />
//     </svg>
//   </button>
// </td>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Download Selected Button */}
//           {selected.length > 0 && (
//             <button
//               onClick={handleDownload}
//               className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Import ({selected.length})
//             </button>
//           )}

//           {/* Tabs Section (only if a collection is selected) */}
//           {activeCollection && (
//             <div>
//               <h2 className="text-lg font-bold mb-4">
//                 {activeCollection.name}
//               </h2>

//               {/* Tabs */}
//               <div className="flex border-b mb-4">
//                 <button
//                   className={`px-4 py-2 ${
//                     tab === "request" ? "bg-white border-t border-x" : "bg-gray-100"
//                   }`}
//                   onClick={() => setTab("request")}
//                 >
//                   Request
//                 </button>
//                 <button
//                   className={`px-4 py-2 ${
//                     tab === "response" ? "bg-white border-t border-x" : "bg-gray-100"
//                   }`}
//                   onClick={() => setTab("response")}
//                 >
//                   Response
//                 </button>
//                 <button
//                   className={`px-4 py-2 ${
//                     tab === "auth" ? "bg-white border-t border-x" : "bg-gray-100"
//                   }`}
//                   onClick={() => setTab("auth")}
//                 >
//                   Auth
//                 </button>
//               </div>

//               {/* Tab Content */}
//               <div className="bg-white border rounded p-4 h-[400px] overflow-auto font-mono text-sm whitespace-pre">
//                 {tab === "request" && JSON.stringify(mockRequest, null, 2)}
//                 {tab === "response" && JSON.stringify(mockResponse, null, 2)}
//                 {tab === "auth" && JSON.stringify(mockAuth, null, 2)}
//               </div>

//               <button
//                 className="mt-4 bg-gray-200 px-4 py-2 rounded"
//                 onClick={() => setActiveCollection(null)}
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </main>

//         <ChatPreview />
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

type Collection = {
  id: number;
  name: string;
};

export default function ToolView() {
  const [tab, setTab] = useState<"request" | "response" | "auth">("request");
  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null
  );
  const [selected, setSelected] = useState<number[]>([]);

  // Mock collections
  const collections: Collection[] = [
    { id: 1, name: "Users API" },
    { id: 2, name: "Orders API" },
    { id: 3, name: "Products API" },
  ];

  // Mock data
  const mockRequest = {
    method: "GET",
    url: "https://api.example.com/data",
    headers: { "Content-Type": "application/json" },
  };

  const mockResponse = {
    status: 200,
    message: "Data retrieved successfully",
    data: [{ id: 1, name: "Product A", price: 29.99, category: "Electronics" }],
  };

  const mockAuth = {
    type: "Bearer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  };

  // ✅ Toggle row selection
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // ✅ Download selected as JSON
  const handleDownload = () => {
    const selectedCollections = collections.filter((c) =>
      selected.includes(c.id)
    );

    const blob = new Blob([JSON.stringify(selectedCollections, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_collections.json";
    link.click();
  };

  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-purple-50 p-6">
          <h1 className="text-xl font-bold mb-4">Tools</h1>

          {/* Table of Collections */}
          <table className="w-full bg-white shadow rounded mb-6">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Select</th>
                <th className="px-4 py-2 border">Collection</th>
                <th className="px-2 py-2 border w-16 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((col) => (
                <tr key={col.id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(col.id)}
                      onChange={() => toggleSelect(col.id)}
                    />
                  </td>
                  <td className="px-4 py-2 border">{col.name}</td>
                  <td className="px-2 py-2 border text-center w-16">
                    <button
                      title="View endpoints"
                      className="p-1.5 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      onClick={() => setActiveCollection(col)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Download Selected Button */}
          {selected.length > 0 && (
            <button
              onClick={handleDownload}
              className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Import ({selected.length})
            </button>
          )}

          {/* Tabs Section (only if a collection is selected) */}
          {activeCollection && (
            <div>
              <h2 className="text-lg font-bold mb-4">
                {activeCollection.name}
              </h2>

              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button
                  className={`px-4 py-2 ${
                    tab === "request" ? "bg-white border-t border-x" : "bg-gray-100"
                  }`}
                  onClick={() => setTab("request")}
                >
                  Request
                </button>
                <button
                  className={`px-4 py-2 ${
                    tab === "response" ? "bg-white border-t border-x" : "bg-gray-100"
                  }`}
                  onClick={() => setTab("response")}
                >
                  Response
                </button>
                <button
                  className={`px-4 py-2 ${
                    tab === "auth" ? "bg-white border-t border-x" : "bg-gray-100"
                  }`}
                  onClick={() => setTab("auth")}
                >
                  Auth
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-white border rounded p-4 h-[400px] overflow-auto font-mono text-sm whitespace-pre">
                {tab === "request" && JSON.stringify(mockRequest, null, 2)}
                {tab === "response" && JSON.stringify(mockResponse, null, 2)}
                {tab === "auth" && JSON.stringify(mockAuth, null, 2)}
              </div>

              <button
                className="mt-4 bg-gray-200 px-4 py-2 rounded"
                onClick={() => setActiveCollection(null)}
              >
                Close
              </button>
            </div>
          )}
        </main>

        <ChatPreview />
      </div>
    </div>
  );
}
