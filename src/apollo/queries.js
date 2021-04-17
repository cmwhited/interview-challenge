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
