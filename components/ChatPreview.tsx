export default function ChatPreview() {
  return (
    <aside className="w-80 border-l bg-white p-6 flex flex-col">
      {/* Top Header */}
      <h1 className="text-lg font-bold mb-4">Conversation Preview</h1>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center flex-1 justify-center">
        <div className="w-12 h-12 bg-black rounded-full mb-3" />
        <h3 className="font-semibold mb-1">Let's chat!</h3>
        <p className="text-gray-600 text-sm">
          Hi, I’m an AI assistant. How can I help you?
        </p>
        
        <input
          type="text"
          placeholder="Describe your task or ask a question..."
          className="mt-60 w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>
    </aside>
  );
}
