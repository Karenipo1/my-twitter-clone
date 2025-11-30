"use client";

export default function RoundedButton({ type = "button", variant = "primary", onClick, disabled=false,  children }) {
  const styles = {
        primary: "bg-black hover:bg-gray-700 text-white rounded-full py-2 px-4 transition",
        secondary: "border border-gray-400 text-gray-700 rounded-full py-2 px-4 hover:bg-gray-200 transition",
  };
  return (
    <button 
    type={type} 
    disabled={disabled} 
    onClick={onClick} 
    className={styles[variant]}>
      {children} 
    </button> 
  );
}