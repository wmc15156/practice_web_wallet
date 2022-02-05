import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@web3-react/core';
import { useEffect, useState } from 'react';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances);
        }
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
}) {
  const balances = useBalances(provider, accounts);

  if (balances) {
    console.log(formatEther(balances?.[0]), 'balances', balances);
  }

  console.log(accounts);

  if (accounts === undefined) return null;

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        Accounts:{' '}
        <b>
          {accounts.length === 0
            ? 'None'
            : accounts?.map((account, i) => (
                <span
                  key={account}
                  style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {ENSNames?.[i] ?? account.slice(0, 10) + '...'}
                  {/*{balances?.[i] ? ` (balances: ${formatEther(balances[i])})` : null}*/}
                </span>
              ))}
        </b>
      </div>

      <div style={{ marginTop: '20px' }}>
        Balances:{' '}
        <b>
          {accounts.length === 0
            ? 'None'
            : accounts?.map((account, i) => (
                <span
                  key={account}
                  style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {balances?.[i] ? `${formatEther(balances[i])}` : null}
                </span>
              ))}
        </b>
      </div>
    </div>
  );
}
