import { useQuery } from '@apollo/react-hooks'

import { formatToGrt } from '../utils/grt.utils'
import { EPOCHES_QUERY } from './queries'

/**
 * @typedef {Object} EpochesQueryVars
 * @property {number} first
 * @property {string} orderBy
 * @property {'asc' | 'desc'} orderDirection
 * @property {Object} where
 * @property {number} where.startBlock
 */

/**
 * @typedef {Object} Epoch
 * @property {string} id
 * @property {number} startBlock
 * @property {number} endBlock
 * @property {number} queryFeeRebates
 * @property {number} totalRewards
 * @property {number} signalledTokens
 * @property {number} stakeDeposited
 * @property {number} totalIndexerRewards
 * @property {number} totalDelegatorRewards
 *
 * @typedef {Object} EpochesQueryResponse
 * @property {number} totalEpoches
 * @property {Epoch[]} epoches
 * @property {Error} error
 * @property {boolean} loading
 */

/**
 * Format the epoch to parse the BigInt values to GRT
 * @param {Epoch} epoch the retrieved epoch from the API
 * @returns {Epoch} the formatted epoch
 */
const formatEpoch = (epoch) => {
  const queryFeeRebates = formatToGrt(epoch.queryFeeRebates)
  const totalRewards = formatToGrt(epoch.totalRewards)
  const signalledTokens = formatToGrt(epoch.signalledTokens)
  const stakeDeposited = formatToGrt(epoch.stakeDeposited)
  const totalIndexerRewards = formatToGrt(epoch.totalIndexerRewards)
  const totalDelegatorRewards = formatToGrt(epoch.totalDelegatorRewards)

  return {
    id: epoch.id,
    startBlock: epoch.startBlock,
    endBlock: epoch.endBlock,
    queryFeeRebates,
    totalRewards,
    signalledTokens,
    stakeDeposited,
    totalIndexerRewards,
    totalDelegatorRewards,
  }
}

/**
 * Custom hook to retrieve the epoches list and total epoch count with the input
 * graphql query vars
 * @param {EpochesQueryVars} queryVars the variables to pass to the query
 * @returns {EpochesQueryResponse}
 */
export const useEpoches = (queryVars) => {
  // get the data from the query
  const { data, error, loading } = useQuery(EPOCHES_QUERY, { variables: queryVars })
  // normalize/format the data for the table
  const totalEpoches = data?.graphNetwork?.epochCount ?? 0
  const epoches = data?.epoches ? data.epoches.map(formatEpoch) : []

  return { epoches, totalEpoches, error, loading }
}
