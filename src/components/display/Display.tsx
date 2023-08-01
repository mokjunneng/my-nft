import { useMetaMask } from "@/hooks/useMetaMask";
import { formatChainAsNum } from "@/utils/index";

export const Display = () => {
  const { wallet } = useMetaMask();

  return (
    <div className={"display"}>
      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}
    </div>
  );
};
