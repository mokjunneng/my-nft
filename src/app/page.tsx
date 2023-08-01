import { Display } from "@/components/display/Display";
import { MetaMaskError } from "@/components/meta-mask-error/MetaMaskError";
import { Navigation } from "@/components/navigation/Navigation";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";
import getAllTokens from "@/lib/getAllTokens";
import { BattlegroundsCardNFT } from "@/models/index";

export default async function Home() {
  const tokens: BattlegroundsCardNFT[] = await getAllTokens();
  console.log(tokens);
  return (
    <MetaMaskContextProvider>
      <div className={"appContainer"}>
        <Navigation />
        <Display data={tokens} />
        <MetaMaskError />
      </div>
    </MetaMaskContextProvider>
  );
}
