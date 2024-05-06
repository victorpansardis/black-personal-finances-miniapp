const App = require("./App")

describe('App', () => {
    it('should create an app with a user', () => {
        const app = new App('Victor')

        expect(app.user.name).toBe('Victor')
        expect(app.user.wallets.length).toBe(0)
        expect(app.user.money).toBe(0)
    })
})