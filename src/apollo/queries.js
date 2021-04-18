import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches(
    $skip: Int
    $first: Int
    $orderBy: Epoch_orderBy
    $orderDirection: OrderDirection
    $where: Epoch_filter
  ) {
    epoches(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
    graphNetwork(id: "1") {
      epochCount
    }
  }
`

export const EPOCH_ID_LIST_QEURY = gql`
  {
    epoches(skip: 0, first: 1000) {
      id
    }
  }
`

export const EPOCH_QUERY = gql`
  query EpochDetails($id: ID!) {
    epoch(id: $id) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
      signalledTokens
      stakeDeposited
      totalIndexerRewards
      totalDelegatorRewards
    }
  }
`
