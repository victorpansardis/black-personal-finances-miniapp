const { isValidDecimal } = require("./utils")

describe('utils.js', () => {
    it('should return true if number is an integer', () => {
        expect(isValidDecimal(42)).toBe(true)
    })

    it('should return true if the number has one decimal place', () => {
        expect(isValidDecimal(6.5)).toBe(true)
    })

    it('should return true if the number has two decimal places', () => {
        expect(isValidDecimal(3.14)).toBe(true)
    })

    it('should return false for number with more than two decimal places', () => {
        expect(isValidDecimal(1.414)).toBe(false)
        expect(isValidDecimal(57.454598)).toBe(false)
    })
})