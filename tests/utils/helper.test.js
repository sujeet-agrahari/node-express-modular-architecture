import { getIdParam } from '../../src/utils/helper'

/**
 * Tests for the getIdParam function.
 */
describe('getIdParam', () => {
  /**
   * Test to check if getIdParam returns the ID parameter as a number.
   */
  it('should return the ID parameter as a number', () => {
    expect.assertions(1)

    const req = {
      params: {
        id: '12345'
      }
    }
    const result = getIdParam(req)
    expect(result).toBe(12345)
  })

  /**
   * Test to check if getIdParam throws a TypeError when the ID parameter is not a valid number.
   */
  it('should throw a TypeError if the ID parameter is not a valid number', () => {
    expect.assertions(1)

    const req = {
      params: {
        id: 'abc'
      }
    }
    expect(() => getIdParam(req)).toThrow(TypeError)
  })

  /**
   * Test to check if getIdParam throws a TypeError with the correct error message.
   */
  it('should throw a TypeError with the correct error message', () => {
    expect.assertions(1)

    const req = {
      params: {
        id: 'abc'
      }
    }
    expect(() => getIdParam(req)).toThrow('Invalid \':id\' param: "abc"')
  })
})
