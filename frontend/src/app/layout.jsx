import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

export const metadata = {
  title: "Cyber-Hub AI",
  description: "Next Generation AI powered Security Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0B] text-white min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}