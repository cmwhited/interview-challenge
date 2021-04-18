/** @jsxImportSource theme-ui */
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, IconButton, Themed } from 'theme-ui'

const epochesColumns = Object.freeze([
  {
    key: 'id',
    label: 'Epoch',
    width: '19%',
    minWidth: '150px',
  },
  {
    key: 'startBlock',
    label: 'Start Block',
    width: '19%',
    minWidth: '150px',
  },
  {
    key: 'endBlock',
    label: 'End Block',
    width: '19%',
    minWidth: '150px',
  },
  {
    key: 'queryFeeRebates',
    label: 'Query Fees',
    width: '19%',
    minWidth: '150px',
  },
  {
    key: 'totalRewards',
    label: 'Total Rewards',
    width: '19%',
    minWidth: '150px',
  },
  {
    key: 'viewDelegate',
    label: null,
    width: '5%',
    minWidth: '25px',
  },
])

/**
 * Build a table to display the epoches data
 * @param {Object} EpochesTableProps
 * @param {any[]} [EpochesTableProps.epoches = []] the data to render in the table
 * @param {string} EpochesTableProps.orderBy
 * @param {'asc' | 'desc'} EpochesTableProps.orderDirection
 * @param {number} [EpochesTableProps.totalCount = 0] the total count of records in the paginated table
 * @param {(orderBy: string, orderDirection: 'asc' | 'desc') => void} EpochesTableProps.handleSort handle sorting by the given column
 */
const EpochesTable = ({
  epoches = [],
  orderBy,
  orderDirection = 'asc',
  totalCount = 0,
  handleSort,
}) => {
  const [activeColumn, setActiveColumn] = useState(orderBy)
  const [activeRow, setActiveRow] = useState(null)

  /**
   * Update the sort for the table to orderBy the column selected.
   * If the column selected is the current orderBy column, then switch the direction,
   * otherwise, order by the selected column asc.
   * @param {string} column the column clicked on to sort by
   */
  const onSortColumn = (column) => {
    if (column === orderBy) {
      handleSort(column, orderDirection === 'asc' ? 'desc' : 'asc')
      return
    }
    handleSort(column, 'asc')
  }

  return (
    <Flex
      as="div"
      sx={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Flex
        px={2}
        py={4}
        sx={{
          flex: '1 1 auto',
          flexWrap: 'nowrap',
          width: '100%',
        }}
      >
        <table
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            '@media(max-width:468px)': {
              overflowX: 'scroll',
              width: 'auto',
              display: 'block',
            },
          }}
        >
          <thead>
            <tr>
              {epochesColumns.map((column) => (
                <th
                  key={column.key}
                  onMouseEnter={() => setActiveColumn(column.key)}
                  onMouseLeave={() => setActiveColumn(orderBy)}
                  onClick={() => onSortColumn(column.key)}
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: (theme) => theme.fontWeights.body,
                    color: (theme) =>
                      column.key === activeColumn || column.key === orderBy
                        ? theme.colors.primary
                        : theme.colors.muted,
                    paddingY: '1rem',
                    paddingLeft: '1rem',
                    borderBottomWidth:
                      column.key === activeColumn || column.key === orderBy
                        ? '2px'
                        : '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: (theme) =>
                      column.key === orderBy ? theme.colors.primary : theme.colors.muted,
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                >
                  <Flex as="span" sx={{ alignItems: 'center' }}>
                    <span>{column.label}</span>
                    <span sx={{ marginLeft: '0.75rem' }}>
                      {column.key === activeColumn && column.key !== orderBy ? (
                        <Image src="/Direction-Down.svg" width={12} height={12} />
                      ) : null}
                      {column.key === orderBy ? (
                        <Image
                          src={
                            orderDirection === 'asc'
                              ? '/Direction-Down.svg'
                              : '/Direction-Up.svg'
                          }
                          width={12}
                          height={12}
                        />
                      ) : null}
                    </span>
                  </Flex>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {epoches.map((epoch, idx) => (
              <tr
                key={`epoch_row_${idx}`}
                sx={{
                  borderTop: (theme) => `1px solid ${theme.colors.light}`,
                  borderBottom: (theme) => `1px solid ${theme.colors.light}`,
                  ':hover': { backgroundColor: (theme) => theme.colors.extraLight },
                }}
                onMouseEnter={() => setActiveRow(epoch.id)}
                onMouseLeave={() => setActiveRow(null)}
                onTouchMove={() => setActiveRow(epoch.id)}
              >
                <TableCell width="19%" minWidth="150px" active={orderBy === 'id'}>
                  {epoch.id}
                </TableCell>
                <TableCell width="19%" minWidth="150px" active={orderBy === 'startBlock'}>
                  {`#${epoch.startBlock}`}
                </TableCell>
                <TableCell width="19%" minWidth="150px" active={orderBy === 'endBlock'}>
                  {`#${epoch.endBlock}`}
                </TableCell>
                <TableCell
                  width="19%"
                  minWidth="150px"
                  active={orderBy === 'queryFeeRebates'}
                >
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text mr={1}>{epoch.queryFeeRebates}</Text>
                    <Text sx={{ fontSize: '0.75rem' }}>GRT</Text>
                  </Flex>
                </TableCell>
                <TableCell
                  width="19%"
                  minWidth="150px"
                  active={orderBy === 'totalRewards'}
                >
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text mr={1}>{epoch.totalRewards}</Text>
                    <Text sx={{ fontSize: '0.75rem' }}>GRT</Text>
                  </Flex>
                </TableCell>
                <TableCell width="5%" minWidth="25px">
                  {activeRow === epoch.id ? (
                    <Link href={`/epoch/${epoch.id}`}>
                      <IconButton
                        aria-label="view delegate details"
                        backgroundColor="rgba(111,76,255,0.16)"
                        sx={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '24px',
                          backgroundColor: (theme) => theme.colors.primaryPurple,
                          marginRight: '0.75rem',
                        }}
                      >
                        <Image src="/Delegate.svg" height={16} width={16} />
                      </IconButton>
                    </Link>
                  ) : null}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
      <Box>
        <Text
          sx={{
            marginLeft: '1.5rem',
            height: '4rem',
            verticalAlign: 'middle',
            color: (theme) => theme.colors.medium,
          }}
        >{`${(epoches ?? []).length} of ${totalCount}`}</Text>
      </Box>
    </Flex>
  )
}

const TableCell = ({ children, width, minWidth, active }) => (
  <Themed.td
    sx={{
      height: '4rem',
      width,
      minWidth,
      verticalAlign: 'middle',
      paddingLeft: '1rem',
      fontSize: '1rem',
      fontWeight: (theme) => theme.fontWeights.body,
      color: (theme) => (active ? theme.colors.primary : theme.colors.muted),
    }}
  >
    {children}
  </Themed.td>
)

export default EpochesTable
