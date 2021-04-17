import { Flex, Box, Heading, Input } from 'theme-ui'

/**
 * Build a component for a table display search header for users to search the table data
 * @param {Object} SearchHeaderProps
 * @param {string} SearchHeaderProps.headerLabel the table header label
 * @param {string} SearchHeaderProps.inputPlaceholder the search input placeholder value
 * @param {(term: number | null) => void} SearchHeaderProps.handleSearch function to invoke when the user types into the search
 */
const SearchHeader = ({ headerLabel, inputPlaceholder, handleSearch }) => {
  /**
   * Handle the event when the user clicks the clear icon button in the input.
   * Clear the input value and invoke the handleSearch button with null
   */
  const onClearSearch = () => {
    handleSearch(null)
  }

  /**
   * Parse and validate the change value from the input field
   * @param {React.ChangeEvent<HTMLInputElement>} evt the input change event
   */
  const onSearchChange = (evt) => {
    if (evt.target.value == null || evt.target.value === '') {
      handleSearch(null)
      return
    }
    handleSearch(parseInt(evt.target.value, 10))
  }

  return (
    <Flex
      as="div"
      sx={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      mb={8}
    >
      <Box px={4} py={2} sx={{ borderRight: '1px solid white' }}>
        <Heading as="h1">{headerLabel}</Heading>
      </Box>
      <Box px={4} py={2} sx={{ flex: '1 1 auto' }}>
        <Input
          id="table-data-search"
          name="table-data-search"
          placeholder={inputPlaceholder}
          onChange={onSearchChange}
        />
      </Box>
    </Flex>
  )
}

export default SearchHeader
