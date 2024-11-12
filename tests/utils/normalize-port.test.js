import normalizePort from '../../src/utils/normalize-port'
import { describe, it, expect } from '@jest/globals'

/**
 * Test suite for the normalizePort utility function.
 */
describe('normalizePort', () => {
  /**
   * Test case for when the port value is a valid number.
   */
  it('should return a number if the port value is a valid number', () => {
    expect.assertions(1)

    const result = normalizePort('3000')
    expect(result).toBe(3000)
  })

  /**
   * Test case for when the port value is not a valid number.
   */
  it('should return the port value as a string if it is not a valid number', () => {
    expect.assertions(1)

    const result = normalizePort('socket')
    expect(result).toBe('socket')
  })

  /**
   * Test case for when the port value is a negative number.
   */
  it('should return false if the port value is a negative number', () => {
    expect.assertions(1)

    const result = normalizePort('-5000')
    expect(result).toBe(false)
  })
})
