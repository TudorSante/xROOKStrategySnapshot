const { JsonRpcProvider } = require('@ethersproject/providers');
const networks = require('@snapshot-labs/snapshot.js/src/networks.json');
const utils = require('../src/utils');

const space = 'rook.eth';
const network = '1';
const snapshotBlockNumber = 15039737;
// const snapshotBlockNumber = 'latest';
const strategies = [
    // {
    //     "name": "erc20-balance-of",
    //     "params": {
    //       "address": "0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a",
    //       "symbol": "ROOK",
    //       "decimals": 18
    //     }
    // },
    {
        "name": "erc20-balance-of",
        "params": {
            "symbol": "xROOK",
          "address": "0x8aC32F0a635a0896a8428A9c31fBf1AB06ecf489",
          "decimals": 18
        }
    },
    {
        "name": "erc20-balance-of-staked-multiplier",
        "params": {
          "symbol": "xROOK",
          "address": "0x8aC32F0a635a0896a8428A9c31fBf1AB06ecf489",
          "decimals": 18,
          "stakingCoeff": 1.2,
          "baseStkToken": "0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a",
          "liqPoolContract": "0x4F868C1aa37fCf307ab38D215382e88FCA6275E2"
        }
    }
];
const addresses = [
  '0x759a159D78342340EbACffB027c05910c093f430',
  '0x2D21170928854F7Da6dC4b1C89dcb95BBc948338',
  '0x722f531740937fc21A2FaC7648670C7f2872A1c7',
  '0xA1ebb64d1f19D36A31221fFAd19747EF573Cd5A4',
  '0x698EE32575dc58DDC0dd2e8B80d2EaB8Af1E94e1',
  '0xBE6DcFDf4F1bf2ec0d3dEbD894a02a0765af6D69',
  '0xFe4C4A27BeD5E9113480C84A177068F7421A1Eb7',
  '0x0054D2575820cf60F5B6D350fb8d3d352BB3B6FD',
  '0x4A9A3815060C3Bd08fb4d44C9e74513874771b0C',
  '0x99BcEa6bB0403927fB3c038163478D5b42082Fd9',
  '0x04b92e3b5De16Dc7e307ea4CEBc5d7dabaE1894F',
  '0xe41eeB9ab53Ab208fD57A5E10dFC2FeE464Ca216',
  '0x51F13C84b49B64ba6B1615e7D91b11066908BF3C',
  '0x2ee8D80de1c389f1254e94bc44D2d1Bc391eD402',
  '0x7453019b806919563EaC33870Fe5f8e5154fdF38',
  '0x0B72513E73BB60375a4329FABF9BA16f861C0f12',
  '0x9a82d59f46913913808bFE905F6157F967AAa28E'
];

(async () => {
  console.time('getScores');
  try {
    const scores = await utils.getScoresDirect(
      space,
      strategies,
      network,
      new JsonRpcProvider(networks[network].rpc[0]),
      addresses,
      snapshotBlockNumber
    );
    console.log(scores);
  } catch (e) {
    console.log('getScores failed');
    console.error(e);
  }
  console.timeEnd('getScores');
})();
