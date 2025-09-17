// "use client";

// import { useState } from "react";
// import Header from "@/components/Header";

// export default function CreateAgentAction() {
//   const [label, setLabel] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleFinish = () => {
//     // ✅ Basic Validation
//     if (!label.trim()) {
//       setError("Agent Action Label is required.");
//       return;
//     }
//     if (!instructions.trim()) {
//       setError("Agent Action Instructions are required.");
//       return;
//     }
//     if (!amount.trim()) {
//       setError("Amount input is required.");
//       return;
//     }
//     if (!message.trim()) {
//       setError("Message output is required.");
//       return;
//     }

//     setError("");

//     // ✅ Here you can call an API or navigate
//     alert("Agent Action Created Successfully 🎉");

//     // Example: navigate somewhere
//     // router.push("/actions");
//   };

//   return (
//     <div className="h-screen flex flex-col bg-white">
//       {/* Page Header */}
//       <Header agentName="Agent Builder" />

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
//         {/* Title */}
//         <h2 className="text-lg font-semibold mb-2">Create an Agent Action</h2>
//         <p className="text-sm text-gray-600 mb-6">Configure your action for Agent</p>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
//             {error}
//           </div>
//         )}

//         {/* Section: Agent Action Configuration */}
//         <h3 className="font-semibold text-base mb-4">Agent Action Configuration</h3>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Agent Action Label</label>
//           <input
//             type="text"
//             value={label}
//             onChange={(e) => setLabel(e.target.value)}
//             placeholder="Enter action"
//             className="w-full border rounded px-3 py-2 bg-gray-100"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-black-500 mb-1">
//             * Agent Action Instructions
//           </label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             placeholder="Issue resort credits for one of multiple contacts identified by an array of Contact Ids."
//             className="w-full border rounded px-3 py-2 h-20"
//           />
//         </div>

//         {/* Inputs & Outputs in one row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Input Section */}
//           <div className="border rounded-md p-4 bg-gray-50">
//             <h4 className="font-semibold text-sm mb-3">Inputs</h4>
//             <div className="mb-3">
//               <label className="block text-sm mb-1">json</label>
//               <input
//                 type="text"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="json"
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-red-500 mb-1">* Instructions</label>
//               <textarea
//                 placeholder="The amount of resort credits..."
//                 className="w-full border rounded px-3 py-2 h-16"
//               />
//             </div>
//           </div>

//           {/* Output Section */}
//           <div className="border rounded-md p-4 bg-gray-50">
//             <h4 className="font-semibold text-sm mb-3">Output</h4>
//             <div className="mb-3">
//               <label className="block text-sm mb-1">json</label>
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="json"
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-red-500 mb-1">* Instructions</label>
//               <textarea
//                 placeholder="The response of the action..."
//                 className="w-full border rounded px-3 py-2 h-16"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center mt-8 pt-10 px-4">
//   <button
//     onClick={() => history.back()}
//     className="px-4 py-2 border rounded hover:bg-gray-100"
//   >
//     Back
//   </button>
//   <button
//     onClick={handleFinish}
//     className="px-6 py-2  text-white rounded bg-purple-700 hover:bg-purple-800"
//   >
//     Finish
//   </button>
// </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateAgentAction() {
  const [label, setLabel] = useState("");
  const [instructions, setInstructions] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const actionType = searchParams.get("type") || "Unknown";

  // ✅ topic details passed from previous page
  const topicId = searchParams.get("topicId");
  const topicName = searchParams.get("topicName");

  const handleFinish = () => {
    if (!label.trim()) return setError("Agent Action Label is required.");
    if (!instructions.trim())
      return setError("Agent Action Instructions are required.");
    // if (!amount.trim()) return setError("Enter input is required.");
    // if (!message.trim()) return setError("Enter output is required.");

    setError("");

    // ✅ Save to localStorage
    const newAction = { label, instructions, amount, message, type: actionType };
    const existing = JSON.parse(localStorage.getItem("agentActions") || "[]");
    existing.push(newAction);
    localStorage.setItem("agentActions", JSON.stringify(existing));

    alert("Agent Action Created Successfully 🎉");

    // ✅ Redirect back with clean query
    if (topicId && topicName) {
      router.push(
        `/topic/details/${topicId}?name=${encodeURIComponent(topicName)}`
      );
    } else {
      router.push("/action");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header agentName="Agent Builder" />

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
     <h2 className="text-lg font-bold text-center border-b-2 border-gray-400 pb-2 mb-2">
  Create an Agent Action
</h2>



        {/* ✅ Centered subtitle */}
        <p className="text-center text-base font-bold text-black-800 mb-2">
  Configure your action for Agent
</p>

        {/* ✅ Long description */}
        <p className="text-sm text-gray-600 mb-6">
          An agent uses a large language model (LLM) to determine when to launch
          an action in a conversation. Enter instructions to tell the LLM how to
          use your action, inputs, and outputs. To help you get started, we
          copied over details from the reference action. Learn more about how to
          write agent action instructions in Salesforce Help.
          <br />
          <br />
          After you create your action, you can add it to an agent and test and
          iterate on your instructions.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <h3 className="font-semibold text-base mb-4">
          Agent Action Configuration
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Agent Action Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter action"
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            * Agent Action Instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions..."
            className="w-full border rounded px-3 py-2 h-20"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* ✅ Inputs Section */}
  <div className="border rounded-md p-4 bg-gray-50">
    <h4 className="font-semibold text-sm mb-3">Inputs</h4>
    <input
      type="text"
      value='{"amount": "100"}'
      readOnly
      className="w-full border rounded px-3 py-2 mb-2 bg-gray-100 text-gray-700 cursor-not-allowed"
    />
    {/* <textarea
      value="The amount of resort credits..."
      readOnly
      className="w-full border rounded px-3 py-2 h-16 bg-gray-100 text-gray-700 cursor-not-allowed"
    /> */}
  </div>

  {/* ✅ Output Section */}
  <div className="border rounded-md p-4 bg-gray-50">
    <h4 className="font-semibold text-sm mb-3">Output</h4>
    <input
      type="text"
      value='{"message": "Resort credits applied successfully"}'
      readOnly
      className="w-full border rounded px-3 py-2 mb-2 bg-gray-100 text-gray-700 cursor-not-allowed"
    />
    {/* <textarea
      value="The response of the action..."
      readOnly
      className="w-full border rounded px-3 py-2 h-16 bg-gray-100 text-gray-700 cursor-not-allowed"
    /> */}
  </div>
</div>


        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-3">Inputs</h4>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="json"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <textarea
              placeholder="The amount of resort credits..."
              className="w-full border rounded px-3 py-2 h-16"
            />
          </div>

          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-semibold text-sm mb-3">Output</h4>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="json"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <textarea
              placeholder="The response of the action..."
              className="w-full border rounded px-3 py-2 h-16"
            />
          </div>
        </div> */}

        <div className="flex justify-between items-center mt-8 pt-10 px-4">
          <button
            onClick={() => history.back()}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleFinish}
            className="px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
