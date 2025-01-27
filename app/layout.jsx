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
        <div className=" flex flex-col justify-start items-center sm:justify-center sm:px-4 px-6 max-w-full mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
