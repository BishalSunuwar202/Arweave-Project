//import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { ArweaveWalletKit } from "arweave-wallet-kit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ArweaveWalletKit
      config={{
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "DISPATCH"],
        ensurePermissions: true,
        appInfo: {
          name: "Arweave-Wallet-Kit-Demo",
        },
      }}
    >
      <Component {...pageProps} />
    </ArweaveWalletKit>
  );
}
