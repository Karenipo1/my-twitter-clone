import "./globals.css";
export const metadata = {
  title: "X Clone App",
  description: "Twitter Clone with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}