import { useEffect, useState } from 'react'

/**
 * Build a custom hook to add a debounce timer delay to the input value before emitting.
 * This is to help enhance the UX. As the user performs a search, it will wait the given
 * delay to allow for the user to input other values, after the delay, it will emit
 * the value
 * @param {any} value the value to emit after the debounce
 * @param {number} [delay = 500] the time, in ms, to timeout before emitting the value
 * @returns custom hook that returns the value after the given timeout
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}
