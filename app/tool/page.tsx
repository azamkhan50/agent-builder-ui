// // "use client";

// // import { useState, useEffect } from "react";
// // import { Pencil, Eye } from "lucide-react"; // icons
// // import ChatPreview from "@/components/ChatPreview";
// // import Header from "@/components/Header";
// // import Sidebar from "@/components/SideBar";

// // export default function ToolPage() {
// //   const [collections, setCollections] = useState<
// //     { id: number; name: string }[]
// //   >([]);
// //   const [editing, setEditing] = useState<{ id: number; name: string } | null>(
// //     null
// //   );
// //   const [newName, setNewName] = useState("");

// //   // ✅ Load from localStorage when page mounts
// //   useEffect(() => {
// //     const saved = localStorage.getItem("collections");
// //     if (saved) {
// //       setCollections(JSON.parse(saved));
// //     }
// //   }, []);

// //   // ✅ Save to localStorage whenever collections change
// //   useEffect(() => {
// //     localStorage.setItem("collections", JSON.stringify(collections));
// //   }, [collections]);

// //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       try {
// //         const json = JSON.parse(e.target?.result as string);
// //         // Postman collection usually has "info" with "name"
// //         const name = json.info?.name || `Collection ${collections.length + 1}`;

// //         setCollections((prev) => [...prev, { id: Date.now(), name }]);
// //       } catch (err) {
// //         alert("Invalid Postman Collection file");
// //       }
// //     };
// //     reader.readAsText(file);
// //   };

// //   const handleEditClick = (col: { id: number; name: string }) => {
// //     setEditing(col);
// //     setNewName(col.name);
// //   };

// //   const handleSaveEdit = () => {
// //     setCollections((prev) =>
// //       prev.map((c) => (c.id === editing?.id ? { ...c, name: newName } : c))
// //     );
// //     setEditing(null);
// //   };

// //   return (
// //     <div className="h-screen flex flex-col">
// //       <Header agentName="Agent Builder" />

// //       <div className="flex flex-1">
// //         {/* Sidebar */}
// //         <Sidebar />

// //         {/* Main Content */}
// //         <main className="flex-1 bg-purple-50 p-6">
// //           <h1 className="text-xl font-bold mb-2">Tools</h1>
// //           <p className="text-gray-600 mb-4">
// //             Setup External Systems through APIs.
// //           </p>

// //           {/* Upload button */}
// //           <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
// //             + Import Postman Collection
// //             <input
// //               type="file"
// //               accept=".json"
// //               className="hidden"
// //               onChange={handleFileUpload}
// //             />
// //           </label>

// //           {/* Table */}
// //           <table className="mt-6 border w-full bg-white shadow rounded">
// //             <thead>
// //               <tr className="bg-gray-100 text-left">
// //                 <th className="px-4 py-2 border">Collection</th>
// //                 <th className="px-4 py-2 border">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {collections.map((col) => (
// //                 <tr key={col.id}>
// //                   <td className="px-4 py-2 border">{col.name}</td>
// //                   <td className="px-4 py-2 border flex gap-3">
// //                     <button className="text-blue-600 hover:text-blue-800">
// //                       <Eye size={18} />
// //                     </button>
// //                     <button
// //                       className="text-green-600 hover:text-green-800"
// //                       onClick={() => handleEditClick(col)}
// //                     >
// //                       <Pencil size={18} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>

// //           {/* Edit Modal */}
// //           {editing && (
// //             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //               <div className="bg-white rounded-lg shadow p-6 w-96">
// //                 <h2 className="text-lg font-bold mb-4">Edit Collection</h2>
// //                 <input
// //                   type="text"
// //                   value={newName}
// //                   onChange={(e) => setNewName(e.target.value)}
// //                   className="w-full border px-3 py-2 rounded mb-4"
// //                 />
// //                 <div className="flex justify-end gap-3">
// //                   <button
// //                     className="px-4 py-2 rounded bg-gray-200"
// //                     onClick={() => setEditing(null)}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     className="px-4 py-2 rounded bg-blue-500 text-white"
// //                     onClick={handleSaveEdit}
// //                   >
// //                     Save
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </main>

// //         {/* Right Preview */}
// //         <ChatPreview />
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { Pencil, Eye } from "lucide-react"; // icons
// import ChatPreview from "@/components/ChatPreview";
// import Header from "@/components/Header";
// import Sidebar from "@/components/SideBar";

