import { hooks, metaMask } from '../../connectors/metaMask';
import { Accounts } from '../Accounts';
import { Card } from '../Card';
import { Chain } from '../Chain';
import { ConnectWithSelect } from '../ConnectWithSelect';
import { Status } from '../Status';
import { useEffect, useState } from 'react';

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function MetaMaskCard() {
  const [isPolygonNetwork, setIsPolygonNetwork] = useState(false);

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    console.log(chainId);
    if (isActive) {
      if (chainId === 137) {
        setIsPolygonNetwork(true);
      } else {
        setIsPolygonNetwork(false);
      }
    }
  }, [chainId]);

  return (
    <>
      <h4 style={{ background: '#fab005', color: '#fff' }}>
        {isActive && !isPolygonNetwork && (
          <div>
            Your wallet is connected to the wrong network. To use Polygon Network, please switch the
            network.
          </div>
        )}
      </h4>
      <div>
        <Card>
          <div>
            <b>MetaMask</b>
            <Status isActivating={isActivating} error={error} isActive={isActive} />
            <div style={{ marginBottom: '1rem' }} />
            <Chain chainId={chainId} />
            <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
          </div>
          <div style={{ marginBottom: '1rem' }} />
          <ConnectWithSelect
            connector={metaMask}
            chainId={chainId}
            isActivating={isActivating}
            error={error}
            isActive={isActive}
          />
        </Card>
      </div>
    </>
  );
}
