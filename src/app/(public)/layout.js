import "../globals.css";
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {children}
    </div>
  );
}