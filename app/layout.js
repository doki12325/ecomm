import ContextProvider from "@components/ContextProvider";
import Navbar from "@components/Navbar";
import "@styles/globals.css";

export const metadata = {
  title: "Product Page",
  description: "Mock Product Page",
  icons: { icon: "/favicon-32x32.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Navbar />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
