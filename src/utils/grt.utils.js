import { BigNumber } from 'bignumber.js'

const grtValueBase = new BigNumber(Math.pow(10, 18))

/**
 * Parse the retrieved value from the API as a BigNumber to format
 * to a human-readable GRT value
 * @param {string | null} value the BigInt value received from the API
 * @returns {string | null}
 */
export const formatToGrt = (value) => {
  if (value == null) {
    return null
  } else if (value === '0') {
    return 0
  }
  const bigValue = new BigNumber(value)
  const grt = bigValue.dividedBy(grtValueBase)
  return grt.toFixed(0)
}
