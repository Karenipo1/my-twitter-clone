export default function Footer() {
  return (
    <div className="text-center text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-2">
          {["Terms", "Privacy", "Cookies", "Ads info", "More"].map((item) => (
            <a key={item} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>
    <footer className="text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} My Twitter Clone. All rights reserved.
    </footer>
    </div>
  );
}