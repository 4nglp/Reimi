import { Analytics } from "@vercel/analytics/react";
import "@styles/globals.css";

export const metadata = {
  title: "Reimi",
  description: "A simple manga reader app",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div className=" flex flex-col justify-start items-center sm:justify-center sm:px-4 px-6 max-w-full mx-auto">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
