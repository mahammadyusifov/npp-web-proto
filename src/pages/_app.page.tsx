import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import { SettingsContextProvider } from "@/contexts/settingsContext";
import { ResultContextProvider } from "@/contexts/ResultContext";
import { DropdownValuesContextProvider } from "@/contexts/DropdownValuesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 800,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DropdownValuesContextProvider>
      <ResultContextProvider>
      <SettingsContextProvider>
        <Head>
          <title>PLC Software</title>
        </Head>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </SettingsContextProvider>  
      </ResultContextProvider>
      </DropdownValuesContextProvider>
    </QueryClientProvider>
  );
}
