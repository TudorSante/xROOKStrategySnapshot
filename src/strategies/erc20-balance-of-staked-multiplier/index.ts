import { call } from '../../utils';
import { formatUnits } from '@ethersproject/units';
import { strategy as erc20BalanceOfStrategy } from '../erc20-balance-of';


export const author = 'RaiNFall';
export const version = '1.0.0';

// abis to be used by the contract calls
const erc20ABI = [
  'function balanceOf(address account) external view returns (uint256)',
  'function totalSupply() external view returns (uint256)'
];

export async function strategy(
  space,
  network,
  provider,
  addresses,
  options,
  snapshot
) {
  const score = await erc20BalanceOfStrategy(
    space,
    network,
    provider,
    addresses,
    options,
    snapshot
  );

  const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';

  // find amount of ROOK staked in the liquidity pool LPv4 and the total supply of xROOK
  const stkTotalSupply = await call(
    provider,
    erc20ABI,
    [options.address, 'totalSupply', []],
    { blockTag }
  )
  .then((res) => parseFloat(formatUnits(res, options.decimals)));
  // console.log(`Total supply of xROOK: ${stkTotalSupply}`);

  const tokenStakedTotalBalance = await call(
    provider,
    erc20ABI,
    [options.baseStkToken, 'balanceOf', [options.liqPoolContract]],
    { blockTag }
  )
  .then((res) => parseFloat(formatUnits(res, options.decimals)));
  // console.log(`Total ROOK staked: ${tokenStakedTotalBalance}`);
  
  // compute the underlying coeff giving the value of xROOK in terms of ROOK
  const underlyingCoeff = tokenStakedTotalBalance / stkTotalSupply;
  // console.log(`xROOK:ROOK coeff: ${underlyingCoeff}`);
  // console.log(`xROOK voting power (in ROOK = 1vote): ${underlyingCoeff} * ${options.stakingCoeff} = ${underlyingCoeff * options.stakingCoeff}`);

  // multiply the amount of xROOK of each holder by the underlying ROOK coeff and the staking coeff
  return Object.fromEntries(
    Object.entries(score).map((res: any) => [
      // addresses of the voters
      res[0],
      // resulting votes
      res[1] * options.stakingCoeff * underlyingCoeff
    ])
  );
}
