import "~/styles/globals.scss";
import type { ReactNode } from "react";
import { ChakraProvider } from "~/components/providers/chakra-provider";
import { ReactQueryProvider } from "~/components/providers/query-client-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }} data-theme="light">
      <body className="chakra-ui-light">
        <ChakraProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
