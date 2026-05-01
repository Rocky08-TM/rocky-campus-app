import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Rocky Campus App",
  description: "Student portal for Rocky College",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
