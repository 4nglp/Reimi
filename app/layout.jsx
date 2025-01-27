import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "Reimi",
  description: "Manga reader app",
};

const RootLayout = ({ children }) => {
  return (
    <html className>
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
