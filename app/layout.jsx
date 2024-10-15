import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "allin",
  description: "ALL IN!",
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
