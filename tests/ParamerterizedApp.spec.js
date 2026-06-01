const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
//Json->string->object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData')));

for( const data of dataset )
{    
    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        //js file- Login js, DashboardPage
        const productName = 'iphone 13 pro';
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.Login(data.username,data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy()

    });
}








