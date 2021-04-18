import { Box, Flex } from 'theme-ui'
import { useState, useMemo } from 'react'

import { withApollo } from '../apollo/client'
import { useEpoches } from '../apollo/epoch.queries'
import { useDebounce } from '../utils/useDebounce.hook'

import EpochesTableHeader from '../components/SearchHeader'
import EpochesTable from '../components/epoches/EpochesTable'
import LoadMoreBtn from '../components/Button'

const defPageSize = 3
const defOrderBy = 'startBlock'
const defOrderDirection = 'asc'

/**
 * Build the query vars to send to the epoches query from the input values
 * @param {number} skip the records to skip. used in pagination
 * @param {number} first the number of records to return after the skip. used in pagination
 * @param {string} orderBy the field to order the results by
 * @param {'asc' | 'desc'} orderDirection the direction to order the field by
 * @param {number | null} debouncedSearchTerm the user-entered, debounced search term
 * @returns {import('../apollo/epoch.queries').EpochesQueryVars}
 */
const buildQueryVars = (first, orderBy, orderDirection, debouncedSearchTerm) => ({
  first,
  orderBy,
  orderDirection,
  where: debouncedSearchTerm != null ? { startBlock: debouncedSearchTerm } : null,
})

const Index = () => {
  const [first, setFirst] = useState(defPageSize)
  const [orderBy, setOrderBy] = useState(defOrderBy)
  const [orderDirection, setOrderDirection] = useState(defOrderDirection)
  const [where, setWhere] = useState(null)
  const debouncedSearchTerm = useDebounce(where, 500)
  const queryVars = useMemo(
    () => buildQueryVars(first, orderBy, orderDirection, debouncedSearchTerm),
    [first, orderBy, orderDirection, debouncedSearchTerm],
  )

  const { totalEpoches, epoches } = useEpoches(queryVars)

  /**
   * Update the query vars with the updated order information
   * @param {string} orderBy the field to order the records by
   * @param {'asc' | 'desc'} orderDirection the direction to order the records
   */
  const onSort = (orderBy, orderDirection) => {
    setOrderBy(orderBy)
    setOrderDirection(orderDirection)
  }

  /**
   * Update the query vars to load more data from the query
   */
  const onLoadNextPage = () => {
    setFirst(first + defPageSize)
  }

  /**
   * Update the query vars with the updated search term
   * @param {number | null} term the user-entered search term
   */
  const onPerformQuerySearch = (term) => {
    setWhere(term)
  }

  return (
    <Box>
      <EpochesTableHeader
        headerLabel="Epoches"
        inputPlaceholder="Search"
        handleSearch={onPerformQuerySearch}
      />
      <EpochesTable
        epoches={epoches}
        orderBy={orderBy}
        orderDirection={orderDirection}
        totalCount={totalEpoches}
        handleSort={onSort}
      />
      <Flex
        as="div"
        sx={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        py={20}
      >
        <LoadMoreBtn text="Load More" handleClickEvent={onLoadNextPage} />
      </Flex>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
