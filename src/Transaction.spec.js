const Transaction = require("./Transaction")

describe('Transaction class', () => {
    it('should not be able to create a transaction with a non string label', () => {
        const createTransacttion = () => new Transaction(1, 42)
        expect(createTransacttion).toThrow('label must be of type string')
    })


    it('should not be able to create a transaction with a non number value', () => {
        const createTransaction = () => new Transaction("some transaction", "42")

        expect(createTransaction).toThrow('value must be of type number')
    })

    it('should not be able to create a transaction with more than two decimal places', () => {
        expect(() => new Transaction('some transaction', 1.123)).toThrow()
        expect(() => new Transaction('some transaction', 1.12)).not.toThrow()
    })

    it('should save the value as an integer', () => {
        const transaction = new Transaction('some transaction', 1.12)
        expect(transaction.value).toBe(112)
    })

    it('should be able to get the value as a float', () => {
        const transaction = new Transaction('some transaction', 1.12)

        expect(transaction.getValue()).toBe(1.12)
    })
})