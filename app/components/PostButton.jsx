'use client';
export default function PostButton() {
  return (
    <div className="relative group flex justify-center mt-6">
      {/* Botón redondo */}
      <div className="bg-black border border-gray-700 hover:bg-gray-900 transition-all rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
        {/* SVG de pluma */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M16 3a4 4 0 0 1 5 5l-9 9H7v-5l9-9zM13 6l5 5" />
        </svg>
      </div>

      {/* Tooltip (texto flotante) */}
      <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        Post
      </span>
    </div>
  );
}
