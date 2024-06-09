import "./globals.css";
// Ubuntu for the headings, Vollkorn for the body
import { ubuntu, vollkorn } from "./ui/fonts";
import Navbar from "./components/layout/Navbar";
import { GlobalProvider } from "./contexts/global";
import Alert from "./components/layout/Alert";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="sunset" lang="en">
      <body className={`${ubuntu.variable} ${vollkorn.variable} antialiased`}>
        <GlobalProvider>
          <Navbar />
          <Alert />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
