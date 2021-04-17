import { Flex, Box, Text } from 'theme-ui'

/**
 * Build a common table component to display the given data and columns in a themed table.
 * @param {Object} TableProps
 * @param {any[]} [TableProps.data = []] the data to render in the table
 * @param {Object[]} [TableProps.columns = []] the table columns
 * @param {string} TableProps.columns[].field the name of the property/field in the data to match the column to
 * @param {string} TableProps.columns[].label the column label header
 * @param {boolean} TableProps.columns[].display to display the column header
 * @param {string} TableProps.orderBy
 * @param {'asc' | 'desc'} TableProps.orderDirection
 * @param {number} [TableProps.totalCount = 0] the total count of records in the paginated table
 * @param {(orderBy: string, orderDirection: 'asc' | 'desc') => void} TableProps.handleSort handle sorting by the given column
 */
const Table = ({
  data = [],
  columns = [],
  orderBy,
  orderDirection = 'asc',
  totalCount = 0,
  handleSort,
}) => (
  <Flex
    as="div"
    sx={{
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
    <Box px={2} py={4} sx={{ flex: '1 1 auto', width: '100%' }}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.display ? column.label : null}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, idx) => (
            <tr key={`table_data_row_${idx}`}>
              {columns.map((column) => (
                <td key={`table_data_record_${idx}_field_${column.field}`}>
                  {record[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
    <Box>
      <Text px={2}>{`${(data ?? []).length} of ${totalCount}`}</Text>
    </Box>
  </Flex>
)

export default Table