// interface Collection {
//   id: number;
//   name: string;
// }

// export default function ToolPage() {
//   const [collections, setCollections] = useState<Collection[]>([]);
//   const [editing, setEditing] = useState<Collection | null>(null);
//   const [newName, setNewName] = useState("");

//   // ✅ Load from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("collections");
//     if (saved) {
//       setCollections(JSON.parse(saved));
//     }
//   }, []);

//   // ✅ Save to localStorage when collections change
//   useEffect(() => {
//     localStorage.setItem("collections", JSON.stringify(collections));
//   }, [collections]);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const json = JSON.parse(e.target?.result as string);

//         // Get collection name from Postman JSON
//         const name = json.info?.name || `Collection ${collections.length + 1}`;

//         // Add new collection
//         setCollections((prev) => [
//           ...prev,
//           { id: Date.now(), name },
//         ]);
//       } catch (err) {
//         alert("Invalid Postman Collection file");
//       }
//     };
//     reader.readAsText(file);

//     // Reset input so user can upload the same file again if needed
//     event.target.value = "";
//   };

//   const handleEditClick = (col: Collection) => {
//     setEditing(col);
//     setNewName(col.name);
//   };

//   const handleSaveEdit = () => {
//     setCollections((prev) =>
//       prev.map((c) => (c.id === editing?.id ? { ...c, name: newName } : c))
//     );
//     setEditing(null);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <Header agentName="Agent Builder" />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <main className="flex-1 bg-purple-50 p-6">
//           <h1 className="text-xl font-bold mb-2">Tools</h1>
//           <p className="text-gray-600 mb-4">
//             Setup External Systems through APIs.
//           </p>

//           {/* Upload button */}
//           <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
//             + Import Postman Collection
//             <input
//               type="file"
//               accept=".json"
//               className="hidden"
//               onChange={handleFileUpload}
//             />
//           </label>

//           {/* Table */}
//           <table className="mt-6 border w-full bg-white shadow rounded">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="px-4 py-2 border">Collection</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {collections.map((col) => (
//                 <tr key={col.id}>
//                   <td className="px-4 py-2 border">{col.name}</td>
//                   <td className="px-4 py-2 border flex gap-3">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       onClick={() => handleEditClick(col)}
//                     >
//                       <Pencil size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Edit Modal */}
//           {editing && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//               <div className="bg-white rounded-lg shadow p-6 w-96">
//                 <h2 className="text-lg font-bold mb-4">Edit Collection</h2>
//                 <input
//                   type="text"
//                   value={newName}
//                   onChange={(e) => setNewName(e.target.value)}
//                   className="w-full border px-3 py-2 rounded mb-4"
//                 />
//                 <div className="flex justify-end gap-3">
//                   <button
//                     className="px-4 py-2 rounded bg-gray-200"
//                     onClick={() => setEditing(null)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="px-4 py-2 rounded bg-blue-500 text-white"
//                     onClick={handleSaveEdit}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>

//         {/* Right Preview */}
//         <ChatPreview />
//       </div>
//     </div>
//   );
// }
"use client";

import { useRef, useState } from "react";
import { Pencil, Eye, Trash2 } from "lucide-react";
import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";


type Endpoint = {
  id: number;
  name: string;
  method: string;
  url: string;
};

type Collection = {
  id: number;
  name: string;
  endpoints: Endpoint[];
};

const STORAGE_KEY = "postman_collections";

