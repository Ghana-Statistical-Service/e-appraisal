import type { ReactNode } from "react";

import App from "./App";
import "../styles/index.css";

export const metadata = {
  title: "E-Appraisal System Design",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
