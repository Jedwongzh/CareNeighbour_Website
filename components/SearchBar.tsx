import { useState } from "react";

export default function SearchBar() {
  const [promptIndex, setPromptIndex] = useState(0);
  const prompts = [
    "Need culturally sensitive care",
    "Looking for a female therapist",
    "Find a provider near me",
    // ...other prompts...
  ];

  // When switching prompt, increment promptIndex (wrap around as needed)
  // ...existing code...

  return (
    // ...existing code...
    <div className="relative w-full">
      <input
        // ...existing input props...
        placeholder=""
        // ...existing code...
      />
      <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 w-[calc(100%-6rem)] overflow-hidden h-6 flex items-center">
        <span
          key={promptIndex}
          className="block w-full animate-slide-in-bottom text-base md:text-xl text-gray-400"
        >
          {prompts[promptIndex]}
        </span>
      </span>
    </div>
    // ...existing code...
  );
}

// ...existing code...