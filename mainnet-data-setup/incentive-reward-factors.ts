import { SupportedBaseAssets, coinDecimals } from './chain-data';
import { IncentiveRewardFactor } from '../contracts/protocol';


/**
 * Reward factors is calculated based on the usd price of the asset.
 * The formula is:
 * rewardFactor = usdPrice * math.pow(10, benchmarkDecimal - coinDecimals) * boost
 *
 * boost is used to adjust the reward factor to favor some assets.
 */
const calculateRewardFactor = (usdPrice: number, coinDecimals: number, boost: number = 1): IncentiveRewardFactor => {
  // we use 9 as the benchmark decimal
  const benchmarkDecimal = 9;

  let factorValue = usdPrice * Math.pow(10, benchmarkDecimal - coinDecimals) * boost;
  let scale = 1;
  while (factorValue < 1) {
    factorValue *= 10;
    scale *= 10;
  }
  return { rewardFactor: Math.floor(factorValue), scale };
}

export const incentiveRewardFactors: Record<SupportedBaseAssets, IncentiveRewardFactor> = {
  sui: calculateRewardFactor(1, coinDecimals.sui, 2),
  cetus: calculateRewardFactor(0.04, coinDecimals.cetus),
  wormholeEth: calculateRewardFactor(2000, coinDecimals.wormholeEth),
  wormholeBtc: calculateRewardFactor(30000, coinDecimals.wormholeBtc),
  wormholeSol: calculateRewardFactor(20, coinDecimals.wormholeSol),
  wormholeApt: calculateRewardFactor(6, coinDecimals.wormholeApt),
  wormholeUsdc: calculateRewardFactor(1, coinDecimals.wormholeUsdc),
  wormholeUsdt: calculateRewardFactor(1, coinDecimals.wormholeUsdt),
};