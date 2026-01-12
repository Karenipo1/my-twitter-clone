"use client";

export default function RoundedButton({ type = "button", variant = "primary", onClick, disabled=false,  children }) {
  const styles = {
        primary: "bg-[rgb(var(--prim-btn-bg))] text-[rgb(var(--prim-btn-text))] hover:bg-[rgb(var(--color-btn-hover))] hover:text-[rgb(var(--color-hover-text))] rounded-full py-2 px-4 transition cursor-pointer",
        secondary: "bg-[rgb(var(--sec-btn-bg))] border border-[rgb(var(--color-btn-border))] text-[rgb(var(--sec-btn-text))] hover:bg-[rgb(var(--color-btn-hover))] hover:text-[rgb(var(--color-hover-text))] rounded-full py-2 px-4 transition cursor-pointer",
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