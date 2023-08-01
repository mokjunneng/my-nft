import { useMetaMask } from "@/hooks/useMetaMask";
import { BattlegroundsCardNFT } from "@/models/index";
import { formatChainAsNum } from "@/utils/index";

interface DisplayProps {
  data: BattlegroundsCardNFT[] | null;
}

export const Display = ({ data }: DisplayProps) => {
  const { wallet } = useMetaMask();

  return (
    <div className={"display"}>
      <div>
        {wallet.accounts.length > 0 && (
          <>
            <div>Wallet Accounts: {wallet.accounts[0]}</div>
            <div>Wallet Balance: {wallet.balance}</div>
            <div>Hex ChainId: {wallet.chainId}</div>
            <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
          </>
        )}
      </div>
      <div className="tokensContainer">
        {data &&
          data.map((token, index) => {
            return (
              <div key={index} className="token">
                <p>Name: {token.name}</p>
                <p>Minion Type: {token.minionType}</p>
                <p>Attack: {token.baseAttackStat}</p>
                <p>Health: {token.baseHealthStat}</p>
                <p>Tavern Tier: {token.tavernTier}</p>
                <p>URI: {token.tokenUri}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
