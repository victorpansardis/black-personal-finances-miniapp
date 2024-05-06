const Wallet = require("./Wallet")

describe('Wallet', () => {
    let wallet
    const mockIncome = {
        value: 5031,
        createdAt: new Date,
        getValue: () => 50.31
    }

    const mockExpense = {
        value: -1299,
        createdAt: new Date(),
        getValue: () => -12.99
    }

    beforeEach(() => {
        wallet = new Wallet()
    })

    it('should create an empty wallet with balance 0', () => {

        expect(wallet.balance).toBe(0)
    })

    it('should create an empty wallet with no transactions', () => {

        expect(wallet.transactions).toEqual([])
    })

    it('should save a transaction on a wallet', () => {
        const mockTransaction = 'some transaction'

        wallet.addTransaction(mockTransaction)

        expect(wallet.transactions).toContain(mockTransaction)
    })

    it('should update wallet balance when a transaction is saved', () => {
        const mockTransaction = { value: 42 }

        wallet.addTransaction(mockTransaction)

        expect(wallet.balance).toBe(42)
    })

    it('should get wallet balance as a number of up to two decimal places', () => {
        const mockTransaction = { value: 4219 }

        wallet.addTransaction(mockTransaction)

        expect(wallet.getBalance()).toBe(42.19)
    })

    it('should get all the incomes', () => {

        wallet.addTransaction(mockIncome)
        wallet.addTransaction(mockIncome)

        const incomes = wallet.getAllIncomes()

        expect(incomes.total).toBe(100.62)
        expect(incomes.list).toContain(mockIncome)
        expect(incomes.list).toContain(mockIncome)
    })

    it('should get all the incomes and no expensives', () => {

        wallet.addTransaction(mockIncome)
        wallet.addTransaction(mockExpense)

        const incomes = wallet.getAllIncomes()

        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(mockIncome)
        expect(incomes.list).not.toContain(mockExpense)
    })

    it('should not include incomes created before start date', () => {
        const startDate = new Date('2022-01-01')
        const incomeBeforeStartDate = {
            value: 5031,
            createdAt: new Date(startDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterStartDate = {
            value: 8000,
            createdAt: new Date(startDate.getTime() + 1),
            getValue: () => 80
        }

        wallet.addTransaction(incomeAfterStartDate)
        wallet.addTransaction(incomeBeforeStartDate)

        const incomes = wallet.getAllIncomes(startDate)

        expect(incomes.total).toBe(80)
        expect(incomes.list).toContain(incomeAfterStartDate)
        expect(incomes.list).not.toContain(incomeBeforeStartDate)
    })

    it('should not include incomes created after end date', () => {
        const startDate = new Date('2022-01-01')
        const endDate = new Date('2022-01-31')
        const incomeBeforeEndDate = {
            value: 5031,
            createdAt: new Date(endDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterEndDate = {
            value: 8000,
            createdAt: new Date(endDate.getTime() + 1),
            getValue: () => 80
        }

        wallet.addTransaction(incomeAfterEndDate)
        wallet.addTransaction(incomeBeforeEndDate)

        const incomes = wallet.getAllIncomes(startDate, endDate)

        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(incomeBeforeEndDate)
        expect(incomes.list).not.toContain(incomeAfterEndDate)
    })

    it('should get all the expenses', () => {

        wallet.addTransaction(mockExpense)
        wallet.addTransaction(mockExpense)

        const expenses = wallet.getAllExpenses()

        expect(expenses.total).toBe(25.98)
        expect(expenses.list).toContain(mockExpense)
        expect(expenses.list).toContain(mockExpense)
    })

    it('should get all the expenses and no incomes', () => {

        wallet.addTransaction(mockIncome)
        wallet.addTransaction(mockExpense)

        const expenses = wallet.getAllExpenses()

        expect(expenses.total).toBe(12.99)
        expect(expenses.list).toContain(mockExpense)
        expect(expenses.list).not.toContain(mockIncome)
    })

    it('should not include expenses created before start date', () => {
        const startDate = new Date('2022-01-01')
        const expenseBeforeStartDate = {
            value: -3500,
            createdAt: new Date(startDate.getTime() - 1),
            getValue: () => -35
        }
        const expenseAfterStartDate = {
            value: -1299,
            createdAt: new Date(startDate.getTime() + 1),
            getValue: () => -12.99
        }
        wallet.addTransaction(expenseBeforeStartDate)
        wallet.addTransaction(expenseAfterStartDate)

        const expenses = wallet.getAllExpenses(startDate)

        expect(expenses.total).toBe(12.99)
        expect(expenses.list).not.toContain(expenseBeforeStartDate)
        expect(expenses.list).toContain(expenseAfterStartDate)
    })

    it('should not include expenses created after end date', () => {
        const startDate = new Date('2022-01-01')
        const endDate = new Date('2022-01-31')
        const expenseBeforeEndDate = {
            value: -3500,
            createdAt: new Date(endDate.getTime() - 1),
            getValue: () => -35
        }
        const expenseAfterEndDate = {
            value: -1299,
            createdAt: new Date(endDate.getTime() + 1),
            getValue: () => -12.99
        }

        wallet.addTransaction(expenseBeforeEndDate)
        wallet.addTransaction(expenseAfterEndDate)

        const expenses = wallet.getAllExpenses(startDate, endDate)

        expect(expenses.total).toBe(35)
        expect(expenses.list).toContain(expenseBeforeEndDate)
        expect(expenses.list).not.toContain(expenseAfterEndDate)
    })
})