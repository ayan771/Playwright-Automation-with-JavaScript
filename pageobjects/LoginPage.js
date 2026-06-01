const { TEST_CREDENTIALS , WEB_BASE_URL } = require('../config/env');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");

    }

    async goTo() {
        await this.page.goto(WEB_BASE_URL);
    }

    async Login(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async validLogin() {
        await this.userName.type(TEST_CREDENTIALS.email);
        await this.password.type(TEST_CREDENTIALS.password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

    

}
module.exports = { LoginPage };