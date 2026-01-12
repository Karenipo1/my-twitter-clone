"use client";

export default function ToolTip({ text, children }) {
  return (
    <div className="relative group inline-flex items-center ">
      {children}

      {/* Tooltip visual */}
      <span className="mt-0.5 absolute top-full left-1/2 -translate-x-1/2
       bg-gray-800 text-white text-xs rounded-md px-2 py-1 
       opacity-0 group-hover:opacity-100 transition-opacity 
       whitespace-nowrap pointer-events-none
       z-20">
        {text}
      </span>
    </div>
  );
}
