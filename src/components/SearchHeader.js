/** @jsxImportSource theme-ui */
import { useState } from 'react'
import Image from 'next/image'
import { Flex, Box, Heading, Input, Themed } from 'theme-ui'

/**
 * Build a component for a table display search header for users to search the table data
 * @param {Object} SearchHeaderProps
 * @param {string} SearchHeaderProps.headerLabel the table header label
 * @param {string} SearchHeaderProps.inputPlaceholder the search input placeholder value
 * @param {(term: number | null) => void} SearchHeaderProps.handleSearch function to invoke when the user types into the search
 */
const SearchHeader = ({ headerLabel, inputPlaceholder, handleSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  /**
   * Handle the event when the user clicks the clear icon button in the input.
   * Clear the input value and invoke the handleSearch button with null
   */
  const onClearSearch = () => {
    handleSearch(null)
    setSearchValue('')
  }

  /**
   * Parse and validate the change value from the input field
   * @param {React.ChangeEvent<HTMLInputElement>} evt the input change event
   */
  const onSearchChange = (evt) => {
    if (evt.target.value == null || evt.target.value === '') {
      onClearSearch()
      return
    }
    handleSearch(parseInt(evt.target.value, 10))
    setSearchValue(evt.target.value)
  }

  return (
    <Flex
      as="div"
      sx={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: '0.5rem',
      }}
      mb={8}
    >
      <Box py={2}>
        <Heading
          as="h1"
          sx={{
            borderRight: (theme) => `1px solid ${theme.colors.light}`,
            textShadow: (theme) =>
              `0 0 1rem ${theme.colors.textShadowPrimary}, 0 0 2rem ${theme.colors.textShadowSecondary}`,
          }}
          pr={4}
        >
          {headerLabel}
        </Heading>
      </Box>
      <Flex
        pl={4}
        py={2}
        sx={{
          flex: '1 1 auto',
          position: 'relative',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Flex
          as="div"
          sx={{
            position: 'absolute',
            left: 0,
            paddingLeft: '1.25rem',
            alignItems: 'center',
          }}
        >
          {searchValue != null && searchValue !== '' ? (
            <Image
              src="/close.svg"
              width={12}
              height={12}
              sx={{ cursor: 'pointer' }}
              onClick={() => onClearSearch()}
            />
          ) : (
            <Image src="/Search.svg" width={12} height={12} />
          )}
        </Flex>
        <Input
          id="table-data-search"
          name="table-data-search"
          placeholder={inputPlaceholder}
          onChange={onSearchChange}
          value={searchValue}
          sx={{
            border: 'none',
            ':hover': { border: 'none' },
            ':focus': { border: 'none' },
            ':active': { border: 'none' },
            width: '100%',
            paddingLeft: '1.5rem',
          }}
        />
      </Flex>
    </Flex>
  )
}

export default SearchHeader
