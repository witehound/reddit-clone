import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../chakra";
import { Layout } from "../components";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
