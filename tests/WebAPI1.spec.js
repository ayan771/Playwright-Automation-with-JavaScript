const { test,expect,request } = require('@playwright/test')
const {APiUtils} = require('../utils/APiUtils');
const { TEST_CREDENTIALS,  WEB_BASE_URL, TEST_COUNTRY, TEST_PRODUCT_ID } = require ('../config/env');
const loginPayload = {userEmail:TEST_CREDENTIALS.email, userPassword:TEST_CREDENTIALS.password}
const orderPayload = {orders: [{country:TEST_COUNTRY, productOrderedId:TEST_PRODUCT_ID}]}
let orderId
let token;
let response;

test.beforeAll( async () => {
    const apiCall = await request.newContext();
    const apiUtils = new APiUtils(apiCall,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

//Creating an Order through API and validating it in the Web App
test('API Login and PLace order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token );


   await page.goto(WEB_BASE_URL);
   const productName = 'ZARA COAT 3';
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});