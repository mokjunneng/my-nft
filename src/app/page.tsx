"use client";

import { Display } from "@/components/display/Display";
import { MetaMaskError } from "@/components/meta-mask-error/MetaMaskError";
import { Navigation } from "@/components/navigation/Navigation";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <div className={"appContainer"}>
        <Navigation />
        <Display />
        <MetaMaskError />
      </div>
    </MetaMaskContextProvider>
  );
}
