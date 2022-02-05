import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// const PriorityExample = dynamic(() => import('../components/connectors/PriorityExample'), {
//   ssr: false,
// });

const MetaMaskCard = dynamic(() => import('../components/connectors/MetaMaskCard'), { ssr: false });
const WalletConnectCard = dynamic(() => import('../components/connectors/WalletConnectCard'), {
  ssr: false,
});
const WalletLinkCard = dynamic(() => import('../components/connectors/WalletLinkCard'), {
  ssr: false,
});
const NetworkCard = dynamic(() => import('../components/connectors/NetworkCard'), { ssr: false });

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert('Make sure you have Metamask installed');
    } else {
      console.log("Wallet exists! We're ready to go!");
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized: ', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
      }
    } catch (err) {
      window.location.href = 'https://metamask.io/';
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div>
      {/*<PriorityExample />*/}
      <div style={{ fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        {/*<WalletConnectCard />*/}
        {/*<WalletLinkCard />*/}
        {/*<NetworkCard />*/}
      </div>
    </div>
  );
}
