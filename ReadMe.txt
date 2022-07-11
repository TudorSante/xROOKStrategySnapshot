
Clone the repo:
> git clone https://github.com/snapshot-labs/snapshot-strategies
Install dep:
> yarn
> yarn build
To be able to run ts scrips:
> npm install -g typescript
> npm install -g ts-node
Add the strategy to strategies/index.ts before testing:
[...]
import * as erc20BalanceOfStakedMultiplier from './erc20-balance-of-staked-multiplier';
[...]
const strategies = {
[...]
'erc20-balance-of-staked-multiplier': erc20BalanceOfStakedMultiplier,
[...]
}

Then build the project again:
> yarn build

To run custom made tests, add first rook_scores.ts to the test folder. Then run:
> ts-node test/rook_scores.ts

To test that the strategy follows the required Snapshot patterns, run the test:
> yarn test --strategy=erc20-balance-of-staked-multiplier --more=500

