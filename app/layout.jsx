import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "Reimi",
  description: "Manga reader app",
};

const RootLayout = ({ children }) => {
  return (
    <html className="dark">
      <body>
        <div className="main"></div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
