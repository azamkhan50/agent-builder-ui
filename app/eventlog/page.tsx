"use client";


import ChatPreview from "@/components/ChatPreview";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";


export default function EventLogPage() {


  return (
    <div className="h-screen flex flex-col">
      <Header agentName="Agent Builder" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar  />


        {/* Main Content */}
        <main className="flex-1 bg-purple-50 p-6">
         




       

<section className="max-w-5xl">
  {/* Title + meta line */}
  <div className="mb-6">
    <h1 className="text-lg font-semibold text-gray-900">All Sessions</h1>
    <p className="text-sm text-gray-500 mt-1">
      9 items · Sorted by Duration · Updated 24 minutes ago
    </p>
  </div>

  {/* Table card */}
  <div className="  overflow-hidden">
    <table className="w-full text-sm divide-y divide-gray-200">
      <thead>
        <tr className="bg-gray-50 text-gray-600 ">
          <th className="px-5 py-3 text-left font-medium">Session ID</th>
          <th className="px-5 py-3 text-left font-medium">Session Start Time</th>
          <th className="px-5 py-3 text-left font-medium">Connection</th>
          <th className="px-5 py-3 text-left font-medium">Duration</th>
          <th className="px-5 py-3 text-left font-medium">Dropped</th>
          <th className="px-5 py-3 text-left font-medium">Errors</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {/* Row 1 */}
        <tr className="hover:bg-gray-50">
          <td className="px-5 py-4 font-medium text-gray-900">5CBK000000Tt7v4AC</td>
          <td className="px-5 py-4 text-gray-700">2/12/2025, 02:09:58 PM</td>
          <td className="px-5 py-4 text-gray-700">API</td>
          <td className="px-5 py-4 text-gray-700">0:00</td>
          <td className="px-5 py-4 text-gray-700">–</td>
          <td className="px-5 py-4 text-gray-700">–</td>
        </tr>

        {/* Row 2 */}
        <tr className="hover:bg-gray-50">
          <td className="px-5 py-4 font-medium text-gray-900">5CBK000000Tt804AC</td>
          <td className="px-5 py-4 text-gray-700">2/12/2025, 02:11:31 PM</td>
          <td className="px-5 py-4 text-gray-700">API</td>
          <td className="px-5 py-4 text-gray-700">0:00</td>
          <td className="px-5 py-4 text-gray-700">–</td>
          <td className="px-5 py-4 text-gray-700">–</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>





        </main>

        {/* Right Preview */}
        <ChatPreview />

      </div>
    </div>
  );
}
