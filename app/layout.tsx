import "./globals.css";
// Ubuntu for the headings, Vollkorn for the body
import { ubuntu, vollkorn } from "./ui/fonts";
import Navbar from "./components/layout/Navbar";
import { GlobalProvider } from "./contexts/global";
import Alert from "./components/layout/Alert";
import { getSession } from "./utils/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html data-theme="sunset" lang="en">
      <body className={`${ubuntu.variable} ${vollkorn.variable} antialiased`}>
        <GlobalProvider>
          <Navbar isLoggedIn={session.isLoggedIn} />
          <Alert />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
