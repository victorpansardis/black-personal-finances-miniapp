const App = require("../src/App")

describe('App integration', () => {
    it('should add a new wallet to a user', () => {
        const app = new App('Victor')
        app.addWallet('Minha carteira')

        expect(app.user.wallets.length).toBe(1)
        expect(app.user.wallets[0].getBalance()).toBe(0)
    })

    it('should be able to buy', () => {
        const app = new App('Victor')
        app.addWallet('Minha carteira')

        const pizza = {
            label: 'Pizza',
            value: 38,
            walletName: 'Minha carteira'
        }

        app.buy(pizza)

        expect(app.user.money).toBe(-38)
        expect(app.user.wallets[0].getBalance()).toBe(-38)
        expect(app.user.wallets[0].transactions.length).toBe(1)
        expect(app.user.wallets[0].transactions[0].label).toBe('Pizza')
        expect(app.user.wallets[0].transactions[0].getValue()).toBe(-38)
    })

    it('should be able to receive money', () => {
        const app = new App('Victor')
        app.addWallet('Minha carteira')

        const donation = {
            label: 'Dinheiro da Pizza',
            value: 19,
            walletName: 'Minha carteira'
        }

        app.receive(donation)

        expect(app.user.money).toBe(19)
        expect(app.user.wallets[0].getBalance()).toBe(19)
        expect(app.user.wallets[0].transactions.length).toBe(1)
        expect(app.user.wallets[0].transactions[0].label).toBe('Dinheiro da Pizza')
        expect(app.user.wallets[0].transactions[0].getValue()).toBe(19)
    })
})