// ✅ helper to read once from localStorage
const loadCollections = (): Collection[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ✅ helper to save
const saveCollections = (data: Collection[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save collections", err);
  }
};

export default function ToolPage() {
  // ✅ initialize from storage immediately
  const [collections, setCollections] = useState<Collection[]>(loadCollections);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [newName, setNewName] = useState("");
  const [viewing, setViewing] = useState<Collection | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();


  // --- utilities ---
  const makeUniqueName = (prevCollections: Collection[], baseName: string) => {
    let name = baseName;
    if (!prevCollections.some((c) => c.name === name)) return name;
    let i = 1;
    while (prevCollections.some((c) => c.name === `${baseName} (${i})`)) {
      i++;
    }
    return `${baseName} (${i})`;
  };

  const extractEndpoints = (items: any[]): Endpoint[] => {
    const out: Endpoint[] = [];
    const walk = (arr: any[]) => {
      arr.forEach((it) => {
        if (it.request) {
          const method = it.request.method || "GET";
          let urlRaw = "";
          if (typeof it.request.url === "string") urlRaw = it.request.url;
          else if (it.request.url?.raw) urlRaw = it.request.url.raw;
          else if (it.request.url?.toString) urlRaw = String(it.request.url);
          out.push({
            id: Date.now() + Math.floor(Math.random() * 100000),
            name: it.name || "Untitled",
            method,
            url: urlRaw || "",
          });
        }
        if (Array.isArray(it.item) && it.item.length) walk(it.item);
      });
    };
    walk(items);
    return out;
  };

  // --- actions ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(String(ev.target?.result ?? "{}"));
        const baseName = json.info?.name || `Collection ${collections.length + 1}`;
        setCollections((prev) => {
          const uniqueName = makeUniqueName(prev, baseName);
          const items = Array.isArray(json.item) ? json.item : [];
          const endpoints = extractEndpoints(items);
          const newCollection: Collection = {
            id: Date.now() + Math.floor(Math.random() * 100000),
            name: uniqueName,
            endpoints,
          };
          const updated = [...prev, newCollection];
          saveCollections(updated); // ✅ save immediately
          return updated;
        });
      } catch (err) {
        alert("Invalid Postman Collection JSON file");
        console.error(err);
      } finally {
        if (inputRef.current) inputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    setCollections((prev) => {
      const updated = prev.map((c) => (c.id === editing.id ? { ...c, name: newName } : c));
      saveCollections(updated);
      return updated;
    });
    setEditing(null);
  };

  const handleDeleteCollection = (id: number) => {
    if (!confirm("Delete this collection?")) return;
    setCollections((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveCollections(updated);
      return updated;
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-purple-50 p-6">
          <h1 className="text-xl font-bold mb-2">Tools</h1>
          <p className="text-gray-600 mb-4">Setup External Systems through APIs.</p>

          <label className="inline-block bg-[#6750a4]  hover:bg-[#6750a4] text-white px-4 py-2 rounded cursor-pointer">
            + Import Postman Collection
            <input
              ref={inputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <div className="mt-10 flex justify-center">
            <table className="w-150 bg-white shadow rounded table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left divide-x divide-gray-200">
                  <th className="px-4 py-2">Collection</th>
                  <th className="px-2 py-2 w-[120px] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {collections.length === 0 && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No collections imported yet.
                    </td>
                  </tr>
                )}
                {collections.map((col) => (
                  <tr key={col.id} className="even:bg-gray-50 divide-x divide-gray-200">
                    <td className="px-2 py-2 align-top">{col.name}</td>
                    <td className="px-2 py-2 align-top text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {/* View button */}
                        <button
                          title="View endpoints"
                          className="p-1.5 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          onClick={() =>
                            router.push(`/tool/${encodeURIComponent(col.name)}`)
                          }
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

                        {/* Edit button */}
                        <button
                          title="Edit name"
                          className="p-1.5 rounded-md text-green-600 hover:bg-green-600 hover:text-white transition"
                          onClick={() => {
                            setEditing(col);
                            setNewName(col.name);
                          }}
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
                              d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"
                            />
                          </svg>
                        </button>

                        {/* Delete button */}
                        <button
                          title="Delete collection"
                          className="p-1.5 rounded-md text-red-600 hover:bg-red-600 hover:text-white transition"
                          onClick={() => handleDeleteCollection(col.id)}
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H5m14 0H5"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



          {/* Edit modal */}
          {editing && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Edit Collection</h2>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 rounded bg-gray-200"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-blue-500 text-white"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View modal */}
          {viewing && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow p-6 w-[900px] max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">{viewing.name} — Endpoints</h2>
                  <button
                    className="px-2 py-1 rounded bg-gray-200"
                    onClick={() => setViewing(null)}
                  >
                    Close
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Method</th>
                      <th className="p-2 text-left">URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewing.endpoints.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">
                          No endpoints found in this collection.
                        </td>
                      </tr>
                    )}
                    {viewing.endpoints.map((ep) => (
                      <tr key={ep.id} className="even:bg-gray-50">
                        <td className="p-2 align-top">{ep.name}</td>
                        <td className="p-2 align-top">{ep.method}</td>
                        <td className="p-2 align-top break-words">{ep.url}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
        <ChatPreview />
      </div>
    </div>
  );
}
